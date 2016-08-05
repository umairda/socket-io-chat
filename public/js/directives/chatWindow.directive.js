(function() {
	'use strict';
	
	var ChatWindowController = function(Room,socket,User,$scope) {
		var vm = this;
		vm.chatRoomText = '';
		vm.firstRoom = true;
		vm.newRoomName = 'Enter room name';
		vm.newRoomNameFocused = false;
		vm.room = 1;
		vm.rooms = Room.getList();
		vm.messages = [];
				
		socket.on('room list', function(obj) {
			//console.log('room list',obj);
		});
		
		socket.on('chat message', function(obj) {
			vm.messages.push({type:"chatMessage",message:obj.message, user:obj.user});
		});
		
		socket.on('joined room', function(obj) {
			vm.messages.push({type:"joinRoom", message: obj.user+' joined '+obj.room});
		});
		
		socket.on('left room', function(obj) {
			vm.messages.push({type:"leaveRoom", message: obj.user+' left '+obj.room});
		});
		
		socket.on('send:name', function(msg) {
			console.log(msg);
		});
		
		vm.close = function() {
			console.log('closing window');
		};
		
		vm.joinRoom = function(newRoom) {
			vm.newRoomName = 'Enter room name';
			vm.newRoomNameFocused = false;
			
			//close dropdown
			angular.element('body').trigger('click');

			if (Room.exists(newRoom)) {
				var username = User.getUsername();
				if (vm.firstRoom || vm.room !== newRoom) {
					if (!vm.firstRoom) {
						socket.emit('unsubscribe', { room: vm.room, user: username });
						vm.messages.push({type:"leaveRoom", message: '(left '+vm.room+')'});
					}
					vm.firstRoom = false;
					socket.emit('subscribe', { room: newRoom, user: username });
				}
				vm.room = newRoom;
				
				return { "success": true, "room": newRoom, "message": "" };
			}
			else {
				var addResult = Room.add(newRoom);
				if (addResult.success) {
					return vm.joinRoom(newRoom);
				}
				else {
					return { "success": false, "room": vm.room, "message": addResult.message };
				}
			}
		};
		
		vm.minimize = function() {
			
		};
		
		vm.$onInit = function() {
			User.bindUserToSocket();
			vm.joinRoom(vm.room);
		};
		
		vm.sendMessage = function() {
			var username = User.getUsername();
			socket.emit('chat message',{ room: vm.room, message: vm.message, user: username });
			vm.message = '';
		};
		/*
		$scope.$watch(function(scope) { return vm.room; }, function(newValue,oldValue) {
			console.log('vm.room changed',newValue,oldValue);
			console.log('angular.isDefined(oldValue)',angular.isDefined(oldValue));
			console.log('angular.isDefined(newValue)',angular.isDefined(newValue));
			if (vm.subscribed !== newValue) {
				vm.joinRoom(newValue);
			}
		});
		*/
	};
	
	angular.module('socketIoChat.directives').directive('chatWindow',function() {
		return {
			restrict: 'E',
			templateUrl: '/views/chatWindow.directive.html',
			controller: ChatWindowController,
			controllerAs: 'ctrl',
			scope: {
			},
			bindsToController: true,
			link: function($scope,$element,$attrs,ctrl) {
				$element.on('$destroy',ctrl.close);
			},
		};
	});

})();
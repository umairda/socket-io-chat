(function() {
	'use strict';
	
	angular.module('socketIoChat.services').service('Room',function() {
		var vm = this;
		var rooms = [1,2,3,4];
		
		vm.add = function(room) {
			console.log('Room.add',room);
			if ((room.search(/[^a-z0-9\s]/i)===-1) && 
				(room.search(/[a-z0-9]/i)!==-1)) {
				
				room = room.replace(/[\s]{2,}/,'\s');
				
				rooms.push(room);
				return { "success": true, "message": room+" added"};
			}
			else {
				return {"success": false, 
				"message": "Room names can only contain alphanumeric charaters and spaces" };
			}
		};
		
		vm.remove = function(room) {
			if (rooms.indexOf(room)!==-1) {
				return { "success": true, "removedRoom": rooms.splice(rooms.indexOf(room),1) };
			}
			else {
				return { "success": false, "removedRoom": room+" does not exist" };
			}
		};
		
		vm.getList = function() {
			return rooms;
		};
		
		vm.exists = function(room) {
			return rooms.indexOf(room)!==-1;
		};
	
	});
})();
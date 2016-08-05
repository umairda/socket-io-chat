(function() {
	'use strict';
	
	angular.module('socketIoChat.services').service('User', function(socket) {
		var loggedIn = false;
		var sessionId = null;
		var username = null;
		var vm = this;
		
		vm.generateUsername = function() {
			loggedIn = false;
			return 'user'+Math.floor(Math.random()*1000000);
		};
		
		vm.isLoggedIn = function() {
			return loggedIn;
		};
		
		vm.getUsername = function() { 
			return username;
		};
		
		vm.getUserObj = function() {
			return { loggedIn: loggedIn, sessionId: sessionId, username: username };
		};
		
		vm.getSessionId = function() {
			return sessionId;
		};
		
		vm.bindUserToSocket = function() {
			socket.emit('bindSocketToUser',vm.getUserObj());
		};
		
		vm.setLoggedIn = function(newValue) {
			loggedIn = newValue;
		};

		vm.setUsername = function(newUsername) {
			username = newUsername;				
		};

		vm.setUserInfo = function(obj) {
			if (angular.isDefined(obj.username)) {
				username = obj.username;
			}
			if (angular.isDefined(obj.loggedIn)) {
				loggedIn = obj.loggedIn;
			}
			if (angular.isDefined(obj.sessionId)) {
				sessionId = obj.sessionId;
			}
		};
		
		vm.setSessionId = function(newSessionId) {
			sessionId = newSessionId;
		};
	});

})();
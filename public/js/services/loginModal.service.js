(function() {

	'use strict';
	
	var app = angular.module('socketIoChat.services');
	
	app.service('loginModal', function (socket, $uibModal, User) {

		function setUsernameAndSessionId(response) {
			console.log('logging in',response);
			User.setLoggedIn(true);
			User.setUsername(response.username);
			User.setSessionId(response.sessionId);
			socket.emit('bindSocketToUser',{username: User.getUsername(), loggedIn: User.isLoggedIn()});
			return response.username;
		}

		return function() {
			var instance = $uibModal.open({
			  templateUrl: 'views/loginModalTemplate.html',
			  controller: 'LoginModalController',
			  controllerAs: 'LMCtrl'
			});

			return instance.result.then(setUsernameAndSessionId, instance.close('login cancelled'));
		};

	});

})();
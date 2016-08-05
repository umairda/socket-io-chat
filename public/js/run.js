(function() {
	
	'use strict';
	
	var app = angular.module('socketIoChat');
	
	app.run(function ($rootScope,$state,authenticate,loginModal,registerModal,User) {

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			var toStateAuthRequired = toState.data.requireLogin;
			var fromStateSet = typeof fromState !== 'undefined' && fromState.name !== '';
			var fromStateAuthRequired = null;
			if (fromStateSet) {
				fromStateAuthRequired = fromState.data.requireLogin;
			}
			
			if (toState.name === 'unauthenticated.register') {
				event.preventDefault();
				registerModal().then(function() {
					return $state.go('unauthenticated.register', toParams);
				}).catch(function() {
					return $state.go('unauthenticated');
				});
			}
			//user has not been authenticated
			else if (toStateAuthRequired && User.getSessionId() === null) {
				event.preventDefault();
			  
				loginModal().then(function () {
					return $state.go(toState.name, toParams);
				}).catch(function () {
					return $state.go('unauthenticated');
				});
			}
			else if (fromStateSet && fromStateAuthRequired && !toStateAuthRequired && User.getSessionId() !== null) {
				event.preventDefault();
				authenticate.logout(User.getSessionId()).then(function(response) {
					User.setUserInfo({loggedIn: false, sessionId: null, username: User.generateUsername()});
					User.bindUserToSocket();
					return $state.go(toState.name, toParams);
				}, function(error) {
					console.log('logout unsuccessful: ',error);
				}).catch(function(error) {
					console.log('logout failed:',error);
				});
			}
		});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			if (toState.name === 'unauthenticated.register') {
				registrationCompleteModal();
			}
		});
	});
})();
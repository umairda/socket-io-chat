(function() {
	'use strict';
	
	angular.module('socketIoChat.controllers').controller('NavController',function($scope,User) {
		var vm = this;
		
		vm.setUsername = function() {
			if (User.getSessionId() === null) {
				User.setUsername(User.generateUsername());
				vm.loginStatus = User.getUsername() + ' (anonymous)';
			}
			else {
				vm.loginStatus = User.getUsername() + ' logged in.';
			}
		};
		
		$scope.$watch(function() {
			return User.getSessionId();
		},function(newValue) {
			console.log('sessionId changed',newValue);
			vm.setUsername();
		});
	});
})();
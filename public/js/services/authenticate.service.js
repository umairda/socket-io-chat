(function() {
	'use strict';
	
	angular.module('socketIoChat.services').service('authenticate',function($http,md5) {
		var vm = this;
		
		vm.login = function(username,password) {
			return $http({
				method: 'POST',
				url: '/user/login',
				data: { username: username, password: password }
			});
		};
		
		vm.logout = function(sessionId) {
			return $http({
				method: 'GET',
				url: '/user/logout?sessionId='+sessionId
			});
		};
		
		vm.register = function(username,password) {
			return $http({
				method: 'POST',
				url: '/user/register',
				data: { username: username, password: password }
			});
		};
	});
})();
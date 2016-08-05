(function() {

	'use strict';
	
	var app = angular.module('socketIoChat.controllers');
	
	app.controller('LoginModalController', function ($scope, authenticate, md5, socket) {
		var vm = this;
		vm.error = false;
		vm.cancel = $scope.$dismiss;

		vm.submit = function (username, password) {
			authenticate.login(username,md5.createHash(password)).then(function (response) {
				if (typeof response !== 'undefined') {
					if (response.data.success) {
						if (response.data.username === username) {
							$scope.$close(response.data);
						}
						else {
							console.log('wrong username logged in, expecting: ', username, ' received: ', response.username);
						}
					}
					else {
						console.log('error logging in: ', response.data.error);
						vm.error = response.data.error.message;
					}
				}
				else {
					console.log('response is undefined');
				}
			}, function (error) {
				console.log('Authentication login error: ',error);
			});
		};
	});

})();
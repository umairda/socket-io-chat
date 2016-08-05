(function() {

	'use strict';

	var app = angular.module('socketIoChat.controllers');

	app.controller('RegisterModalController', function ($scope, authenticate, md5) {
		var vm = this;
		vm.error = false;
		vm.cancel = $scope.$dismiss;

		vm.submit = function (username, password, repeatPassword) {
			console.log('registration submitted');
			if (password !== repeatPassword) {
				vm.error = "Passwords don't match";
			}
			else {
				vm.error = false;

				authenticate.register(username,md5.createHash(password)).then(function (response) {
						if (typeof response !== 'undefined') {
							if (response.data.success) {
								console.log('register',response);
								if (response.data.username === username) {
									$scope.$close(response.data);
								}
								else {
									vm.error = 'Wrong username attempting to register, expecting: '+username+' received: '+response.data.username;
								}
							}
							else {
								//error registering
								vm.error = response.data.message;
							}
						}
						else {
							vm.error = 'No server response';
						}
					}, function (error) {
						vm.error = "Error contacting server";
						console.log('Authentication registration error: ',error);
				});
			}
		};
	});

})();

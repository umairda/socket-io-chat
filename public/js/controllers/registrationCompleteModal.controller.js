(function() {

	'use strict';
	
	var app = angular.module('socketIoChat.controllers');
	
	app.controller('RegistrationCompleteModalController', function ($scope, authenticate, md5) {
		var vm = this;
		vm.cancel = $scope.$dismiss;				
	});

})();
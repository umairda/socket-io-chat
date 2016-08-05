(function() {

	'use strict';
	
	var app = angular.module('socketIoChat.services');
	
	app.service('registrationCompleteModal', function ($uibModal, User) {

		return function() {
			var instance = $uibModal.open({
			  templateUrl: 'views/registrationCompleteModalTemplate.html',
			  controller: 'RegistrationCompleteModalController',
			  controllerAs: 'RCMCtrl'
			});

			return instance.result.then(instance.close('registration complete'));
		};

	});

})();
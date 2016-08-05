(function() {

	'use strict';
	
	var app = angular.module('socketIoChat.services');
	
	app.service('registerModal', function ($q, registrationCompleteModal, $uibModal, User) {

		function showRegistrationComplete(response) {
			var deferred = $q.defer();
			
			registrationCompleteModal().then(function(response) {
				deferred.resolve(true);
			});
			
			return deferred;
		}

		return function() {
			var instance = $uibModal.open({
			  templateUrl: 'views/registerModalTemplate.html',
			  controller: 'RegisterModalController',
			  controllerAs: 'RMCtrl'
			});

			return instance.result.then(registrationCompleteModal, instance.close('registration cancelled'));
		};

	});

})();
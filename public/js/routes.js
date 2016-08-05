(function() {

	'use strict';

	var app = angular.module('socketIoChat');

	app.config(function ($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	});

	app.config(function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('unauthenticated', {
			url: '/',
			templateUrl: 'views/unauthenticated.state.html',
			data: {
				requireLogin: false
			}
		})
		.state('unauthenticated.register', {
			url: '/',
			templateUrl: 'views/unauthenticated.state.html',
			data: {
				requireLogin: false
			}
		})
		.state('authenticated', {
			url: '/',
			templateUrl: 'views/authenticated.state.html',
			data: {
				requireLogin: true
			}
		});
	});
})();

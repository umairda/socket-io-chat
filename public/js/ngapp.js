(function() {

	'use strict';
	
	angular.module('socketIoChat.components',[]);
	angular.module('socketIoChat.controllers',[]);
	angular.module('socketIoChat.directives',[]);
	angular.module('socketIoChat.services',[]);
	
	angular.module('socketIoChat', [
		'angular-md5',
		'btford.socket-io',
		'ngSanitize',
		'ui.bootstrap',
		'ui.router',
		'socketIoChat.components',
		'socketIoChat.controllers',
		'socketIoChat.directives',
		'socketIoChat.services',
	]);

})();
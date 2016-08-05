(function() {
	'use strict';
	
	angular.module('socketIoChat.services').factory('socket',function(socketFactory) {
		return socketFactory();
	});	
})();
(function() {
	'use strict';
		
	angular.module('socketIoChat.directives').directive('chatEvent',function() {
		return {
			restrict: 'A',
			scope: {
				delimeter: '@',
				message: '@',
				user: '@',
				type: '@'
			},
			template:"<div ng-include='myTemplate'></div>",
			link: function(scope, element, attrs) {
				switch(scope.type) {
					case 'joinRoom': 
						scope.myTemplate = '/views/chatEvent.joinRoom.directive.html';
						break;
					case 'leaveRoom':
						scope.myTemplate = '/views/chatEvent.leaveRoom.directive.html';
						break;
					default:
						scope.myTemplate = '/views/chatEvent.message.directive.html';
						break;
				}
				
				
				if (!scope.delimeter && scope.type==='message') {
					scope.delimeter = ':';
				}
				else {
					scope.delimeter = '&nbsp;';
				}
				if (!scope.message) {
					scope.message = '&nbsp;';
				}
				if (!scope.user) {
					scope.user = '&nbsp;';
				}
			},
		};
	});

})();
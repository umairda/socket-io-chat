(function() {
	'use strict';

	angular.module('socketIoChat.directives').directive('schrollBottom', function () {
	  return {
		scope: {
		  schrollBottom: "="
		},
		link: function (scope, element) {
		  scope.$watchCollection('schrollBottom', function (newValue) {
			if (newValue)
			{
			  element.scrollTop(element[0].scrollHeight);
			}
		  });
		}
	  };
	});
})();
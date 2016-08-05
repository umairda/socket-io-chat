(function() {
  'use strict';
  var authInterceptor,loginModal,$http;
  var $q,$rootScope,$scope,$timeout;

  describe('authInterceptor',function() {
    beforeEach(module('socketIoChat.services'));
    beforeEach(module(function($provide) {
			$provide.service('loginModal',function() {
        return function() {
          return $q.when(true);
        };
			});
      $provide.service('$http',function() {
        var vm = this;
        vm.called = false;
        vm.configDefined = false;
        return function(config) {
          vm.called = true;
          vm.configDefined = angular.isDefined(config);
          return { called: vm.called, configDefined: vm.configDefined };
        };
      });
      $provide.service('$state',function() {
        var vm = this;
        vm.state = '';
        vm.go = function(state) {
          vm.state = state;
        };
      })
		}));

    beforeEach(inject(function($injector) {
      authInterceptor = $injector.get('authInterceptor');
      $http = $injector.get('$http');
      $q = $injector.get('$q');
      $rootScope = $injector.get('$rootScope');
      loginModal = $injector.get('loginModal');
      $scope = $rootScope.$new();
      $timeout = $injector.get('$timeout');
      $timeout.flush();
    }));

    it('should be defined',function(){
      expect(authInterceptor).toBeDefined();
    });

    it('should return the rejection object if the status !==401',function() {
      var rejection = { status: 400 };
      var result = authInterceptor.responseError(rejection);

      expect(result).toEqual(rejection);
    });

    it('should call the loginModal service when rejection.status = 401',function(done) {
      var rejection = { status: 401, config: 'some config' };
      var result = authInterceptor.responseError(rejection);
      result.then(function(response) {
        expect(response.called).toBe(true);
        done();
      });
      $scope.$apply();
    });
  });
})();

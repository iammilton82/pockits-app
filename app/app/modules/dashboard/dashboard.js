angular.module('dashboard', ['ngResource']).factory('dashFactory', function($http, ENV){
	return {
		
	}
}).controller('dashboard', function($scope, $http, $timeout, $location, $routeParams, $rootScope, localStorageService, dashFactory, ENV){
	
	$scope.data = {};
	$scope.state = {};
	$scope.state.message = "";

	$scope.me = localStorageService.get("user");
	console.log($scope.me);
	
});

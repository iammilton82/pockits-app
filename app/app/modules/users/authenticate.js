angular.module('authenticate', ['ngResource']).factory('authFactory', function($http, ENV){
	return {
	    register: function(post){
		    return $http({
				method: 'post',
				url: ENV.apiURL+"/users",
				data: post,
				dataType: 'json',
		    });
	    },		
	    login: function(post){
		    return $http({
				method: 'post',
				url: ENV.apiURL+"/users/login",
				data: post,
				dataType: 'json',
		    });
	    },		
	}
}).controller('authenticate', function($scope, $http, $timeout, $location, $routeParams, $rootScope, localStorageService, authFactory, ENV){
	
	$scope.data = {};
	$scope.state = {};
	$scope.state.message = "";
	
	$scope.initLogout = function(logout){
		if(logout === true){
			localStorageService.clearAll();
			$location.path('/login');
		}
	};
	
	$scope.loginUser = function(data){
		$scope.state.status = 'loading';
		authFactory.login(data).then(function(response){
			switch(response.data.code){
				case 200:
					var set = localStorageService.set('user', response.data.data);
					console.log(set);
					$location.path('/dashboard');
				break;
				case 205:
					$scope.state.status = 'not-submitted';
					$scope.state.message = "The email address or password is not correct.  Try again.";	
				break;
				case 206:
					$scope.state.status = 'not-submitted';
					$scope.state.message = "The password you entered is incorrect.  Please try again.";	
				break;
			}
		}, function(){
			$scope.state.status = 'error';
			$scope.state.message = "Unfortunately, we ran into an issue.  Please try again later.";	
		});
	};
	
	$scope.registerUser = function(data){
		data.typeId = 1;
		$scope.state.status = 'loading';
		authFactory.register(data).then(function(response){
			switch(response.data.code){
				case 200:
					$scope.state.status = 'success';
					$scope.state.message = null;	
				break;
				case 400:
					$scope.state.status = 'not-submitted';
					$scope.state.message = "This email address is already registered.  Try signing in or using forgot password.";	
				break;
				default:
					$scope.state.status = 'error';
					$scope.state.message = null;	
				break;
			}
			console.log($scope);
		}, function(){
			console.log("failed");
			$scope.state.status = 'error';
			$scope.state.message = null;	
		});
	};
	
	$scope.initForm = function(){
		$scope.state.status = 'not-submitted';
	};
	
});

// create the picspotr module
// 'templates-main',
var app = angular.module("app", ['config', 'templates', 'ngAnimate', 'ngMessages', 'ngRoute', 'ngCookies', 'routes', 'angular-loading-bar', 'angulartics', 'angulartics.google.analytics', 'authenticate', 'dashboard', 'payments', 'LocalStorageModule']);

app.config(function(localStorageServiceProvider, $httpProvider, $compileProvider, $analyticsProvider, ENV){
	
	$compileProvider.debugInfoEnabled(true);
	localStorageServiceProvider.setPrefix('hb');
	$analyticsProvider.firstPageview(true); // records all pages
	$analyticsProvider.withAutoBase(true); // records full path
	
});

app.factory('global', function($location, $http, $cookies, $rootScope, ENV) {
	
	return {
		env: ENV,
		appURL : ENV.appURL,
		apiUrl : ENV.apiURL,
		validateToken: function(user){
		    return $http({
				method: 'get',
				url: ENV.apiURL+"/users/session/"+user.token,
				dataType: 'json',
		    });
		}

	};
});

app.run(['$location', '$rootScope', '$cookies', 'localStorageService', 'global', function($location, $rootScope, $cookies, localStorageService, global) {
	
	localStorageService.set("init", global.env);
	
	$rootScope.$on('$routeChangeSuccess', function (event, current) {
		if (current.hasOwnProperty('$$route')) {
		  	$rootScope.title = current.$$route.title;
		  	$rootScope.bodyClass = current.$$route.bodyClass;
		  	
		  	if(current.$$route.authRequired === true){
			  	global.validateToken(localStorageService.get("user")).then(function(response){
				  	if(response.data.code === 205){
					  	$location.path('/session-expired');
				  	}
			  	}, function(){
				  	$location.path('/session-expired');
			  	});
		  	}
		}
	});
	
		
}]);





// create the route provider
angular.module('routes', []).config(function($routeProvider, $locationProvider){
	$routeProvider.when("/", {
		controller: "authenticate",
		templateUrl: "users/login.tpl.html",
		title: "Login",
		bodyClass: "authentication",
		authRequired: false
	})
	.when("/register/brand", {
		controller: "authenticate",
		templateUrl: "users/register-brand.tpl.html",
		title: "Create Your Brand",
		bodyClass: "authentication",
		authRequired: false
	})
	.when("/register", {
		controller: "authenticate",
		templateUrl: "users/register-account.tpl.html",
		title: "Register New User",
		bodyClass: "authentication",
		authRequired: false
	})
	.when("/login", {
		controller: "authenticate",
		templateUrl: "users/login.tpl.html",
		title: "Login",
		bodyClass: "authentication",
		authRequired: false
	})
	.when("/session-expired", {
		controller: "authenticate",
		templateUrl: "users/expired.tpl.html",
		title: "Session Expired",
		bodyClass: "authentication",
		authRequired: false
	})
	.when("/dashboard", {
		controller: "dashboard",
		templateUrl: "dashboard/index.tpl.html",
		title: "My Dashboard",
		bodyClass: "dashboard",
		authRequired: true
	})
	.when("/payments/charge", {
		controller: "payments",
		templateUrl: "payments/charge.tpl.html",
		title: "Single Charge",
		bodyClass: "payments",
		authRequired: true
	})
	.when("/payments/subscription", {
		controller: "payments",
		templateUrl: "payments/subscription.tpl.html",
		title: "Subscribe to a Plan",
		bodyClass: "payments",
		authRequired: true
	})
	.when("/payments/history", {
		controller: "payments",
		templateUrl: "payments/index.tpl.html",
		title: "Payment History",
		bodyClass: "payments",
		authRequired: true
	})
	.when("/404", {
		templateUrl: "site/page-not-found.tpl.html",
		title: "Oooopsss... ",
		bodyClass: "site",
		authRequired: false
	})
	.otherwise({
		redirectTo: "/404",
		bodyClass: "site"
	});
});

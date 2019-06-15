angular.module('payments', ['ngResource']).factory('payFactory', function($http, ENV){
	return {
	    getToken: function(){
		    return $http({
				method: 'get',
				url: ENV.apiURL+"/payments/token",
				dataType: 'json',
		    });
	    },
	    plans: function(){
		    return $http({
				method: 'get',
				url: ENV.apiURL+"/subscriptions/plans",
				dataType: 'json',
		    });
	    },
	    refund: function(object){
	    	return $http({
	    		method: 'post',
	    		data: object,
	    		url: ENV.apiURL+"/payments/refund",
	    		dataType: 'json'
	    	})
	    },
	    subscribe: function(object){
		    return $http({
				method: 'post',
				data: object,
				url: ENV.apiURL+"/subscriptions",
				dataType: 'json',
		    });
	    },
	    process: function(transaction){
			return $http({
				method: 'post',
				data: transaction,
				url: ENV.apiURL+"/payments",
				dataType: 'json',
			})
	    },
	    history: function(userId){
		    return $http({
			    method: 'post',
			    url: ENV.apiURL+"/payments/history",
			    dataType: 'json',
			    data: {
				    userId: userId
			    }
		    })
	    }		
	}
}).controller('payments', function($scope, $http, $timeout, $location, $routeParams, $rootScope, localStorageService, payFactory, global, ENV){
	
	$scope.happening = {
		status: "not-submitted",
		message: ""
	};
	
	$scope.data = {};
	$scope.state = {};
	$scope.payments = {};
	$scope.plans = {};
	$scope.state.message = "";
	
	$scope.initForm = function(){
		$scope.state.status = 'not-submitted';
	};
	
	$scope.refundTransaction = function(payment){
		var content = {
			id: payment.id,
			transactionId: payment.transactionId
		};
		payFactory.refund(content).then(function(response){
			console.log(response);
			if(response.data.status === true){
				// $scope.state.status = 'success';
				$scope.happening.status = "success";
				$scope.happening.message = "Transaction refunded successfully!";
				hideAlerts();
				$scope.initPaymentHistory();
				
			} else {
				// $scope.state.status = 'error';
				$scope.happening.status = "error";
				$scope.happening.message = "There was an error refunding this transaction.";
				hideAlerts();
			}
		}, function(){
			// $scope.state.status = 'error';
			$scope.happening.status = "error";
			$scope.happening.message = "There was a server error while refunding this transaction.";
			hideAlerts();
		});
	};

	$scope.initPaymentHistory = function(){
		$scope.state.status = 'loading';
		let me = localStorageService.get("user");
		payFactory.history(me.id).then(function(response){
			if(response.data.data.length > 0){
				console.log(response.data);
				$scope.payments = response.data.data;
				$scope.state.status = 'success';
			} else {
				$scope.state.status = 'no-results';
			}
		}, function(){
			$scope.state.status = 'error';
		});
	};
	
	$scope.initTransaction = function(){
		$scope.state.status = 'loading';
		payFactory.getToken().then(function(response){
			if(response.data.status === true){
				$scope.state.status = 'success';
				$scope.payments = response.data;
				localStorageService.set("nonce", { provider: response.data.provider, token: response.data.data, publicKey: response.data.publicKey });
			} else {
				$scope.state.status = 'error';
			}
		}, function(){
			$scope.state.status = 'no-connection';
		});
	};
	
	$scope.initSubscriptionPlans = function(){
		payFactory.plans().then(function(response){
			if(response.data.status === true){
				if(response.data.data.length > 0){
					$scope.plans = response.data.data;
					$scope.initTransaction();
				} else {
					$scope.payments.plans = [];
				}
			} else {
				$scope.state.status = 'error';
			}
		}, function(){
			$scope.state.status = 'error';
		});
	};
	
	$scope.returnStatus = function(status){
		switch(status){
			case 'refunded':
				return 'Refunded';
			break;
			case 'success':
				return 'Paid';
			break;
			default:
				return 'Unsuccessful';
			break;
		}
	};
	
	var hideAlerts = function(){
		$timeout(function(){
			$scope.happening.status = 'not-submitted';
			$scope.happening.message = "";
		}, 4000);
	};

	
	var subscribeToPlan = function(transaction){
		payFactory.subscribe(transaction).then(function(response){
			if(response.data.status === true){
				$scope.state.status = "charge-success";
			} else {
				$scope.state.status = "error";
			}
		}, function(){
			$scope.state.status = "error";
		});	
	};
	
	var oneTimePayment = function(transaction){
		payFactory.process(transaction).then(function(response){
			if(response.data.status === true){
				
				$scope.state.status = 'charge-success';
				$scope.happening.status = "success";
				$scope.happening.message = "Transaction processed successfully!";
				hideAlerts();
				
			} else {
				
				$scope.state.status = 'charge-error';
				$scope.happening.status = "error";
				$scope.happening.message = "There was an error processing this transaction.";
				hideAlerts();
				
			}
		}, function(){
			
			$scope.state.status = 'charge-error';
			$scope.happening.status = "error";
			$scope.happening.message = "There was a server error processing this transaction.";
			hideAlerts();
			
		});		
	};
	
	$scope.subscribeToPaymentPlan = function(form, data){
		var me = localStorageService.get("user");
		var token = localStorageService.get("nonce");
		
		switch(token.provider){
			case 'braintree':
				/****** ********* *******/
				/****** BRAINTREE *******/
				/****** ********* *******/
				var client = new braintree.api.Client({ clientToken: token.token });
				client.tokenizeCard({
					number: data.number,
					expirationMonth: data.expMonth,
					expirationYear: data.expYear,
					cvv: data.cvv
				}, function(err, nonce){

					if(err){

						$scope.state.status = 'charge-error';
					
					} else {

						subscribeToPlan({
							payment_method_nonce: nonce,
							providerPlanId: data.plan.sourceId,
							trialDays: data.plan.trialDays,
							userId: me.id,
							email: me.email,
							description: "Subscribing to "+data.plan.name,
							firstName: me.firstName,
							lastName: me.lastName,
							coupon: data.coupon ? data.coupon : null
						});

					}
					
				});				
			
			break;
			case 'stripe':
				/****** ********* *******/
				/******   STRIPE  *******/
				/****** ********* *******/

				Stripe.setPublishableKey(token.publicKey);
				
				// tokenize the card
				Stripe.card.createToken({ 
					number: data.number,
					cvc: data.cvv,
					exp_month: data.expMonth,
					exp_year: data.expYear
				}, function(status, response){
					
					if(status !== 200){
						
						$scope.state.status = "charge-error";
						
					} else {
						
						// use the token to create the customer
						subscribeToPlan({
							payment_method_nonce: response.id,
							providerPlanId: data.plan.sourceId,
							trialDays: data.plan.trialDays,
							userId: me.id,
							email: me.email,
							description: "Subscribing to "+data.plan.name,
							firstName: me.firstName,
							lastName: me.lastName,
							coupon: data.coupon ? data.coupon : null
						});
						
					}
				});
			break;
		}
		

	};
	
	$scope.makeOneTimeCharge = function(form, data){
		var token = localStorageService.get("nonce");
		
		$scope.happening.status = "loading";
		$scope.happening.message = "Processing your transactions.";
		
		switch(token.provider){
			case 'braintree':
				/****** ********* *******/
				/****** BRAINTREE *******/
				/****** ********* *******/
				var client = new braintree.api.Client({ clientToken: token.token });
				client.tokenizeCard({
					number: data.number,
					expirationMonth: data.expMonth,
					expirationYear: data.expYear,
					cvv: data.cvv
				}, function(err, nonce){
					
					console.log(err);
					console.log(nonce);
					
					if(err){

						$scope.state.status = 'charge-error';
						$scope.happening.status = "error";
						$scope.happening.message = "There was an error with this transaction. Try again later.";
						
					} else {
						let me = localStorageService.get("user");
						
						oneTimePayment({
							payment_method_nonce: nonce,
							amountPaid: data.amount,
							userId: me.id,
							email: me.email,
							description: 'Single transaction in framework using braintree'
						});
												
					} 
				});
			break;
			case 'stripe':
				/****** ********* *******/
				/******   STRIPE  *******/
				/****** ********* *******/

				Stripe.setPublishableKey(token.publicKey);
				
				Stripe.card.createToken({ 
					number: data.number,
					cvc: data.cvv,
					exp_month: data.expMonth,
					exp_year: data.expYear
				}, function(status, response){

					if(status !== 200){
						
						$scope.state.status = 'charge-error';
						$scope.happening.status = "error";
						$scope.happening.message = "There was an error with this transaction. Try again later.";
					
					} else {
						
						let me = localStorageService.get("user");
						
						oneTimePayment({
							payment_method_nonce: response.id,
							amountPaid: data.amount,
							userId: me.id,
							email: me.email,
							description: 'Single transaction in framework using stripe'
						});
						
					}
				});
				
				
			break;
		}
	};
	

	
});

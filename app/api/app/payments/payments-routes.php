<?

// PAYMENT ROUTES
// PAYMENT TOKEN
$app->get('/payments/token', function($request, $response, $args){
	$payments = new Payments();
	return $response->withJSON($payments->generateToken());
});

// SUBMIT AND PROCESS A SINGLE PAYMENT
$app->post('/payments', function($request, $response, $args){
	$payments = new Payments();
	$content = $request->getParsedBody();
	return $response->withJSON($payments->processPayment($content));
});

// RETRIEVE THE PAYMENT HISTORY FOR A SINGLE CUSTOMER
$app->post('/payments/history', function($request, $response, $args){
	$payments = new Payments();
	$content = $request->getParsedBody();
	return $response->withJSON($payments->paymentHistory($content));
});

// REFUND A TRANSACTION
$app->post('/payments/refund', function($request, $response, $args){
	$payments = new Payments();
	$content = $request->getParsedBody();
	return $response->withJSON($payments->refundPayment($content));
});


// SUBSCRIPTION PLANS
// CREATE A CUSTOMER AND SUBSCRIBE TO A PLAN
$app->post('/subscriptions', function($request, $response, $args){
	$payments = new Payments();
	$content = $request->getParsedBody();
	return $response->withJSON($payments->createCustomerAndSubscribe($content));
});

// RETRIEVE SUBSCRIPTION PLANS
$app->get('/subscriptions/plans', function($request, $response, $args){
	$payments = new Payments();
	return $response->withJSON($payments->returnSubscriptionPackages());
});

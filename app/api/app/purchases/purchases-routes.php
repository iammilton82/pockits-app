<?
	
// LOG THE PURCHASE
$app->post('/purchases', function($request, $response, $args){
	$purchases = new Purchases();
	return $response->withJSON($purchases->save($request->getParsedBody()));
});

// MANAGEING INVOICE NUMBERS
$app->post('/purchases/useinvoice', function($request, $response, $args){
	$purchases = new Purchases();
	$req = $request->getParsedBody();
	return $response->withJSON($purchases->useInvoiceNumber($req[0]["id"], $req[0]["employerId"]));
});

$app->get('/purchases/getinvoicenumber', function($request, $response, $args){
	$purchases = new Purchases();
	return $response->withJSON($purchases->nextAvailableInvoice());
	exit;

});

$app->post('/purchases/update', function($request, $response, $args){
	$purchases = new Purchases();
	$req = $request->getParsedBody();
	return $response->withJSON($purchases->updatePurchase($req));
	exit;
});

$app->get('/purchases/invoice/[{number}]', function($request, $response, $args){
	$purchases = new Purchases();
	$invoiceNumber = $request->getAttribute('number');
	return $response->withJSON($purchases->invoiceByNumber($invoiceNumber));
	exit;
});
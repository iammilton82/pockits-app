<?
	
// VALIDATE COUPON CODE
$app->get('/coupons/[{code}]', function($request, $response, $args){
	$coupons = new Coupons();
	$code = $request->getAttribute('code');
	return $response->withJSON($coupons->validate($code));
});

	
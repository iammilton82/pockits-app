<?
	
// SENDING EMAILS
$app->post('/email/send', function($request, $response, $args){
	$content = $request->getParsedBody();
	$messaging = new Messaging();
	return $response->withJSON($messaging->sendEmail($content));
});
<?
	
$app->post('/users', function($request, $response, $args){
	$users = new Users();
	return $response->withJSON($users->save($request->getParsedBody()));
});

$app->post('/users/login', function($request, $response, $args){
	$users = new Users();
	return $response->withJSON($users->login($request->getParsedBody()));
});

$app->post('/users/reset', function($request, $response, $args){
	$users = new Users();
	return $response->withJSON($users->initPasswordReset($request->getParsedBody()));
});

$app->get('/users/session/[{token}]', function($request, $response, $args){
	$users = new Users();
	$token = $request->getAttribute('token');
	return $response->withJSON($users->validateToken($token));
});

$app->post('/users/exists', function($request, $response, $args){
	$users = new Users();
	return $response->withJSON($users->userExists($request->getParsedBody()));
});

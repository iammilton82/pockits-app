<?
	
// VALIDATE COUPON CODE
$app->get('/cron/importjobs/[{vendor}]', function($request, $response, $args){
	$cron = new Cron();
	$vendor = $request->getAttribute('vendor');
	return $response->withJSON($cron->importJobs($vendor));
});

	
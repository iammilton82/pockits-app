<?php
// Routes


$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});


// global controller
require_once(__DIR__."/../app/globals/globals-routes.php");

// include the users routes
require_once(__DIR__."/../app/users/users-routes.php");

// include the purchases controller
require_once(__DIR__."/../app/purchases/purchases-routes.php");

// include the purchases controller
require_once(__DIR__."/../app/coupons/coupons-routes.php");

// include the payment token
require_once(__DIR__."/../app/payments/payments-routes.php");

// XML processing routes
require_once(__DIR__."/../app/cron/cron-routes.php");

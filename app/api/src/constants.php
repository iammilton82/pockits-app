<?
	
define("ENVIRONMENT", $_SERVER['SERVER_NAME'] == 'webapp-template.hatchbuilt.info' ? 'DEVELOPMENT' : 'PRODUCTION');	

define("URL", (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]");

define("DBHOST", ENVIRONMENT === 'DEVELOPMENT' ? 'localhost' : 'localhost');	
define("DBUSER", ENVIRONMENT === 'DEVELOPMENT' ? 'hatch_template' : 'hatch_template');	
define("DBPASS", ENVIRONMENT === 'DEVELOPMENT' ? 'vihxEPLzTffs5tMm' : 'vihxEPLzTffs5tMm');	
define("DBNAME", ENVIRONMENT === 'DEVELOPMENT' ? 'hatch_template' : 'hatch_template');	

define('SITENAME', 'Web App Template ');
define("SUPPORTNAME", SITENAME.'Support');
define("SUPPORTEMAIL", 'support@milton.is');
define("NOREPLYEMAIL", 'noreply@milton.is');
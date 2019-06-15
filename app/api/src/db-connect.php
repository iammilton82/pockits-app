<?
	
function connect_db() {

	$connection = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

	return $connection;
}



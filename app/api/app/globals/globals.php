<?

use Mailgun\Mailgun;

class Messaging { 
	public function sendEmail($object){
		$return = new stdClass;
		$globals = new Globals();
		$mgCfg = $globals->mailgunConfig();
		
		$mg = new Mailgun($mgCfg->key);
		
		$emailHeader = file_get_contents(__DIR__.'/../../templates/email/header.php',TRUE);
		$emailFooter = file_get_contents(__DIR__.'/../../templates/email/footer.php',TRUE);
		
		$message = array();
		$message['from'] = $object['from'];
		$message['to'] = $object['to'];
		$message['subject'] = $object['subject'];
		$message['html'] = $emailHeader.$object['html'].$emailFooter;
		
		if(isset($object['text']))
			$message['text'] = $object['text'];
		if(isset($object['bcc']))
			$message['bcc'] = $object['bcc'];
		
		$send = $mg->sendMessage($mgCfg->domain, $message);
		if($send){
			$return->status = true;
			$return->message = "email message has been sent";
			$return->data = $message;
		} else {
			$return->status = false;
			$return->message = "email message could not be sent";
			$return->data = $message;
		}
		
		return $return;

	}
	
	public function theEmailContent($id, $replacements){
		$db = connect_db();
		$return = array();
		
		$query = "SELECT subject, html FROM site_emails WHERE id = $id LIMIT 1";
		$result = $db->query($query);
		if($result){
			if($result->num_rows > 0){
				$content = $result->fetch_array(MYSQLI_ASSOC);
				$subject = $content['subject'];
				$html = $content['html'];
				foreach($replacements as $key=>$value){
					$subject = str_replace($key, $value, $subject);
					$html = str_replace($key, $value, $html);
				}
				return array("subject"=>$subject, "html"=>$html);
				
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
}
	
class Globals {
	
	// payment configuration
	
	public function mailgunConfig(){
		$config = new stdClass;
		
		if(ENVIRONMENT === 'DEVELOPMENT'){
			$config->key = 'key-ccde6da22a04f9de0368d3b3aeab3734';
			$config->domain = 'send.latinosinhighered.com';
		} else {
			$config->key = 'key-ccde6da22a04f9de0368d3b3aeab3734';
			$config->domain = 'send.latinosinhighered.com';
		}
		
		return $config;
	}
	
	public function braintreeConfig(){
		$config = new stdClass;
		
		if(ENVIRONMENT === 'DEVELOPMENT'){
			$config->environment = 'sandbox';
			$config->merchantId = 'wkkgx4kh59bns5pq';
			$config->publicKey = '63d898jt5dhdk8r8';
			$config->privateKey = '8203539ab0828d52eeda5c22b55eafc2';
		} else {
			$config->environment = 'production';
			$config->merchantId = 'zjny3rfzjrmr7y85';
			$config->publicKey = '27fgyzfvhxt6nnj6';
			$config->privateKey = 'feaa46e5052e61676ff846f8fe61cffc';
		}
		
		return $config;
		
	}
	
	// insert mysql query
	public function insertQuery($info, $table, $process = true) { 
		
		$db = connect_db();
		
		if (!is_array($info)) { die("Insert failed"); } 
		$sql = "INSERT INTO ".$table." ("; 
		for ($i=0; $i<count($info); $i++) { 
			$sql .= key($info); 
			if ($i < (count($info)-1)) { 
				$sql .= ", "; 
			} else {
				$sql .= ") "; 
			}
			next($info); 
		} 
		
		reset($info); 
		$sql .= "VALUES ("; 
		for ($j=0; $j<count($info); $j++) { 
			$sql .= "'".$db->real_escape_string(current($info))."'"; 
			if ($j < (count($info)-1)) { 
			   $sql .= ", "; 
			} else { 
				$sql .= ") "; 
			}
			next($info); 
		} 
		
		if($process == true){	
			$run = $db->query($sql);
		} else {
			$run = true;
			echo "<br />".$sql;
		}
		
		if($run){
			return true;
		} else {
			return false;
		}
	} 

	// update mysql query
	public function updateQuery($array, $conditions, $table, $process = true) { 
		
		$db = connect_db();
		
		if (!is_array($array)) { die("Insert failed"); } 
		$sql = "UPDATE $table SET "; 
		foreach($array as $k => $v){
			$v = $db->real_escape_string($v);
	    	$sql .= "$k = '$v', ";
	    }
		
		$sql = substr($sql, '0', -2);
		$sql .= " WHERE ";
	
		foreach($conditions as $c => $d){
	    	$sql .= "$c = '$d' AND ";
	    }
	
		$sql = substr($sql, '0', -4);
		
		if($process == true){	
			$run = $db->query($sql);
		} else {
			$run = true;
			echo "<br />".$sql;
		}
		
		if($run){
			return true;
		} else {
			return false;
		}
	} 
	
	// delete query
	public function deleteQuery($conditions, $table, $process = true) { 
		
		$db = connect_db();
		
		if (!is_array($conditions)) { die("Delete failed"); } 
		$sql = "DELETE FROM $table"; 
		$sql .= " WHERE ";
		foreach($conditions as $c => $d){
	    	$sql .= "$c = '$d' AND ";
	    }
		$sql = substr($sql, '0', -4);
		
		// echo "<br />".$sql;
		
		if($process == true){	
			$run = $db->query($sql);
		} else {
			$run = true;
			echo "<br />".$sql;
		}

		if($run){
			return true;
		} else {
			return false;
		}
	}

	
}
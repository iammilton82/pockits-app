<?
	
class Users {
	
	public function save($array){
		$return = new stdClass;
		$messaging	= new Messaging();
		$globals = new Globals();
		
		if($array){
			$exists = $this->userExists($array);
			if($exists->code === 200){
				$array['password'] = null;
				$return->code = 400;
				$return->status = false;
				$return->message = "user already exists";
				$return->data = $array;
			} else {
				$array['createdDate'] = time();
				$array['updatedDate'] = time();
				$result = $globals->insertQuery($array, "u_users", true);
				$array['password'] = null;
				if($result){
					$return->code = 200;
					$return->status = true;
					$return->message = "success";
					$return->data = $array;
					
					// email welcome message
					$replacements = array();
					$replacements['[firstName]'] = $array['firstName'];
					$replacements['[emailAddress]'] = $array['email'];
					$replacements['[baseURL]'] = URL;
					$replacements['[appName]'] = SITENAME;
					$replacements['[supportName]'] = SUPPORTNAME;
					
					$content = $messaging->theEmailContent(2, $replacements);
					$content['from'] = SUPPORTNAME."<".SUPPORTEMAIL.">";
					$content['to'] = $array['email'];
					$send = $messaging->sendEmail($content);
					
				} else {
					$return->status = false;
					$return->code = 205;
					$return->message = "database insert error";
					$return->data = $array;
				}
			}
		} else {
			$return->status = false;
			$return->code = 500;
			$return->message = "no data sent to save";
			$return->data = array();
		}
		return $return;
	}
	
	public function initPasswordReset($array){
		$return 	= new stdClass;
		$messaging	= new Messaging();
		$email 		= $array['email'];
		$result 	= $this->selectUserQuery("u.email = '$email'", true);
		if($result){
			if($result->num_rows > 0){
				// found the email
				$user = $result->fetch_array(MYSQLI_ASSOC);
				$resetKey = $this->randomString(12);
				
				// store the reset data
				$reset = array();
				$conditions = array();
				
				$conditions['id'] = $user['id'];
				$reset['resetKey'] = md5($resetKey);
				
				$globals = new Globals();
				$save = $globals->updateQuery($reset, $conditions, "u_users", true);
				if(!$save){
					$return->status = false;
					$return->code = 204;
					$return->message = "having trouble with the reset";
					$return->data = $array;
				} else {
					// send the reset email
					$replacements = array();
					$replacements['[firstName]'] = $user['firstName'];
					$replacements['[emailAddress]'] = $user['email'];
					$replacements['[tempPassword]'] = $resetKey;
					$replacements['[baseURL]'] = URL;
					$replacements['[supportName]'] = SUPPORTNAME;
					
					$content = $messaging->theEmailContent(1, $replacements);
					if($content){
						$content['from'] = SUPPORTNAME."<".SUPPORTEMAIL.">";
						$content['to'] = $user['email'];
						$send = $messaging->sendEmail($content);
						if($send){
							$return->status = true;
							$return->code = 200;
							$return->message = "successfully sent new password";
							$return->data = null;
						} else {
							$return->status = false;
							$return->code = 205;
							$return->message = "could not send the password reset email";
							$return->data = false;
						}
					} else {
						$return->status = false;
						$return->code = 500;
						$return->message = "could not get the email content";
						$return->data = array();
					}
				}
			} else {
				// couldn't find the email
				$return->status = true;
				$return->code = 205;
				$return->message = "user doesn't exists - success";
				$return->data = false;
			}
		} else {
			$return->status = false;
			$return->code = 500;
			$return->message = "db error: could not return a result";
			$return->data = array();
		}
		return $return;
	}
	
	public function login($array){
		$return 	= new stdClass;
		$email 		= $array['email'];
		$password 	= $array['password'];
		
		$result 	= $this->selectUserQuery("u.email = '$email'", true);
		if($result){
			if($result->num_rows > 0){
				$user = $result->fetch_array(MYSQLI_ASSOC);
				if($user['password'] === $password || $user['resetKey'] === $password){
					$user['password'] = null;
					$user['token'] = $this->generateSessionToken($user);
					
					// get the users subscription
					$subscription = $this->getUserSubscription($user['id']);
					if($subscription !== false){
						$user['subscription'] = $subscription;
					} else {
						$user['subscription'] = false;
					}
					
					$return->status = true;
					$return->code = 200;
					$return->message = "successful login";
					$return->data = $user;
				} else {
					$user['password'] = null;
					$return->status = false;
					$return->code = 206;
					$return->message = "password is incorrect";
					$return->data = $user;
				}
			} else {
				$return->status = true;
				$return->code = 205;
				$return->message = "user doesn't exists - success";
				$return->data = false;
			}
		} else {
			$return->status = false;
			$return->code = 500;
			$return->message = "db error: could not return a result";
			$return->data = array();
		}
		
		return $return;
		
	}
	
	private function getUserSubscription($userId){
		$db = $db = connect_db();
		
		$result = $db->query("SELECT s.providerCustomerId, s.subscriptionId, s.planId, s.dateUpdated, p.name as planName 
		FROM payments_subscriptions as s 
		LEFT JOIN payments_plans as p
		ON s.planId = p.sourceId
		WHERE s.userId = $userId AND s.status = 1 ORDER BY s.id DESC LIMIT 1");
		
		if($result){
			$subscribed = array();
			if($result->num_rows > 0){
				$subscribed['subscribed'] = true;
				$subscribed['plan'] = $result->fetch_array(MYSQLI_ASSOC);
			} else {
				$subscribed['subscribed'] = false;
			}
		} else {
			$subscribed = false;
		}
		
		return $subscribed;
	}
	
	public function userExists($array){
		$return 	= new stdClass;
		$email 		= $array['email'];
		$typeId 	= $array['typeId'];
		
		$result 	= $this->selectUserQuery("u.email = '$email'");
		if($result){

			if($result->num_rows > 0){
				$return->status = true;
				$return->code = 200;
				$return->message = "user exists - success";
				$return->data = true;
			} else {
				$return->status = false;
				$return->code = 205;
				$return->message = "user doesn't exists - success";
				$return->data = false;
			}
			
		} else {
			$return->status = false;
			$return->code = 500;
			$return->message = "db error: could not return a result";
			$return->data = array();
		}
		return $return;
	}
	
	public function validateToken($token){
		$return 	= new stdClass;
		$token = explode("sep", $token);
		
		$expiration = $token[1];
		if(time() > $expiration){
			$return->status = false;
			$return->code = 205;
			$return->message = "user session expired v1";
			$return->data = false;
		} else {
			$return->status = true;
			$return->code = 200;
			$return->message = "user session valid";
			$return->data = true;
		}
		return $return;
	}
	
	private function generateSessionToken($user){
		// usepexpirationTimesepuserIdsepcreatedTimeseprandomstring
		return $this->randomString(3)."sep".strtotime("+7 days")."sep".$user['id']."pes".time()."pes".$this->randomString(7);
	}
	
	private function randomString($length = 6){
		$str = "";
		$characters = array_merge(range('a','z'), range('A','Z'), range('0','9'));
		$max = count($characters) - 1;
		for ($i = 0; $i < $length; $i++) {
			$rand = mt_rand(0, $max);
			$str .= $characters[$rand];
		}
		return $str;
	}
	
	private function selectUserQuery($query, $password = false){
		$db = connect_db();
		$sql = "SELECT u.id, u.email, u.firstName, u.lastName, t.name, t.display, from_unixtime(u.createdDate) as dateCreated, from_unixtime(u.updatedDate) as dateUpdated ";
		if($password === true){
			$sql .= ", u.password, u.resetKey ";
		}
		$sql .= "FROM u_users as u LEFT JOIN u_types as t ON u.typeId = t.id WHERE ".$query;
		return $db->query($sql);
	}

}

?>
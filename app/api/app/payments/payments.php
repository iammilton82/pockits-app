<?

class Payments {
	
	public function createCustomerAndSubscribe($object){
		$return 	= new stdClass;
		$globals 	= new Globals();
		$processor 	= $this->getPaymentPlatform();
		$db 		= connect_db();
		$transaction= array();
		$sale		= array();
		$actions 	= array();
		
		switch($processor['provider']){
			case 'braintree':
				Braintree_Configuration::environment($processor['environment']);
				Braintree_Configuration::merchantId($processor['merchantId']);
				Braintree_Configuration::publicKey($processor['publicKey']);
				Braintree_Configuration::privateKey($processor['privateKey']);

				$sale['firstName']					= $object['firstName'];
				$sale['lastName']					= $object['lastName'];
				$sale['email']						= $object['email'];
				$sale['paymentMethodNonce']			= $object['payment_method_nonce'];
				$result = Braintree_Customer::create($sale);
				
				if($result->success){
					
					// store the customer in payments_customer
					$transaction['userId'] 			= $object['userId'];
					$transaction['providerId'] 		= $processor['providerId'];
					$transaction['providerCustomerId'] = $result->customer->id;
					$transaction['providerToken'] 	= $result->customer->paymentMethods[0]->token;
					$transaction['dateCreated'] 	= time();
					
					$save = $globals->insertQuery($transaction, 'payments_customers', true);
					
					// subscribe the user to a plan
					$sale 							= array();
					$sale['paymentMethodToken']		= $transaction['providerToken'];
					$sale['planId']					= $object['providerPlanId'];
					$sale['trialDuration']			= $object['trialDays'];
					$sale['trialDurationUnit']		= 'day';
					$subscribe 						= Braintree_Subscription::create($sale);
					
					if($subscribe->success){
						
						$deactivate = $this->deactivateUserSubscriptions($object['userId']);
						
						$local 							= array();
						$local['userId']				= $object['userId'];
						$local['providerCustomerId']	= $result->customer->id;
						$local['subscriptionId']		= $subscribe->subscription->id;
						$local['planId']				= $object['providerPlanId'];
						$local['status']				= 1;
						$local['dateSubscribed']		= time();
						$local['dateUpdated']			= time();
						$local['coupon'] 				= isset($object['coupon']) ? $object['coupon'] : null;
						
						$save = $globals->insertQuery($local, 'payments_subscriptions', true);
						
						$actions['customer'] = $transaction;
						$actions['subscription'] = $local;
						
						$return->data = $actions;
						$return->status = true;
						$return->code = 200;
						$return->message = "success";
						
					} else {

						$return->status = false;
						$return->code = 500;
						$return->message = "could not subscribe customer to plan";
						$return->data = $result->errors->deepAll();
						
					}
					
				} else {
					$return->status = false;
					$return->code = 500;
					$return->message = "could not create customer in provider";
					$return->data = $result->errors->deepAll();
				}
					
			break;
			case 'stripe':

				$sale['description'] 				= "Customer for ".$object['email'];
				$sale['source'] 					= $object['payment_method_nonce'];
				$sale['email'] 						= $object['email'];
				$sale['metadata']['firstName'] 		= $object['firstName'];
				$sale['metadata']['lastName'] 		= $object['lastName'];
				$sale['metadata']['userId'] 		= $object['userId'];
				
				\Stripe\Stripe::setApiKey($processor['privateKey']);
				$result = \Stripe\Customer::create($sale);
				
				if($result){
					// store the customer in payments_customers
					$transaction['userId'] 			= $object['userId'];
					$transaction['providerId'] 		= $processor['providerId'];
					$transaction['providerCustomerId'] = $result->id;
					$transaction['dateCreated'] 	= time();
					
					$save = $globals->insertQuery($transaction, 'payments_customers', true);
					
					// subscribe the user to a plan
					$sale		= array();
					$sale['customer'] 				= $result->id;
					$sale['plan'] 					= $object['providerPlanId'];
					$sale['coupon'] 				= isset($object['coupon']) ? $object['coupon'] : null;
					$sale['trial_period_days']		= $object['trialDays'];
					
					$subscribe = \Stripe\Subscription::create($sale);
					
					// save the subscription in our DB
					if($subscribe){
						
						$deactivate = $this->deactivateUserSubscriptions($object['userId']);

						$local 							= array();
						$local['userId']				= $object['userId'];
						$local['providerCustomerId']	= $result->id;
						$local['subscriptionId']		= $subscribe->id;
						$local['planId']				= $object['providerPlanId'];
						$local['status']				= 1;
						$local['dateSubscribed']		= time();
						$local['dateUpdated']			= time();
						$local['coupon'] 				= isset($object['coupon']) ? $object['coupon'] : null;
						
						$save = $globals->insertQuery($local, 'payments_subscriptions', true);
						
						$actions['customer'] = $transaction;
						$actions['subscription'] = $local;
						
						$return->data = $actions;
						$return->status = true;
						$return->code = 200;
						$return->message = "success";

					
					} else {
						
						$return->status = false;
						$return->code = 501;
						$return->message = "could not subscribe customer to plan";
						$return->data = array();
						
					}
					
				} else {
					$return->status = false;
					$return->code = 500;
					$return->message = "could not create customer in provider";
					$return->data = array();
				}
			
			break;
		}
		
		return $return;				
	}
	
	private function deactivateUserSubscriptions($userId){
		
		$db 		= connect_db();
		$update = $db->query("UPDATE payments_subscriptions SET status = 0, dateUpdated = '".time()."' WHERE userId = $userId AND status = 1");
		
		if($update){
			return true;
		} else {
			return false;
		}
		
	}
	
	public function returnSubscriptionPackages(){
		
		$return 	= new stdClass;
		$globals 	= new Globals();
		$processor 	= $this->getPaymentPlatform();
		$db 		= connect_db();
		$result 	= $db->query("SELECT id, sourceId, name, price, frequency, trialDays FROM payments_plans WHERE providerId = {$processor['providerId']} AND active = 1");
		if($result){
			if($result->num_rows > 0){
				$return->data = array();
				while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
					array_push($return->data, $row);
				}
				$return->status = true;
				$return->code = 200;
				$return->message = "success";
			} else {
				$return->status = true;
				$return->code = 205;
				$return->message = "no payment plans available";
				$return->data = false;
			}
		} else {
			$return->status = false;
			$return->code = 500;
			$return->message = "could not query the payment plans";
			$return->data = array();
		}
		
		return $return;
	}
	
	public function paymentHistory($object){
		$return 	= new stdClass;
		$globals 	= new Globals();
		$db 		= connect_db();
		$userId 	= $object['userId'];
		$result		= $db->query("SELECT p.id, p.userId, p.amount, p.status, p.transactionId, p.provider, p.dateCreated, u.email, u.firstName, u.lastName, p.currency, c.symbol FROM payments_history as p
						LEFT JOIN u_users as u 
						ON p.userId = u.id
						LEFT JOIN config_currencies as c
						ON p.currency = c.code
						WHERE p.userId = $userId ORDER BY p.dateCreated DESC");
		
		if($result){
			if($result->num_rows > 0){
				$return->data = array();
				while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
					array_push($return->data, $row);
				}
				$return->status = true;
				$return->code = 200;
				$return->message = "success";
			} else {
				$return->status = true;
				$return->code = 205;
				$return->message = "no payment history available";
				$return->data = false;
			}
		} else {
			$return->status = false;
			$return->code = 500;
			$return->message = "could not query the payments history";
			$return->data = array();
		}
		
		return $return;
		
	}
	
	public function generateToken(){
		
		$return = new stdClass;
		$globals = new Globals();
		$processor = $this->getPaymentPlatform();
		
		switch($processor['provider']){
			case 'braintree':
				Braintree_Configuration::environment($processor['environment']);
				Braintree_Configuration::merchantId($processor['merchantId']);
				Braintree_Configuration::publicKey($processor['publicKey']);
				Braintree_Configuration::privateKey($processor['privateKey']);
				
				$clientToken = Braintree_ClientToken::generate();
				if($clientToken){
					$return->provider = 'braintree';
					$return->status = true;
					$return->message = "success";
					$return->data = $clientToken;
					$return->publicKey = $processor['publicKey'];
				} else {
					$return->provider = 'braintree';
					$return->false = true;
					$return->message = "no token returned";
					$return->data = array();
				}
			break;
			case 'stripe':
				$return->provider = 'stripe';
				$return->status = true;
				$return->message = "no token needed";
				$return->data = array();				
				$return->publicKey = $processor['publicKey'];
			break;
		}
		
		return $return;

	}
	
	public function getPaymentPlatform(){
		$db = connect_db();
		$result = $db->query("SELECT s.value, p.id as providerId, p.provider, p.publicKey, p.privateKey, p.merchantId, p.environment, p.currency FROM config_settings as s
		LEFT JOIN config_payments as p
		ON s.value = p.id
		WHERE s.id = 1 ORDER BY p.id LIMIT 1");
		if($result){
			$row = $result->fetch_assoc();
			return $row;
		} else {
			return false;
		}
	}

	public function refundPayment($object){
	
		$return = new stdClass;
		$globals = new Globals();
		$processor = $this->getPaymentPlatform();
		$transaction = array();
		$sale 		= array();
		
		switch($processor['provider']){
			case 'braintree':

				Braintree_Configuration::environment($processor['environment']);
				Braintree_Configuration::merchantId($processor['merchantId']);
				Braintree_Configuration::publicKey($processor['publicKey']);
				Braintree_Configuration::privateKey($processor['privateKey']);
				
				$result = Braintree_Transaction::refund($object['transactionId']);
				
				if($result->success){
					
					$transaction['status'] 			= 'refunded';
					$transaction['dateUpdated'] 	= time();
					$transaction['providerResponse']= 'Issued payment refund on '.date('M/d/y');
					
					$conditions['id'] 				= $object['id'];
					$conditions['transactionId'] 	= $object['transactionId'];
					
					$save = $globals->updateQuery($transaction, $conditions, 'payments_history', true);
					
					if($save){
						$return->status = true;
						$return->code = 200;
						$return->message = "Refund issued and saved in the DB";
						$return->data = array();
					} else {
						$return->status = true;
						$return->code = 201;
						$return->message = "Refund issued but not saved in the DB because of a DB error";
						$return->data = array();
					}
					
				} else {
					$return->status = false;
					$return->code = 500;
					$return->message = "could not process provider service to issue refund ".$processor['provider'];
					$return->data = array();
				}
			
			break;
			case 'stripe':
				
				$sale['charge'] = $object['transactionId'];
				
				\Stripe\Stripe::setApiKey($processor['privateKey']);
				$result = \Stripe\Refund::create($sale);
				
				if($result->status === 'succeeded'){
					
					$transaction['status'] 			= 'refunded';
					$transaction['dateUpdated'] 	= time();
					$transaction['providerResponse']= 'Issued payment refund on '.date('M/d/y');
					
					$conditions['id'] 				= $object['id'];
					$conditions['transactionId'] 	= $object['transactionId'];
					
					$save = $globals->updateQuery($transaction, $conditions, 'payments_history', true);
					
					if($save){
						$return->status = true;
						$return->code = 200;
						$return->message = "Refund issued and saved in the DB";
						$return->data = array();
					} else {
						$return->status = true;
						$return->code = 201;
						$return->message = "Refund issued but not saved in the DB because of a DB error";
						$return->data = array();
					}
					
				} else {
					$return->status = false;
					$return->code = 500;
					$return->message = "could not process provider service to issue refund ".$processor['provider'];
					$return->data = array();
				}
				
			break;
		}
		
		return $return;

	}
	
	public function processPayment($object){
		$return = new stdClass;
		$globals = new Globals();
		$processor = $this->getPaymentPlatform();
		
		$sale 										= array();
		$options 									= array();
		$transaction 								= array();
		
		switch($processor['provider']){
			case 'braintree':
				$options['submitForSettlement'] 	= true;
		
				$sale['amount'] 					= $object['amountPaid'];
				$sale['paymentMethodNonce'] 		= $object['payment_method_nonce'];
				$sale['options'] 					= $options;
				
				Braintree_Configuration::environment($processor['environment']);
				Braintree_Configuration::merchantId($processor['merchantId']);
				Braintree_Configuration::publicKey($processor['publicKey']);
				Braintree_Configuration::privateKey($processor['privateKey']);
				$result = Braintree_Transaction::sale($sale);
				
				if($result->success){
					
					$transaction['dateCreated'] 	= time();
					$transaction['transactionId'] 	= $result->transaction->id;
					$transaction['provider'] 		= $processor['providerId'];
					$transaction['userId'] 			= $object['userId'];
					$transaction['amount']			= $object['amountPaid'];
					$transaction['status']			= 'success';
					$transaction['providerResponse']= $result->transaction->processorResponseText;

				} else {
					
					$transaction['dateCreated'] 	= time();
					$transaction['transactionId'] 	= null;
					$transaction['provider'] 		= $processor['providerId'];
					$transaction['userId'] 			= $object['userId'];
					$transaction['amount']			= $object['amountPaid'];
					$transaction['status']			= 'failed';
					$transaction['providerResponse']= $result->transaction;

				}
				
			break;
			case 'stripe':

				$sale['amount'] 					= $object['amountPaid'] * 100;
				$sale['currency'] 					= $processor['currency'];
				$sale['description'] 				= $object['description'];
				$sale['source'] 					= $object['payment_method_nonce'];
				// $sale['email'] 						= $object['email'];
				
				\Stripe\Stripe::setApiKey($processor['privateKey']);
				$result = \Stripe\Charge::create($sale);
				
				if($result->status === 'succeeded'){
					
					$transaction['dateCreated'] 	= time();
					$transaction['transactionId'] 	= $result->id;
					$transaction['provider'] 		= $processor['providerId'];
					$transaction['userId'] 			= $object['userId'];
					$transaction['amount']			= $object['amountPaid'];
					$transaction['status']			= 'success';
					$transaction['providerResponse']= $result->outcome->seller_message;

				} else {
					
					$transaction['dateCreated'] 	= time();
					$transaction['transactionId'] 	= null;
					$transaction['provider'] 		= $processor['providerId'];
					$transaction['userId'] 			= $object['userId'];
					$transaction['amount']			= $object['amountPaid'];
					$transaction['status']			= 'failed';
					$transaction['providerResponse']= $result->outcome->seller_message;

				}
				
			break;
		}
		
		$return->data 				= $sale;
		$return->transaction 		= $transaction;
		
		if ($transaction['status'] === 'success') {

			$return->status 			= true;
			$return->message 			= "success";
			
			// send email of successful transaction
			
		} else {

			$return->status 			= false;
			$return->message 			= "failed transaction";
		    
		}
		
		$save = $globals->insertQuery($transaction, 'payments_history', true);
		
		if($save){
			$return->update = true;
			return $return;
		} else {
			$return->update = false;
			return $return;
		}
		
	}
	
}
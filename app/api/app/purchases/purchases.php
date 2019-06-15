<?
	
class Purchases {
	
	public function save($arrays){
		$return = new stdClass;
		$globals = new Globals();
		
		if($arrays){
			for($i = 0; $i < count($arrays); $i++){
				$item = $arrays[$i];
				$globals->insertQuery($item, "jb_billing_history", true);
			}
			$return->status = true;
			$return->message = "success";
			$return->data = $arrays;
		} else {
			$data->status = false;
			$data->message = "no data sent to save";
			$data->data = array();
		}
		
	}
	
	public function updatePurchase($array){

		$db = connect_db();
		$globals = new Globals();
		$return = new stdClass;
		// print_r($array);
		$i = 0;
		$total = count($array);
		
		foreach($array as $item){
			$conditions = array();
			$conditions['id'] = $item['id'];
			$update = $globals->updateQuery($item, $conditions, "jb_billing_history",  true);
			if($update){
				$i++;
			}
		}
		
		if($i === $total){
			$return->status = true;
			$return->message = "success";
			$return->data = $array;
		} else {
			$return->status = false;
			$return->message = "insert of one or more of these items have failed";
			$return->data = array();
		}
		
		return $return;

	}
	
	public function invoiceByNumber($invoiceNumber){
		$db = connect_db();
		$return = new stdClass;
		$result = $db->query("SELECT * FROM jb_billing_history WHERE invoiceNumber = '$invoiceNumber' ORDER BY id ASC");
		if($result){
			$return->status = true;
			$return->message = "success";
			$return->data = array();
			while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
				array_push($return->data, $row);
			}			
		} else {
			$return->status = false;
			$return->message = "could not return a result";
			$return->data = array();
		}
		return $return;
	}
	
	public function useInvoiceNumber($number, $employerId){
		$db = connect_db();
		$return = new stdClass;
		$globals = new Globals();
		
		$array = array();
		$array["id"] = $number;
		$array["stillValid"] = 0;
		$array["employerId"] = $employerId;
		$array["dateUsed"] = date('M/d/Y');
		
		$conditions = array();
		$conditions['id'] = $number;
		
		$update = $globals->updateQuery($array, $conditions, "invoiceNumbers",  true);
		if($update === true){
			$return->status = true;
			$return->message = "success";
			$return->data = $number;
		} else {
			$return->status = false;
			$return->message = "update failed";
			$return->data = array();
		}
		return $return;
	}
	
	public function nextAvailableInvoice(){
		$db = connect_db();
		$result = $db->query("SELECT * FROM invoiceNumbers WHERE stillValid = 1 ORDER BY id ASC LIMIT 1");
		$return = new stdClass;
		if($result){
			$return->status = true;
			$return->message = "success";
			$return->data = array();
			while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
				array_push($return->data, $row);
			}
			$return->data = $return->data[0];
		} else {
			$return->status = false;
			$return->message = "could not return a result";
			$return->data = array();
		}
		return $return;
	}
		
}
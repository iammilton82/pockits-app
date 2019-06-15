<?
	
class Coupons {
		
	public function validate($code){
		$db = connect_db();
		$code = strtoupper($code);
		$result = $db->query("SELECT * FROM jb_coupons WHERE UPPER(code) = '$code' ORDER BY id DESC LIMIT 1");
		$return = new stdClass;
		
		if($result){
			if($result->num_rows > 0){
				$return->status = true;
				$return->message = "success";
				$return->data = array();
				while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
					array_push($return->data, $row);
				}
				$return->data = $return->data[0];
			} else {
				$return->status = false;
				$return->message = "invalid coupon code";
				$return->data = array();
			}
		} else {
			$return->status = false;
			$return->message = "could not return a result";
			$return->data = array();
		}
		return $return;
	}
		
}
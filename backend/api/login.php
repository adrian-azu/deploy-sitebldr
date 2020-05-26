<?php require 'database.php';
ini_set("display_errors",1);

require '../vendor/autoload.php';
use \Firebase\JWT\JWT;

/*function clean_text($string){
  $string=trim($string);
  $string=stripslashes($string);
  $string=htmlspecialchars($string);
}*/
if($_SERVER["REQUEST_METHOD"] == "POST"){
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  $request=json_decode($postdata);

  if(trim($request->email) === '' || trim($request->password===''))
  {
    return http_response_code(400);
  }

  $email = $conn -> real_escape_string(trim($request->email));//I'm not sure about this so if something
  $password = $conn -> real_escape_string(trim($request->password));

  $sql="SELECT * FROM user_info WHERE email=?";
  if ($stmt=$conn->prepare($sql)) {
    // Bind variables to the prepared statement as parameters
    $stmt->bind_param("s",$param_email);
      // Set parameters
    $param_email=$email;
    if ($stmt->execute()) {
        // Get result
      //$result=$stmt->get_result();
      $stmt->store_result();
        // Check if username exists, if yes then verify password
      if ($stmt->num_rows == 1) {
        $roles=$firstname=$lastname=$Email=$hashed_password=$company=$country=$time="";
        $id=0;
        $stmt->bind_result($id,$firstname,$lastname,$company,$country,$Email,$roles,$hashed_password,$time);
        $stmt->fetch();
        if(password_verify($password, $hashed_password)){ //Hashing comparison, only works with  password_hash() method
          http_response_code(200);
          $response = array(
            'email'=>$Email,
            'id'=>$id,
            'roles' => $roles,  
          );
          $payload = array(
            "iss" =>"webfunnel.com",
            "iat" =>time(),
            "nbf" =>time()+10,
            "exp" =>time()+30,
            "aud" =>$roles,
            "data"=>$response
          );
          $secret_key="any123";
          $jwt=JWT::encode($payload,$secret_key);
          echo json_encode(array("status"=>1,
            "message"=>"Logged in successfully",
            "jwt" => $jwt
          ));
        }else{
          http_response_code(500);
          $response = array(
            'status'=>0,
            'message'=>"Incorrect Password"
          );

          echo json_encode($response);

        }
      }else{
        http_response_code(500);
        $response=array(
          'status'=>0,
          'message'=>"No account found"
        );

        echo json_encode($response);

      }
    }
  }

  //$stmt->close();
 // $conn->close();

}
}

?>

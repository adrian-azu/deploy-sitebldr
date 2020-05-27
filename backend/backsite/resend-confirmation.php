<?php

include_once('../api/email-sender.php');
include_once('../api/user.php');

$db=new database();
$connection=$db->connect();
$user=new Users($connection);

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $postdata = file_get_contents("php://input");

  if(isset($postdata) && !empty($postdata)){
    $request=json_decode($postdata);
    $user->generate_id();
    $user->firstname= $user->conn->real_escape_string(trim($request->firstName));
    $user->lastname= $user->conn->real_escape_string(trim($request->lastName));
    $user->email= $user->conn->real_escape_string(trim($request->email));
    if(sendmail($user->uid, $user->email, $user->firstname, $user->lastname)){
      echo json_encode(array(
        'status'=> 1,
        'message' => 'New email verification code has been sent!',
        'code' => $user->uid
      ));
      return http_response_code(200);
    }else{
      echo json_encode(array(
      "status" =>0,
      "message" => "Invalid Email"
    ));
      return http_response_code(500);
    }
  }
}
 ?>

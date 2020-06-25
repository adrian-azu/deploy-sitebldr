<?php

include_once("../api/database.php");
include_once("../api/user.php");
include_once('../api/email-sender.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);


$db=new database();
$connection=$db->connect();
$user=new Users($connection);

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $postdata = file_get_contents("php://input");
  if(isset($postdata) && !empty($postdata)){
    $request=json_decode($postdata, true);
    $user->email = $user->conn->real_escape_string(trim($request["email"]));
    if(!empty($request)){
      if($user->verify_email()){
        $user->generate_code();
        $user->firstname= $user->conn->real_escape_string(trim($request["firstName"]));
        $user->lastname= $user->conn->real_escape_string(trim($request["lastName"]));
        if(sendmail($user->code, $user->email,$user->firstname, $user->lastname)){
          echo json_encode(array(
            'status'=> 1,
            'code' => $user->code,
          ));
          return http_response_code(200);
          unset($postdata);
        }else{
          echo json_encode(array(
          "status" =>0,
          "message" => "Network Error"
        ));
          return http_response_code(500);
        }
      }else{
          echo json_encode(array(
          "status" =>0,
          "message" => "Email already registered"
      ));
      return http_response_code(500);
      }
    }
  }
}

 ?>

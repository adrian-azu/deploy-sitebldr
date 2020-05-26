<?php

include_once("database.php");
include_once("user.php");
include_once('email-sender.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);


$db=new database();
$connection=$db->connect();
$user=new Users($connection);

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
      $request=json_decode($postdata);
      $user->email= $user->conn->real_escape_string(trim($request->email));
      if(!empty($request)){
        if($user->verify_email()){
          $user->generate_id();
          sendmail($user->uid, $user->email,$user->firstname, $user->lastname);
        }else{
            echo json_encode(array(
            "status" =>0,
            "message" => "Email already registered"
        ));
        return http_response_code(500);
        }
      }
    }
}else{
    echo json_encode(array(
    "status" =>0,
    "message" => "Access Denied"
));
  return http_response_code(500);
}

 /*function new_id()
{
  global $user;
  do {
    $generated_id = uniqid (rand (),true);
    $position=strpos($generated_id,".")+1;
    $uid=substr($generated_id,$position);
    $code=$uid;
  }while ($user->check_id($uid));
}
class generateID
{
  public $uid;
  public $code;
  public $generated_id;
  public $position;
  public $user;

}*/



 ?>
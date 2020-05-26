<?php


//include_once('../api/register.php');
include_once("../api/user.php");
include_once("../api/database.php");
/**
 *
 */
 error_reporting(E_ALL);
 ini_set('display_errors', 1);

 $db=new database();
 $connection=$db->connect();
 $user=new Users($connection);

 if($_SERVER["REQUEST_METHOD"] == "POST"){

     $postdata = file_get_contents("php://input");

     if(isset($postdata) && !empty($postdata)){

       $request=json_decode($postdata);
      $user->uid= $user->conn->real_escape_string(trim($request->Uid));
      $user->firstname= $user->conn->real_escape_string(trim($request->firstName));
      $user->lastname= $user->conn->real_escape_string(trim($request->lastName));
      $user->company= $user->conn->real_escape_string(trim($request->company));
      $user->country= $user->conn->real_escape_string(trim($request->country));
      $user->email= $user->conn->real_escape_string(trim($request->email));
      $user->password= $user->conn->real_escape_string(trim($request->password));
       //print_r($generated_code);
       if($user->register_account()){
         echo json_encode(array(
           "status" =>1,
           "message" => "Register Complete"
         ));
         if (!isset($_SESSION)) {
             session_start();
         }
         $_SESSION['uid']=$user->uid;
         return http_response_code(200);
       }else{
         echo json_encode(array(
         "status" =>0,
         "message" => "Registration Fail"
       ));
       return http_response_code(503);
   }
 }
}




 ?>

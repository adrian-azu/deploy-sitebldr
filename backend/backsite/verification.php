<?php


include_once("../api/user.php");
include_once("../api/database.php");

/**
 *
 */
 error_reporting(E_ALL);
 ini_set('display_errors', 1);

 $db=new database();    //Create another database object
 $connection=$db->connect();    //Create a variable for connection
 $user=new Users($connection);    //Initialize created connection to the sql api

 if($_SERVER["REQUEST_METHOD"] == "POST"){

     $postdata = file_get_contents("php://input");

     if(isset($postdata) && !empty($postdata)){

      $request=json_decode($postdata);
      $user->firstname= $user->conn->real_escape_string(trim($request->firstName));
      $user->lastname= $user->conn->real_escape_string(trim($request->lastName));
      $user->company= $user->conn->real_escape_string(trim($request->company));
      $user->country= $user->conn->real_escape_string(trim($request->country));
      $user->email= $user->conn->real_escape_string(trim($request->email));
      $user->password= $user->conn->real_escape_string(trim($request->password));
       if($user->register_account()){
         echo json_encode(array(
           "status" =>1,
         ));
         return http_response_code(200);
         unset($postdata);
       }else{
         echo json_encode(array(
         "status" =>0,
       ));
       return http_response_code(503);
   }
 }
}
s
 ?>

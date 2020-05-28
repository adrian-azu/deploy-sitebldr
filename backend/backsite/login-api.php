<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once("../api/user.php");
include_once("../api/database.php");

require '../vendor/autoload.php';
use \Firebase\JWT\JWT;
/**
 *
 */


 $db=new database();    //Create another database object
 $connection=$db->connect();    //Create a variable for connection
 $user=new Users($connection);    //Initialize created connection to the sql api

 if($_SERVER["REQUEST_METHOD"] == "POST"){
   $postdata = file_get_contents("php://input");
   if(isset($postdata) && !empty($postdata)){
      $request=json_decode($postdata);
      $user->email=$user->conn->real_escape_string(trim($request->email));

      $user_data = $user->verify_login();
      if(!empty($user_data) and isset($user_data)){
        $user->password=$user->conn->real_escape_string(trim($request->passWord));
        $hashed_password= $user_data['password'];
        if(password_verify($user->password, $hashed_password)){
          $response = array(
            'email'=>$user->email,
            'id'=>$user_data['user_id'],
            'roles' => $user_data['role'],
            'firstName' => $user_data['first_name'],
            'lastName' => $user_data['last_name']
          );
          $payload = array(
            "iss" =>"webfunnel.com",
            "iat" =>time(),
            "nbf" =>time()+10,
            "exp" =>time()+30,
            "aud" =>$user_data['role'],
            "data"=>$response
          );
          $secret_key="any123";
          $jwt=JWT::encode($payload,$secret_key);
          echo json_encode(array("status"=>1,
            "message"=>"Logged in successfully",
            "jwt" => $jwt
          ));
          http_response_code(200);
        }else{
          $response=array(
            'status'=>0,
            'message'=>"Incorrect Password"
          );
          echo json_encode($response);
          http_response_code(500);
        }
      }else{
        $response=array(
          'status'=>0,
          'message'=>"No account found"
        );
        echo json_encode($response);
        http_response_code(500);
      }
   }
 }


 ?>

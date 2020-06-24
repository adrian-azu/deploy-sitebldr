<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once("../api/user.php");
include_once("../api/database.php");
include_once("../api/email-sender.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $postdata = file_get_contents("php://input");
  if(isset($postdata) && !empty($postdata)){
    $request=json_decode($postdata); //decode sent data from the client
    if(isset($request) && !empty($request)){
      $db=new database();    //Create another database object
      $connection=$db->connect();    //Create a variable for connection
      $user=new Users($connection); //Initialize created connection to the sql api
      $user->email=$user->conn->real_escape_string(trim($request->email));//get the decoded data 'email'
      if(!$user->verify_email()){
        $user_data=$user->get_user_data();
        if(isset($user_data) && !empty($user_data)){
          $user_id=$user_data['user_id'];
          $email=$user_data['email'];
          $actual_link = "http://".$_SERVER['HTTP_HOST'] . htmlspecialchars($_SERVER['REQUEST_URI'])."?email=".$email;
          if(resendmail($actual_link, $email)){
            echo json_encode(array(
              'status'=> 1,
              'message' => 'Please check you email'
            ));
            return http_response_code(200);
          }else{
            echo json_encode(array(
              'status'=> 0,
              'message' => 'Email error'
            ));
            return http_response_code(500);
          }
        }else{
          echo json_encode(array(
            'status'=> 0,
            'message' => 'No Record found'
          ));
          return http_response_code(500);
        }
      }else{
        echo json_encode(array(
          'status'=> 0,
          'message' => 'No email has found on our record!'
        ));
        return http_response_code(500);

      }
    }
  }
}

if($_SERVER["REQUEST_METHOD"] == "GET"){
  if(isset($_GET['email']) && !empty($_GET['email'])){
    $db=new database();    //Create another database object
    $connection=$db->connect();    //Create a variable for connection
    $user=new Users($connection);
    $user->email=$user->conn->real_escape_string($_GET['email']);
    $user_data=$user->get_user_data();
    if(isset($user_data) && !empty($user_data)){
      $response = array(
        'email'=>$user->email,
        'id'=>$user_data['user_id'],
        'message'=>'Email confirmed',
        'status'=>1
      );
      echo json_encode($response);
      http_response_code(200);
    }else{
      echo json_encode(array(
        'message'=>'No user data found',
        'status'=>0
      ));
      http_response_code(500);
    }
  }else{
    echo json_encode(array(
      'message'=>'Email error',
      'status'=>0
    ));
    http_response_code(500);
  }
}
 ?>

<?php
include_once("../api/database.php");
include_once("../api/user.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $postdata = file_get_contents("php://input");
  if(isset($postdata) && !empty($postdata)){
    $request=json_decode($postdata); //decode sent data from the client
    if(isset($request) && !empty($request)){
      $db=new database();    //Create another database object
      $connection=$db->connect();    //Create a variable for connection
      $user=new Users($connection); //Initialize created connection to the sql api
      $user->email=$user->conn->real_escape_string(trim($request->email));
      $user->uid=$user->conn->real_escape_string(trim($request->uid));
      $user->password=$user->conn->real_escape_string(trim($request->password));
      $data=$user->verify_password();
      if(!empty($data)){
        if($user->update_password()){
          echo json_encode(array(
            'status'=> 1,
            'code' => $user->uid,
          ));
          return http_response_code(200);
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
        "message" => "Invalid ID"
      ));
        return http_response_code(500);
      }
    }else{
      echo json_encode(array(
      "status" =>0,
      "message" => "No data found"
    ));
      return http_response_code(500);
    }
  }else{
    echo json_encode(array(
    "status" =>0,
    "message" => "No data request"
  ));
    return http_response_code(500);
  }
}

  ?>

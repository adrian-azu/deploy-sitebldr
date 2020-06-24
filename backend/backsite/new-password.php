<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
  $postdata = file_get_contents("php://input");
  if(isset($postdata) && !empty($postdata)){
    $request=json_decode($postdata); //decode sent data from the client
    if(isset($request) && !empty($request)){
      $db=new database();    //Create another database object
      $connection=$db->connect();    //Create a variable for connection
      $user=new Users($connection); //Initialize created connection to the sql api
      $user->email=$user->conn->real_escape_string(trim($request->email));
      $user->id=$user->conn->real_escape_string(trim($request->id));
      $user->password=$user->conn->real_escape_string(trim($request->password));

    }
  }
}



  ?>

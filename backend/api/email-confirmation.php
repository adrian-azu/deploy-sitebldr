<?php
require 'register-api.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
      $request= json_decode($postdata);
      if(!empty($request)){
        $input_code=$conn->real_escape_string(trim($request->email));
        if(!empty($_SESSION['uid'])){
          if($_SESSION['uid']===$input_code){
              register();
              session_destroy();
              unset($_SESSION['uid']);
          }else{
            return http_response_code(500);
            echo json_encode(array(
              'status'=>0,
              'Message'=>'Incorrect Code'
            ));
          }
        }
      }
    }
}
 ?>

<?php
 require 'database.php';
 require 'email-sender.php';
ini_set("display_errors",1);

  if($_SERVER["REQUEST_METHOD"] == "POST"){

  $postdata = file_get_contents("php://input");
  $new_email=$password=$roles=$firstname=$lastname=$company=$country="";

  if(isset($postdata) && !empty($postdata)){
    $request=json_decode($postdata);
    if(!empty($request)){
      $firstname=$conn -> real_escape_string(trim($request->firstname));
      $lastname=$conn -> real_escape_string(trim($request->lastname));
      $company = $conn -> real_escape_string(trim($request->company));
      $country = $conn -> real_escape_string(trim($request->country));
      $new_email = $conn -> real_escape_string(trim($request->email));
      $role = $conn -> real_escape_string(trim($request->role));
      $password = $conn -> real_escape_string(trim($request->password));


      $sql_u = "SELECT * FROM user_info WHERE email=?";
      $stmt=$conn->prepare($sql_u);
      $stmt->bind_param("s", $param_email);
      $param_email = $new_email;
      if ($stmt->execute()) {
        $stmt->store_result();
      }
      if($stmt->num_rows >0){
        http_response_code(500);
        echo json_encode(array(
          "status" =>0,
          "message" => "Email is already registered"
      ));
      }else{
        do {
          $generated_id = uniqid (rand (),true);
          $position=strpos($generated_id,".")+1;
          $uid=substr($generated_id,$position);
          $sql_e="SELECT user_id FROM user_info WHERE user_id=?";
          $stmt=$conn->prepare($sql_e);
          $stmt->bind_param("s", $uid);
          if ($stmt->execute()) {
            $stmt->store_result();
          }
        } while ($stmt->num_rows >0);
        sendmail($uid, $new_email, $firstname, $lastname);
        $sql="INSERT INTO user_info (user_id, first_name, last_name, company_name, country, email, role, password) VALUES (?,?,?,?,?,?,?,?)";
        $stmt=$conn->prepare($sql);
        $stmt->bind_param("ssssssss", $param_id, $param_fname, $param_lname, $param_company, $param_country, $param_user, $param_role, $param_pass);
        $param_id=$uid;
        $param_fname = $firstname;
        $param_lname = $lastname;
        $param_company=$company;
        $param_country=$country;
        $param_user = $new_email;
        $param_role = $role;
        $param_pass = password_hash($password, PASSWORD_DEFAULT);
        if($stmt->execute()){
          http_response_code(200);
          echo json_encode(array(
            "status" =>1,
            "message" => "Register Complete"
          ));
        }
      }
    }else{
      return http_response_code(500);
        echo json_encode(array(
        "status" =>0,
        "message" => "Empty field"
    ));
    }
  }
}
 ?>

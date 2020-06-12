<?php

include_once 'database.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

   class Users{
     public $uid;
     public $firstname;
     public $lastname;
     public $company;
     public $country;
     public $email;
     public $role;
     public $password;
     public $code;


     public $conn;
     private $table_name;

  function __construct($db)
  {
    $this->conn=$db;
    $this->table_name="user_info";
  }
  function register_account(){
    $sql="INSERT INTO ".$this->table_name." SET user_id=?, first_name=?, last_name=?, company_name=?, country=?, email=?, role=?, password=?";
    $stmt=$this->conn->prepare($sql);
    $this->role='Client';
    $this->uid=htmlspecialchars(strip_tags($this->uid));
    $this->firstname=htmlspecialchars(strip_tags($this->firstname));
    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
    $this->company=htmlspecialchars(strip_tags($this->company));
    $this->country=htmlspecialchars(strip_tags($this->country));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->role=htmlspecialchars(strip_tags($this->role));
    $this->password=htmlspecialchars(strip_tags($this->password));


    $this->password=password_hash($this->password, PASSWORD_DEFAULT);
    $this->generate_id();

    $stmt->bind_param("ssssssss", $this->uid, $this->firstname,
    $this->lastname, $this->company, $this->country, $this->email, $this->role, $this->password);

    if($stmt->execute()){
      return true;
    }else{
        return false;
    }
  }
  function get_user_data(){
    $sql="SELECT * from user_info WHERE email=? LIMIT 1";

    $stmt = $this->conn->prepare($sql);

    //$this->email=htmlspecialchars(strip_tags($this->email));
    $stmt->bind_param("s", $this->email);
    if($stmt->execute()){
      $data = $stmt->get_result();
      return $data->fetch_assoc();
      $stmt->fetch();
    }
    return array();
  }
  function verify_email(){
    $sql= "SELECT email FROM user_info WHERE email=?";
    $stmt=$this->conn->prepare($sql);
    if($stmt=$this->conn->prepare($sql)){
      $stmt->bind_param('s', $this->email);
      if($stmt->execute()){
        $stmt->store_result();
        if($stmt->num_rows>0){
          return false;
        }else{
          return true;
        }
      }
    }else{
      $error = $this->conn->errno . ' ' . $this->conn->error;
      echo $error;
    }
  }
  function generate_code(){
      $generated_id = uniqid (rand (),true);
      $position=strpos($generated_id,".")+1;
      $this->code=substr($generated_id,$position);
  }

  function generate_id(){
    $generated_id = uniqid (rand (),true);
    $position=strpos($generated_id,".")+6;
    $this->uid=substr($generated_id,$position);
    $this->uid= "SBR".$this->uid. date("md");
  }
}


 ?>

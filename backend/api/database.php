<?php

class database
{
  private $hostname;
  private $dbname;
  private $dbusername;
  private $dbpassword;
  private $conn;

  public function connect()
  {
    $this->hostname='localhost';
    $this->dbusername='root';
    $this->dbpassword = '';
    $this->dbname='webfunnel';

    $this->conn=new mysqli($this->hostname, $this->dbusername, $this->dbpassword, $this->dbname);
    if($this->conn->errno){
      print_r($this->conn->connect_error);
        die("ERROR: Could not connect. " . $this->conn->connect_error);
        exit;
    }else{
      return $this->conn;

    }
  }
}


?>

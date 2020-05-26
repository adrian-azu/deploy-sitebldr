<?php
//define('DB_SERVER', 'localhost');
//define('DB_USERNAME', 'root');
//define('DB_PASSWORD', '');
//define('DB_NAME', 'webfunnel');
/**
 *
 */
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


/* Attempt to connect to MySQL database
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . $conn->connect_error);
}*/
?>

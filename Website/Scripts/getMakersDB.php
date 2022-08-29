<?php
$servername = "localhost";
$username = "lukas";
$password = "dodonix.io";
$url = "od.exchange";
// Validate url
if ($_SERVER['HTTP_HOST'] == $url) {
    $dbname = "mainnet";
} else {
    $dbname = "testnet";
}
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$ip = hash('sha256', $_SERVER["REMOTE_ADDR"]);
$sql = "SELECT * FROM makers WHERE ipHash='".$ip."'";
$result = $conn->query($sql);
$makerContracts2 = array();
if($result->num_rows > 0)
{
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $makerContracts2[]= $row[contractAddress];      }
  }
else {}
  $makerContracts2 = json_encode($makerContracts2);
  $conn->close();
  echo $makerContracts2;
?>

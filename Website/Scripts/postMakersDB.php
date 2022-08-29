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

$ipHash = hash('sha256', $_SERVER["REMOTE_ADDR"]);
$newContractAddress = $_POST['newContractAddress'];

$sql = "REPLACE INTO makers (ipHash, contractAddress) VALUES ('".$ipHash."', '".$newContractAddress."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

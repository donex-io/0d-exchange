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

$address = $_POST['address'];
$factory = $_POST['factory'];
$type = $_POST['type'];
$totalStake = $_POST['totalStake'];
$availableStake = $_POST['availableStake'];
$strikePrice = $_POST['strikePrice'];
$dueDate = $_POST['dueDate'];

$sql = "REPLACE INTO derivatives (address, factory, type, totalStake, availableStake, strikePrice, duedate) VALUES ('".$address."', '".$factory."', '".$type."', '".$totalStake."', '".$availableStake."', '".$strikePrice."', $dueDate)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

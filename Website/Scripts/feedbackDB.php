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
$geodata = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$_SERVER['REMOTE_ADDR']));
$region = $geodata["geoplugin_countryCode"];
$timestamp = time();
$ethereumAddress = $_POST['ethereumAddress'];
$feedback = $_POST['feedback'];

$sql = "INSERT INTO feedback (ipHash, region, timestamp, ethereumAddress, feedbackText) VALUES ('".$ip."', '".$region."', $timestamp, '".$ethereumAddress."', '".$feedback."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

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
$blockchain = $_POST['blockchain'];
$homepage = $_POST['homepage'];
$howitworks = $_POST['howitworks'];
$termsandconditions = $_POST['termsandconditions'];
$createbutton = $_POST['createbutton'];
$signcreate = $_POST['signcreate'];
$signenter = $_POST['signenter'];
$acquiretableitem = $_POST['acquiretableitem'];

$sql = "INSERT INTO analytics (ipHash, region, timestamp, blockchain, homepage, howitworks, termsandconditions, createbutton, signcreate, signenter, acquiretableitem) VALUES ('".$ip."', '".$region."', $timestamp, '".$blockchain."', '".$homepage."', '".$howitworks."', '".$termsandconditions."', '".$createbutton."','".$signcreate."','".$signenter."', '".$acquiretableitem."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

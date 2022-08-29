<?php
$servername = "localhost";
$username = "lukas";
$password = "dodonix.io";
$dbname = "indexPrice";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * from " . $_GET['asset'];
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $Date[] =  $row[Date];
        $Open[] =  $row[Open];
        $High[] =  $row[High];
        $Low[] =  $row[Low];
        $Close[] =  $row[Close];
        $AdjClose[] =  $row[AdjClose];
        $Volume[] =  $row[Volume];
    }
} else {
    //echo "0 results";
}
$conn->close();
$chartData = json_encode(array($Date, $Open, $High, $Low, $Close, $AdjClose, $Volume));
echo $chartData;
?>

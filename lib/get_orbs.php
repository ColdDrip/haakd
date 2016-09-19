<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "SELECT `orbID` FROM `Orb`";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);

echo json_encode($row);

//close connection
mysqli_close($conn);
?>

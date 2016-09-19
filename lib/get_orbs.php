<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "SELECT `orbID` FROM `Orb`";

$result = mysqli_query($conn, $sql);
$all = mysqli_fetch_all($result);

echo json_encode($all);

//close connection
mysqli_close($conn);
?>

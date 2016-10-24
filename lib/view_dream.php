<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Escape user inputs for security
$orbID = mysqli_real_escape_string($conn, $_POST['orbID']);

$sql = "SELECT `orbID`, `Story`, `Emotion`,`Image_Path_1`, `Image_Path_2`, `contributor1`, `contributor2`, `issued1`, `issued2`, `title1`, `title2`, `troveUrl1`, `troveUrl2` FROM `Orb` WHERE `orbID` = '".$orbID."'";


$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);

echo json_encode($row);

//close connection
mysqli_close($conn);
?>

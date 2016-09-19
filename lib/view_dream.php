<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Escape user inputs for security
//getting the story and emotion values the user inputted
$orbID = mysqli_real_escape_string($conn, $_POST['orbID']);

$sql = "SELECT `Story`, `Emotion`,`Image_Path_1`, `Image_Path_2` FROM `Orb` WHERE `orbID` = '".$orbID."'";

if(mysqli_query($conn, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

// close connection
mysqli_close($conn);


?>

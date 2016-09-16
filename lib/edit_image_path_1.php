<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Escape user inputs for security
$itemid = mysqli_real_escape_string($conn, $_POST['itemID']);
$photo = mysqli_real_escape_string($conn, $_POST['photo']);

//needs to be edited
$sql = "UPDATE Orb SET Image_Path_1 = '".$photo."' WHERE orbID = '".$orbID."'";


if(mysqli_query($conn, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

// close connection
mysqli_close($conn);


?>

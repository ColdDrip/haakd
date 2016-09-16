<?php
$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

var $pathId = $_GET["pathId"];
var $sql = "";
if ($pathId == "1") {
  $sql = $sql = "UPDATE Orb SET Image_Path_1 = '".$Image_Path_1."' WHERE orbID = '".$orbID."'";
} else {
  $sql = $sql = "UPDATE Orb SET Image_Path_1 = '".$Image_Path_2"' WHERE orbID = '".$orbID."'";
}

?>

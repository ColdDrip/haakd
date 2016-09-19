<?php

require_once "utils.php";

// $conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");
//
// // Check connection
// if($conn === false){
//     die("ERROR: Could not connect. " . mysqli_connect_error());
// }


$stmt = $db->prepare("SELECT `orbID` FROM `Orb`"));
$stmt->execute();


$result = $stmt->fetchAll();
print_r($result);
//$result = $stmt->fetchALL();

///echo json_encode($result);

//close connection
mysqli_close($conn);
?>

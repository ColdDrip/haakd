<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$data = json_decode(stripslashes($_POST['data']));

  // here i would like use foreach:

  foreach($data as $d){
     echo $d;
  }

//getting the orb id for this orb -- will be the highest since it was just created
$sql = "SELECT MAX(orbID) FROM Orb";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
//echo $row[0];
$orbID = $row[0];
//echo $orbID;

$Image_Path_1 = mysqli_real_escape_string($conn, $_POST['Image_Path_1']);
$Image_Path_2 = mysqli_real_escape_string($conn, $_POST['Image_Path_2']);


$sql = "UPDATE Orb SET Image_Path_1 = '".$Image_Path_1."', Image_Path_2 = '".$Image_Path_2."' WHERE orbID = '".$orbID."'";


if(mysqli_query($conn, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}


// close connection
mysqli_close($conn);


?>

<script type='text/javascript'>
  window.location.href = "../index.html";
</script>

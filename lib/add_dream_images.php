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
$contributor1 = mysqli_real_escape_string($conn, $_POST['contributor11']);
$contributor2 = mysqli_real_escape_string($conn, $_POST['contributor22']);
$issued1 = mysqli_real_escape_string($conn, $_POST['issued11']);
$issued2 = mysqli_real_escape_string($conn, $_POST['issued22']);
$title1 = mysqli_real_escape_string($conn, $_POST['title11']);
$title2 = mysqli_real_escape_string($conn, $_POST['title22']);
$troveUrl1 = mysqli_real_escape_string($conn, $_POST['troveUrl11']);
$troveUrl2 = mysqli_real_escape_string($conn, $_POST['troveUrl22']);

echo "hi", $title1;
echo "hi again", $title2;

$sql = "UPDATE Orb SET Image_Path_1 = '".$Image_Path_1."', Image_Path_2 = '".$Image_Path_2."', contributor1 = '".$contributor1."', issued1 = '".$issued1."', title1 = '".$title1."', troveUrl1 = '".$troveUrl1."', contributor2 = '".$contributor2."', issued2 = '".$issued2."', title2 = '".$title2."', troveUrl2 = '".$troveUrl2."' WHERE orbID = '".$orbID."'";


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

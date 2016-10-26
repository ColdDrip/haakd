<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

//getting the max orbID in the database, and adding one in order to create the next orb ID for this new orb
$sql = "SELECT MAX(orbID) FROM Orb";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
//echo $row[0];
$orbID = $row[0] + 1;
//echo $orbID;


// Escape user inputs for security
//getting the story and emotion values the user inputted
$Story = mysqli_real_escape_string($conn, $_POST['Story']);
$Emotion = mysqli_real_escape_string($conn, $_POST['Emotion']);


//$Image_Path_1 = 0;
//$Image_Path_2 = 0;

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

$sql = "INSERT INTO `Orb` (`orbID`, `Story`, `Emotion`, `Image_Path_1`,`Image_Path_1`, `contributor1`,`contributor2`, `issued1`,`issued2`, `title1`,`title2`, `troveUrl1`,`troveUrl2`) VALUES ('$orbID', '$Story', '$Emotion', '$Image_Path_1', '$Image_Path_2', '$contributor1', '$contributor2', '$issued1', '$issued2', '$title1', '$title2', '$troveUrl1', '$troveUrl2')";


if(mysqli_query($conn, $sql)){
    echo "";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

// close connection
mysqli_close($conn);


?>

<!-- <script type='text/javascript'>
  window.location.href = "../index.html";
</script>
-->

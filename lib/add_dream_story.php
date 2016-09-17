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


$Image_Path_1 = 0;
$Image_Path_2 = 0;

$sql = "INSERT INTO `Orb` (`orbID`, `Story`, `Emotion`,`Image_Path_1`, `Image_Path_2`) VALUES ('$orbID', '$Story', '$Emotion','$Image_Path_1','$Image_Path_2')";


if(mysqli_query($conn, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

// close connection
mysqli_close($conn);


?>

<script type='text/javascript'>
  window.location.href = "../add_dream_images.html";
</script>

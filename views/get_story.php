<?PHP

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
};

//echo (mysqli_real_escape_string($conn, $_POST['ItemID']));
$Story = mysqli_real_escape_string($conn, $_POST['Story']);
//echo $itemid;

$sql = "SELECT Story FROM Orb WHERE orbID = '".$orbID."'";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
echo $row[0];

// close connection
mysqli_close($conn);
?>

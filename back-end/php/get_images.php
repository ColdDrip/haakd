<?PHP

//connect to database
$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

//check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
};

//escape user inputs for security -- this is only used for variables in the statement below
$itemid = mysqli_real_escape_string($conn, $_POST['itemID']);

$sql = "SELECT XXXXX FROM XXXXX WHERE XXXXX = 'XXXXX'";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
echo $row[0];

//close connection
mysqli_close($conn);
?>

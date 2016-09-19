<?php
$db = new PDO('mysql:host=localhost;dbname=Orb;charset=utf8',
'username','password');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

try
{
	$testresult = $db->query("SELECT * FROM Orb");
	//echo "Connected to db";
}
catch(PDOException $ex)
{
	//echo "an error occured";
	//echo $ex->getMessage();
}

?>

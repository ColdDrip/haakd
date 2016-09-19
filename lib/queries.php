<?php

function getData()
{
	$query = MySQL::getInstance()->query("SELECT * FROM Orb");
    return $query->fetchALL();
}

?>

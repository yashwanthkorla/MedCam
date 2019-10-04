<?php
header("Access-Control-Allow-Origin: *");

$hn      = 'localhost';
$un      = '<UserName>';
$pwd     = '<Password>';
$db      = '<Database>';
$cs      = 'utf8';

$connection = new mysqli($hn, $un, $pwd, $db);


// Sanitise URL supplied values
$nameGiven       = filter_var($_REQUEST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

$sql = "select name,composition,medicine_usage,major_side_effects,minor_side_effects,dosage,alcohol_interaction,pregnancy_interaction from med_details where name ='$nameGiven'";

$result = $connection->query($sql);

while ($data = $result->fetch_assoc()) {
  $details[] = $data;
}

echo json_encode($details);

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

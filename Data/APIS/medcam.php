<?php
header('Access-Control-Allow-Origin: *');

// Define database connection parameters
$hn      = 'localhost';
$un      = '<Username>';
$pwd     = '<Password>';
$db      = '<DatabaseName>';
$cs      = 'utf8';

$connection = new mysqli($hn, $un, $pwd, $db);


// Sanitise URL supplied values
$nameGiven       = filter_var($_REQUEST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

$sql = "select name from med_details where name like '%$nameGiven%'";

$result = $connection->query($sql);
while ($data = $result->fetch_assoc()) {

      $details[] = $data['name'];
}
if ($details != null) {
      echo json_encode($details);
} else {
      echo json_encode(array('No matching result in the database'));
}

if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$connection->close();

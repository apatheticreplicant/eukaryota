<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

$json = file_get_contents("php://input");
$data = json_decode($json, true);

var_dump($data);



?>

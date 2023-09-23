<?php

$json = file_get_contents("php://input");
$data = json_decode($son, true);

var_dump($data);

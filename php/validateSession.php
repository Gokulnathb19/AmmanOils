<?php
session_start();
if (isset($_SESSION['admin_access']))
    $response = '{"success":true}';
else
    $response = '{"success":false}';
echo json_encode($response);
?>
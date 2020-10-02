<?php
session_start();

// remove all session variables
session_unset();

// destroy the session
session_destroy();
$response = '{"success": true}';
echo json_encode($response);
?>
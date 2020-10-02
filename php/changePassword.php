<?php
session_start();
include_once "connectDB.php";
if (isset($_SESSION['admin_access']) && isset($_POST['password']))
{   
    $userId = $_SESSION['admin_access'];
    $password = $_POST['password'];
    $sql = "update users set password='$password' where user_id=$userId";
    $result = $conn->query($sql);
    if ($result == TRUE && $conn->affected_rows == 1) {
        $response = '{"success":true}';
    } else {
        $response = '{"success":false, "sql": "'.$sql.'"}';
    }
}
else
$response = '{"success":false, "sql": "'.$sql.'"}';
$conn->close();
echo json_encode($response);
?>
<?php
session_start();
include_once "connectDB.php";
$username = $_POST['username'];
$password = $_POST['password'];
$sql = "SELECT user_id FROM users WHERE username='$username' and password='$password'";
$result = $conn->query($sql);
$response = '';
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $response = '{"success":true}';
        $_SESSION["admin_access"] = $row['user_id'];
    }
} else {
    $response = '{"success":false}';
}
$conn->close();
echo json_encode($response);
?> 
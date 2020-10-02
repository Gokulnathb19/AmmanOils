<?php
session_start();
include_once "connectDB.php";
$sql = "SELECT email FROM contacts";
$result = $conn->query($sql);
$response = '';
$email = '';
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        #echo "Name: " . $row["product_name"]. " " . $row["product_image_name"]. "<br>";
        $email = $row['email'];
    }
}
$sql = "SELECT password FROM users where username='Admin'";
$result = $conn->query($sql);
$response = '';
$password = '';
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        #echo "Name: " . $row["product_name"]. " " . $row["product_image_name"]. "<br>";
        $password = $row['password'];
    }
}
$to = $email;
$subject = "Admin account password - Recovery";
$message = "Hi Admin,\r\n\r\n Your recovered passowrd is: $password\r\n\r\nThanks\r\nAmman Edible Oils Admin";
$headers = "From: Amman Edible Oils <admin@ammanoils.com>";
if (mail($to,$subject,$message,$headers)) {
    $response = '{"success":true}';
} else {
    $response = '{"success":false}';
}
$conn->close();
echo json_encode($response);
?>
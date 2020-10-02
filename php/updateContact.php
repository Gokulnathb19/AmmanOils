<?php
session_start();
include_once "connectDB.php";
if(isset($_POST['email']))
    $email = $_POST['email'];
else
    $email = '';
if(isset($_POST['tel']))
    $tel = $_POST['tel'];
else
    $tel = '';
if(isset($_POST['wa']))
    $wa = $_POST['wa'];
else
    $wa = '';
if(isset($_POST['fb']))
    $fb = $_POST['fb'];
else
    $fb = '';
if(isset($_POST['insta']))
    $insta = $_POST['insta'];
else
    $insta = '';
$sql = "update contacts set email='$email', tel='$tel', wa='$wa', fb='$fb', insta='$insta'";
$result = $conn->query($sql);
if ($result == TRUE && $conn->affected_rows == 1) {
    $response = '{"success":true}';
} else {
    $response = '{"success":false, "sql": "'.$sql.'"}';
}
$conn->close();
echo json_encode($response);
?>
<?php
include_once "connectDB.php";

$sql = "SELECT * FROM contacts";
$result = $conn->query($sql);
$response = '';
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    #echo "Name: " . $row["product_name"]. " " . $row["product_image_name"]. "<br>";
    $response = '{"success": true, "email":"'.$row['email'].'", "tel":"'.$row['tel'].'", "wa":"'.$row['wa'].'", "fb":"'.$row['fb'].'", "twitter":"'.$row['twitter'].'", "insta":"'.$row['insta'].'"}';
  }
}
$conn->close();
echo json_encode($response);
?> 
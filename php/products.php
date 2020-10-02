<?php
include_once "connectDB.php";

$sql = "SELECT * FROM products";
$result = $conn->query($sql);
$rows = array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    #echo "Name: " . $row["product_name"]. " " . $row["product_image_name"]. "<br>";
    $rows[] = $row;
  }
}
$conn->close();
echo json_encode($rows);
?> 
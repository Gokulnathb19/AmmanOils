<?php
session_start();

include_once "connectDB.php";

$productName = $_POST['product_name'];
$productShortDesc = $_POST['short_desc'];
$productDesc = $_POST['long_desc'];
$productPrice = $_POST['product_price'];
$productPrice2 = $_POST['product_price_2'];
$productPrice3 = $_POST['product_price_3'];
$productImageName = $_POST['product_image_name'];

$sql = "insert into products(product_name, short_desc, long_desc, product_price, product_price_2, product_price_3, product_image_name) values('$productName', '$productShortDesc', '$productDesc', $productPrice, $productPrice2, $productPrice3, '$productImageName')";
$error = '';
try {
    $productImageDir = dirname(dirname(__FILE__)).'/images/products/';
    $productImagePath = $productImageDir.$productImageName;
    if (move_uploaded_file($_FILES['product_image']['tmp_name'], $productImagePath)) {
        $upload_success = TRUE;
    } else {
        $upload_success = FALSE;
    }
} catch (Exception $th) {
    $error = $th;
    $upload_success = FALSE;
}
$result = $conn->query($sql);
if ($result == TRUE && $conn->affected_rows == 1 && $upload_success) {
    $response = '{"success":true}';
} else {
    $response = '{"success":false, "sql": "'.$sql.'", "error":"'.$error.'"}';
}
$conn->close();
echo json_encode($response);
?>
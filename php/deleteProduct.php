<?php
session_start();
include_once "connectDB.php";
$prouductId = $_POST['product_id'];
$productImageName = $_POST['product_image_name'];
$productImagePath = dirname(dirname(__FILE__)).'/images/products/'.$productImageName;
$sql = "delete from products where product_id =$prouductId";
$result = $conn->query($sql);
$error = '';
if ($result == TRUE && $conn->affected_rows == 1) {
    try{
        unlink($productImagePath);
    }
    catch(Exception $th){
        $error = $th;
    }
    $response = '{"success":true}';
} else {
    $response = '{"success":false, "sql": "'.$sql.'", "error":"'.$error.'"}';
}
$conn->close();
echo json_encode($response);
?>
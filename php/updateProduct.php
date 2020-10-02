<?php
session_start();
$ColumnSeperator = '';

function updateColumnComma(){
    global $ColumnSeperator;
    $ColumnSeperator = ', ';
}

include_once "connectDB.php";
$prouductId = $_POST['product_id'];
if(isset($_POST['product_name']))
    {
        $productName = $ColumnSeperator."product_name='".$_POST['product_name']."'";
        updateColumnComma();
    }
else
    $productName = '';

if(isset($_POST['short_desc']))
    {
        $productShortDesc = $ColumnSeperator."short_desc='".$_POST['short_desc']."'";
        updateColumnComma();
    }
else
    $productShortDesc = '';

if(isset($_POST['long_desc']))
    {
        $productDesc = $ColumnSeperator."long_desc='".$_POST['long_desc']."'";
        updateColumnComma();
    }
else
    $productDesc = '';

if(isset($_POST['product_price']))
    {
        $productPrice = $ColumnSeperator."product_price=".$_POST['product_price']."";
        updateColumnComma();
    }
else
    $productPrice = '';

if(isset($_POST['product_price_2']))
    {
        $productPrice2 = $ColumnSeperator."product_price_2=".$_POST['product_price_2']."";
        updateColumnComma();
    }
else
    $productPrice2 = '';

if(isset($_POST['product_price_3']))
    {
        $productPrice3 = $ColumnSeperator."product_price_3=".$_POST['product_price_3']."";
        updateColumnComma();
    }
else
    $productPrice3 = '';
$error = '';
$upload_success = FALSE;
if(isset($_POST['product_image_name']) && isset($_POST['product_old_image_name']))
    {
        $productImageName = $ColumnSeperator."product_image_name='".$_POST['product_image_name']."'";
        updateColumnComma();
        $productImageDir = dirname(dirname(__FILE__)).'/images/products/';
        $productImagePath = $productImageDir.$_POST['product_image_name'];
        $productOldImagePath = $productImageDir.$_POST['product_old_image_name'];
        try {
            unlink($productOldImagePath);
            if (move_uploaded_file($_FILES['product_image']['tmp_name'], $productImagePath)) {
                $upload_success = TRUE;
            }
        } catch (Exception $th) {
            $error = $th;
        }
    }
else
    $productImageName = '';

$sql = "update products set $productName $productShortDesc $productDesc $productPrice $productPrice2 $productPrice3 $productImageName where product_id =$prouductId";
$result = $conn->query($sql);
if ($result == TRUE && $conn->affected_rows == 1 && ($upload_success || !isset($_POST['product_image_name']))) {
    $response = '{"success":true}';
} else {
    $response = '{"success":false, "sql": "'.$sql.'", "error":"'.$error.'"}';
}
$conn->close();
echo json_encode($response);
?>
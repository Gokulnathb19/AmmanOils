<?php
$email = $_POST['email'];
$name = $_POST['name'];
$mobile = $_POST['mobile'];
$products = explode(',', $_POST['products']);
$litres = $_POST['litres'];
$productLitres = '';
$sql = "SELECT customer_id FROM customers where email='$email'";
$result = $conn->query($sql);
if ($result->num_rows == 0) {
    $sql = "INSERT INTO customers(customer_name, email, mobile_no) VALUES('$name','$email','$mobile')";
    $result = $conn->query($sql);
    $sql = "SELECT customer_id FROM customers where email='$email'";
    $result = $conn->query($sql);
    // output data of each row
}
while($row = $result->fetch_assoc()) {
    #echo "Name: " . $row["product_name"]. " " . $row["product_image_name"]. "<br>";
    $customer_id = $row['customer_id'];
}
for($i=0; $i< count($products); $i++){
    $product = $products[$i];
    $productLitres = $productLitres."[new_line][spaces]".$product;
    foreach ($litres[$i] as $litre => $quantity) {
        $litre = str_replace("L", "", $litre);
        $quantity = (int)$quantity;
        if($quantity > 0)
        {
            $productLitres = $productLitres.'[new_line][spaces][spaces]'.$litre.' Litre(s) - '.$quantity.' quantity';
            $sql = "INSERT INTO customer_transactions(customer_id, product, litres, quantity) VALUES('$customer_id','$product','$litre', $quantity)";
            $result = $conn->query($sql);
        }
    }
}
?>
<?php
session_start();
include_once "connectDB.php";
if (isset($_POST['email']))
{   
    include_once "customer_transactions.php";
    $productLitres = str_replace("[new_line]","<br>", $productLitres);
    $productLitres = str_replace("[spaces]","&nbsp;&nbsp;&nbsp;&nbsp;", $productLitres);
    $message = "Hi,<br><br>  I'm <b>".$name."</b>. <br><br>  <b>Product Details</b>: ".$productLitres.".<br><br><b>Contact Details:</b><br>Email: ".$email."<br>Mobile No: ".$mobile."<br><br>Thanks";
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
    $to = $email;
    $subject = "New Order for Us";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: ".$name." <".$_POST['email'].">";
    $resMail = (string)mail($to,$subject,$message,$headers);
    if ($resMail) {
        $response = '{"success":true,"response": "'.$resMail.'"}';
    } else {
        $response = '{"success":false}';
    }
}
else
$response = '{"success":false}';
$conn->close();
echo json_encode($response);
?>
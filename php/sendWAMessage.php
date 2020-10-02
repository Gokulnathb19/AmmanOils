<?php

require __DIR__ . "/twilio-php-master/src/Twilio/autoload.php";

use Twilio\Rest\Client;

include_once "twilio_env.php";
$twilioNo = '+14155238886';

$twilio = new Client($twilioSid, $twilioToken);
include_once "connectDB.php";
include_once "customer_transactions.php";
$productLitres = str_replace("[new_line]","\r\n", $productLitres);
$productLitres = str_replace("[spaces]","    ", $productLitres);
$messageContent = "Hi,\r\nI'm *".$name."*.\r\n\r\n*Product Details:* ".$productLitres."\r\n\r\n*Contact Details:*\r\nEmail: ".$email."\r\nMobile No: ".$mobile;
try {
    $sql = "SELECT wa FROM contacts";
    $result = $conn->query($sql);
    $response = '';
    $waNos = '';
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            #echo "Name: " . $row["product_name"]. " " . $row["product_image_name"]. "<br>";
            $waNos = $row['wa'];
        }
    }
    $waNosArray = explode (",", $waNos);
    foreach ($waNosArray as $waNo) {
        $message = $twilio->messages
                ->create(
                    "whatsapp:+91".trim($waNo),
                    array(
                            "body" => "*New Order for Us :-)*\r\n\r\n".$messageContent,
                            "from" => "whatsapp:$twilioNo"
                        )
                );
      }
    $response = '{"success":true}';
} catch (Exception $th) {
    $response = '{"success":false}';
    $message = 'no message';
}
echo json_encode($response);

?>
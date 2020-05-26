<?php
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

ini_set("display_errors",1);

function sendmail($code, $email, $firstname, $lastname, $company, $country, $password){
  $mail = new PHPMailer();
  $Email='fourfivesix4561@gmail.com';

  try {
      //Server settings
      $mail->SMTPDebug = 4;                      // Enable verbose debug output
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = $Email;                     // SMTP username
      $mail->Password   = 'Fahrenheit97.8';                               // SMTP password
      $mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
      $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

      //Recipients
      $mail->setFrom($email, $firstname . " " . $lastname);
      $mail->addAddress($email);     // Add a recipient
      //$mail->addAddress('ellen@example.com');               // Name is optional
      $mail->addReplyTo($email);

      // Attachments
      //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
      //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'SITEBLD Verify Email';
      $mail->Body    = 'Your verification code: <b>'. $code .'</b>';
      $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
      if($mail->send()){
        echo 'Message has been sent';

        echo json_encode(array(
          'status'=> 1,
          'message' => 'Code confirmation sent!',
          'firstName' => $firstname,
          'lastName' => $lastname,
          'company' => $company,
          'country' => $country,
          'email' => $email
        ));
        return http_response_code(200);

      }else{

            echo json_encode(array(
            "status" =>0,
            "message" => "Invalid Email"
          ));
            return http_response_code(500);
      }
  } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
}


 ?>

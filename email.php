<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Tangkap data dari form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Alamat email tujuan
    $to = "krisnaput81@gmail.com";  // Ganti dengan alamat email Anda

    // Header email
    $headers = "From: " . $email;

    // Pesan lengkap
    $fullMessage = "Nama: " . $name . "\n" .
                   "Email: " . $email . "\n" .
                   "Nomor HP: " . $mobile . "\n" .
                   "Pesan: " . $message;

    // Mengirim email
    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "Pesan berhasil dikirim!";
    } else {
        echo "Gagal mengirim pesan.";
    }
}
?>

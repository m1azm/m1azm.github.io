<?php
if(isset($_POST['ip'])){
    $ipAddress = $_POST['ip'];
    $file = 'ip_addresses.txt';
    $current = file_get_contents($file);
    $current .= $ipAddress."\n";
    file_put_contents($file, $current);
    echo "IP адрес успешно сохранен";
} else {
    echo "IP адрес не получен";
}
?>

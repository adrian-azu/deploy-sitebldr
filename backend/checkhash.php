<?php
 $server_seed = "96f3e04d221ca1b2048cc3b3b844e479f2bd9c80a870628072ee98fd1aa83cd0";
$public_seed = "460670512935";
$round = "321";
echo $hash = hash('sha256', $server_seed . "-" . $public_seed . "-" . $round);
$roll = hexdec(substr($hash, 0, 8)) % 15;
if ($roll == 0) $roll_colour = 'bonus';
elseif ($roll >= 1 and $roll <= 7) $roll_colour = 'orange';
elseif ($roll >= 8 and $roll <= 14) $roll_colour = 'black';

echo("Roll: $roll\nColour: $roll_colour");
echo "<br>";
echo $generated_id = hash('sha256', uniqid (rand (),true));
echo "<br>";

echo $uid=substr($generated_id,1);
$user_id=12;

    $rand = substr(md5(microtime()),rand(0,26),5);
    echo "<br>". strtoupper($rand);
?>

<?php
	$str = $_SERVER['QUERY_STRING'];
	$str = str_replace("%20"," ",$str);
	$str = str_replace("%27","'",$str);
	$file = fopen("searches.txt","a");
	$queryTime = new Datetime("now");
	$address = $_SERVER['REMOTE_ADDR'];
    echo fwrite($file, $str." date/time: ".date_format($queryTime, 'Y-m-d H:i:s')."|| Remote Address: ".$address."\n");
    fclose($file);
?>
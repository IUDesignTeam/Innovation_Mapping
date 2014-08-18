<?php
    //Destroy session if Username and Password has been set (if isset($_SESSION[$variable])==true, means session is going on, meaning user is logged in)
    include 'php_util/includes/mysql_data.php';
    session_start();
    $con = mysqli_connect($mysql_host,$mysql_user,$mysql_pass,$mysql_db);
    if (isset($_SESSION['Username']) && isset($_SESSION['Password'])) {
      mysqli_query($con,"INSERT INTO ".$info." (`Username`, `IP Address`, `Action`) VALUES ('".$_SESSION['Username']."', '".$_SERVER['REMOTE_ADDR']."', 'Logged Out')");
      session_destroy();
    }
    header("Location: index.php");
?>
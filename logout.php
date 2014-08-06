<?php
    //Destroy session if Username and Password has been set (if isset($_SESSION[$variable])==true, means session is going on, meaning user is logged in)
    session_start();
    if (isset($_SESSION['Username']) && isset($_SESSION['Password'])) {
      session_destroy();
    }
    header("Location: index.php");
?>
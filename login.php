<!DOCTYPE html>
<html>
<head>
  <title>UNICEF Mapping Innovation Login</title>
	<link rel="stylesheet" type="text/css" href="css/main_style.css">
  <link rel="stylesheet" type="text/css" href="css/login_style.css">
  <?php
  include 'php_util/util.php';
  bootStrapHeader();
  confirmLogin();
  ?>
</head>
<body>
  <?php createHeader(); ?>
  <div class="container-fluid" id="main_div">
  	<h3>Please Log In</h3>
  	<div id="login_form">
  		<form role="form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
  			<div class="form-group">
          <label for="username">E-mail: </label>
          <input id="username" type="text" name="username"><br>
  			</div>
        <div class="form-group">
          <label for="password">Password: </label>
          <input id="pasword" type="password" name="pwd"><br>
  			</div>
        <div class="form-group"><!-- turn this into <button> -->
          <input class="btn btn-default" type="submit" value="Submit">
  		  </div>
      </form>
  	</div>
  </div>
  <?php jsDocuments(); ?>
</body>
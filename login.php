<!DOCTYPE html>
<html>
<head>
  <title>UNICEF Mapping Innovation Login</title>
  <?php
    include 'php_util/util.php';
    createHeader();
    confirmLogin();
  ?>
  <link rel="stylesheet" type="text/css" href="css/form_style.css">
 </head>
<body>
  <?php createNavigation("Log In"); ?>
  <div id="main_div" class="container-fluid">
  	<div class="row">
      <div id="login" class="center-block col-md-4">
        <form role="form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
          <h4>Please Log In</h4>
          <div class="form-group">
            <label for="username">Office: </label>
            <input id="username" type="text" name="username"><br>
          </div>
          <div class="form-group">
            <label for="password">Password: </label>
            <input id="pasword" type="password" name="pwd"><br>
          </div>
          <div class="form-group">
            <button type="Submit" class="btn btn-default">Log In</button>
          </div>
        </form> 
      </div>
  	</div>
  </div>
  <?php jsDocuments(); ?>
</body>
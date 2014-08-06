<!DOCTYPE html>
<html>
<head>
	<title>Update Project</title>
	<link rel="stylesheet" type="text/css" href="css/main_style.css">
  	<link rel="stylesheet" type="text/css" href="css/add_project_style.css">
  	<!--<script src="js/header.js"></script>-->
  	<script src="js/projects.js"></script>
  	<?php include 'session_confirmation.php'; ?>
</head>
</head>
<body onload="createForm();">
	<div id = "intro"></div>
	<div id = "main_div">
		<h2>Mapping Innovation Project</h2>
    	<p>Please fill out the responses for the questions listed below.</p>
    	<form id="addProjForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
    	</form>
    	<?php
    	$_POST['Project_Name'] = "Hi";
    	?>
	</div>
</body>
</html>
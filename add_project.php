<!DOCTYPE html>
<html>
<head>
  <title>Add New Project</title>
  <?php 
    include 'php_util/util.php'; 
    bootStrapHeader(); 
  ?>

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.uncompressed.js"></script> 

  <link rel="stylesheet" type="text/css" href="css/main_style.css">
  <link rel="stylesheet" type="text/css" href="css/add_project_style.css"> 
  <!-- include google maps library *before* load cartodb.js -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_jSsgldpxYyWpt3PQS9WruC6MIx0rX2Q"></script> 
    
  <script src="js/variables.js"></script>
  <script src="js/sectionObjects.js"></script>
  <script src="js/helpers.js"></script>
  <script src="js/forms.js"></script>
  <script src="js/innovation_map.js"></script>
  <script src="js/projects.js"></script>
</head>
<body onload="createProjectForm( 'add', document.getElementById('addProjForm') );">
  <?php 
    createHeader();
   // confirmSession();
  ?>
  <div id = "main_div">
    <!--<h2>Mapping Innovation Project</h2>
    <p>Please fill out the responses for the questions listed below.</p> -->
    <form id="addProjForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"></form>
    <!--Google Docs iframe does everything for us-->
    <!--<iframe src="https://docs.google.com/forms/d/1HDzxOZ7ZZ1qtYX3S9RTlPUNJqiurY_bryoAZbJN8X1U/viewform?embedded=true" width="100%" height="3000" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>-->
  </div>
  <?php jsDocuments(); ?>
</body>
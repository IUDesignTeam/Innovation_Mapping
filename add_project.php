<!DOCTYPE html>
<html>
<head>
  <title>Add New Project</title>
  <?php 
    include 'php_util/util.php'; 
    bootStrapHeader(); 
  ?>

  <script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.uncompressed.js"></script> 

  <link rel="stylesheet" type="text/css" href="css/main_style.css">
  <link rel="stylesheet" type="text/css" href="css/add_project_style.css"> 
  <!-- include google maps library *before* load cartodb.js -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_jSsgldpxYyWpt3PQS9WruC6MIx0rX2Q"></script> 
    
  <script src="js/variables.js"></script>
  <script src="js/sectionObjects.js"></script>
  <script src="js/helpers.js"></script>
  <script src="js/validator.js"></script>
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
    <h3>Add New Project</h3>
    <p class="help-block">Please fill out the responses for the questions listed below.</P>
    <form id="addProjForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"></form>
   </div>
  <?php jsDocuments(); ?>
</body>
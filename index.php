<!DOCTYPE html>
<html lang="en">
<head>
    <title>UNICEF Innovation Map</title>
	<?php 
    include 'php_util/util.php'; 
    bootStrapHeader(); 
    ?>
 
    <!-- CartoDB CSS -->
    <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/themes/css/cartodb.css" /> 
    
    <link rel="stylesheet" type="text/css" href="css/main_style.css">
    <link rel="stylesheet" type="text/css" href="css/innovation_map_style.css">
    <!--<link rel="stylesheet" type="text/css" href="css/toggle_menu.css">-->

    <!-- include google maps library *before* load cartodb.js -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_jSsgldpxYyWpt3PQS9WruC6MIx0rX2Q"></script> 
    <!-- include cartodb.js library -->
    <script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.uncompressed.js"></script>  
</head>
<body onload="initMap();">
  <?php createHeader(); ?>
  <div class="container-fluid">
    <!-- Top Filters -->
    <div class="row" id="top_filters"></div> 
    <!-- Map -->
    <div class="row">
      <div id="map"></div>
    </div>
    <!-- Charts -->
    <div class="row" id="charts">
      <h3> Overall Analytics </h3>
    </div>
  </div>
  <!-- Placed at the end of the document so the pages load faster -->
  <?php jsDocuments(); ?>
  <script src="js/variables.js"></script>
  <script src="js/sectionObjects.js"></script>
  <script src="js/helpers.js"></script>
  <script src="js/forms.js"></script>
  <script src="js/toggle_menu.js"></script>
  <script src="js/projects.js"></script>
  <script src="js/innovation_map.js"></script>
</body>
</html>
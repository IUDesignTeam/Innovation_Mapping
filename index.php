<!DOCTYPE html>
<html lang="en">
<head>
  <title>UNICEF Innovation Map</title>
	<?php 
    include 'php_util/util.php'; 
    createHeader(); 
  ?>
    <!-- CartoDB CSS -->
    <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/themes/css/cartodb.css" /> 
    <link rel="stylesheet" type="text/css" href="css/innovation_map_style.css">
    <link rel="stylesheet" type="text/css" href="css/toggle_menu_style.css">
    <link rel="stylesheet" type="text/css" href="css/custom_checkbox_style.css">
</head>
<body onload="initMap();">
  <?php createNavigation("Home"); ?>
  <div id="main_div" class="container-fluid">
    <div class="row">
      <div id="map"></div>
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
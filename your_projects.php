<!DOCTYPE html>
<html>
<head>
  <title>Your Projects</title>
  <?php 
    include 'php_util/util.php'; 
    bootStrapHeader(); 
  ?>
  
  <script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.uncompressed.js"></script>

  <script src="js/variables.js"></script>
  <script src="js/sectionObjects.js"></script>
   <script src="js/helpers.js"></script>
  <script src="js/forms.js"></script>
  <script src="js/innovation_map.js"></script>
  <script src="js/projects.js"></script>

  <link rel="stylesheet" type="text/css" href="css/main_style.css">
  <link rel="stylesheet" type="text/css" href="css/your_projects_style.css">
</head>
<body> 
  <?php 
    createHeader();
    confirmSession();
    //addUpdatedProject();
  ?>
  <div id="new_proj"><a href="add_project.php" style="text-decoration:none; color:white;">+ Add a new project</a></div>
  <table id="projects_table" class="table">
 	<thead><tr>
 		<th>Project Name</th>
 		<th>Scale</th>
 		<th>Section</th>
    <th>Country</th>
    <th>Update</th>
 	</tr></thead>
  <?php findProjects(); ?>
  </table>
  <?php jsDocuments(); ?>
</body>
</html>
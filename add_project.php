<!DOCTYPE html>
<html>
<head>
  <title>Add New Project</title>
  <?php 
    include 'php_util/util.php'; 
    createHeader(); 
  ?>
  <script src="js/variables.js"></script>
  <script src="js/sectionObjects.js"></script>
  <script src="js/helpers.js"></script>
  <script src="js/forms.js"></script>
  <script src="js/innovation_map.js"></script>
  <script src="js/projects.js"></script>
  <link rel="stylesheet" type="text/css" href="css/form_style.css">
</head>
<body onload="createProjectForm( 'add', document.getElementById('addProjForm') );">
  <?php 
    createNavigation("Add Project");
    confirmSession();
  ?>
  <div id="main_div" class="container-fluid"> 
    <div class="row">  
      <div class="center-block col-md-9">
        <form id="addProjForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
          <div id="formInfo">
            <h3>Add New Project</h3>
            <p class="help-block">Please fill out the responses for the questions listed below.</P>
          </div>
        </form>
      </div>
    </div>
  </div>
  <?php jsDocuments(); ?>
</body>
<!DOCTYPE html>
<html>
<head>
  <title>Your Projects</title>
  <?php 
    include 'php_util/util.php'; 
    createHeader(); 
  ?>
  <script src="js/variables.js"></script>
  <script src="js/sectionObjects.js"></script>
  <script src="js/helpers.js"></script>
  <script src="js/forms.js"></script>
  <script src="js/cartodb_calls.js"></script>
  <script src="js/projects.js"></script>

  <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/sortable/0.6.0/css/sortable-theme-bootstrap.css">
  <link rel="stylesheet" type="text/css" href="css/form_style.css">
  <link rel="stylesheet" type="text/css" href="css/your_projects_style.css">
</head>
<body> 
  <?php 
    createNavigation("Your Projects");
    confirmSession();
    addProject();
    //addUpdatedProject();
  ?>
  <div id="main_div" class="container-fluid"> 
    <div class="row">  
      <div class="center-block col-md-9">
        <div id="table-wrap">
          <div id="tableInfo">
            <h3 class="inline-block"><span id="userOffice"></span>'s Projects Dashboard</h3>
            <p class="help-block">There are <span id="projNum">0</span> projects</p>
            <button type="button" class="btn btn-default inline-block" value=""><a href="add_project.php">Add a new project</a></button>
          </div>
          <?php findProjects(); ?>
          <table id="projects_table" class="table table-responsive sortable sortable-theme-bootstrap" data-sortable>
            <thead>
              <tr>
              <th>PROJECT NAME</th>
              <th>SCALE</th>
              <th>SECTION</th>
              <th>COUNTRY</th>
              <th>MODIFIED</th>
              <th data-sortable="false"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <?php jsDocuments(); ?>
  <!-- sortable.js for sorting table data -->
  <script src="http://cdnjs.cloudflare.com/ajax/libs/sortable/0.6.0/js/sortable.min.js"></script>
</body>
</html>
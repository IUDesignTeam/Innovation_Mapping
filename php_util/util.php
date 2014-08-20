<?php
  function confirmLogin() {
    include 'includes/mysql_data.php';
    if (isset($_SESSION["Username"]) || isset($_SESSION["Password"])) session_destroy();
    //Set username and password to empty values
    $username = $password = "";
    //$_SERVER METHOD = POST means that the form has been submitted, POST is a request method used by php to get the information in the form
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      //strip all unnecessary characters from $_POST value (to avoid code injection, among other errors), and that new value will be the eMail and password the server will read
      $username = test_input($_POST['username']);
      $password = test_input($_POST['pwd']);
      //server = "localhost", user = "vagaj94", password = "loplop123", database = "login_db" (you should change according to your own information)
      $con = mysqli_connect($mysql_host,$mysql_user,$mysql_pass,$mysql_db);
      //If there is an error connecting, output error
      if (mysqli_connect_errno()) {
        echo "failed to connect to MySQL: " . mysqli_connect_errno();
      }

      //Create SQL query string 
      //$table1 and $table2 are our own tables in mySQL db, initialize in mysql_data.php
      $SQL = sprintf("SELECT * FROM ".$table." WHERE `Username`='".$username."' AND `Password`='".NTLMHash($password)."';",
        mysqli_real_escape_string($con,$username),
        mysqli_real_escape_string($con,$password));

      $result = mysqli_query($con,$SQL);
      //Fetch array from result, which is queried onto $con connection using $SQL, the SQL query string
      $row = mysqli_fetch_assoc($result);
      //If neither have an array, then make sure they know password is invalid
      //Don't allow hackers to hack into database using OR
      if (!$row) {
        mysqli_query($con,"INSERT INTO ".$info." (`Username`, `IP Address`, `Action`) VALUES ('".$username."', '".$_SERVER['REMOTE_ADDR']."', 'Attempted Log In')");
        echo "<div class=\"alert alert-danger\"><p class=\"error_par\">ERROR: INVALID USERNAME AND PASSWORD</p></div>";
      } else {
        //If it is valid, start session and set session variables
        session_start();
        $_SESSION['Username']=$username;
        $_SESSION['Password']=$password;
        $_SESSION['Office'] = $row['a_co_ro_hq'];
        $_SESSION['Region'] = $row['k_region'];
        $_SESSION['Country'] = $row['d_country'];
        if ($_SESSION['Office'] == 'CO') {
          $_SESSION['Area'] = $_SESSION['Country'];
        } else if ($_SESSION['Office'] == 'Admin') {
          $_SESSION['Area'] = 'Admin';
        } else {
          $_SESSION['Area'] = $_SESSION['Region'];
        }
        //Row 2 is for table of country logins, so if it is a country office and not a region office, find the region
        mysqli_query($con,"INSERT INTO ".$info." (`Username`, `IP Address`, `Action`) VALUES ('".$_SESSION['Username']."','".$_SERVER['REMOTE_ADDR']."', 'Logged In')");
        header("Location: your_projects.php");
      }
    }
  }
  //Trims any potential malicious and/or unuseful characters from the data input
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  function createNavigation($active) {
    session_start();
    //Initialize array of links and link names, innovation_map and about will be on all pages, so initialize array with those links
    $links = array("http://unicefstories.org/","index.php", "about.php", "add_project.php");
    $link_names = array("Blog", "Home", "About", "Add Project");
    //If session is set, add all links for logged in people
    if (isset($_SESSION['Username']) && isset($_SESSION['Password'])) {
      include 'includes/mysql_data.php';
      $con = mysqli_connect($mysql_host,$mysql_user,$mysql_pass,$mysql_db);
      checkTimeout($con);
      
      //Add your projects, add project, and logout script
      array_push($links, "your_projects.php", "logout.php");
      array_push($link_names, "Your Projects","Log Out");
      
     /* if ($_SESSION['Office']=="Admin") {
        $link_names[5] = "Admin"; $links[5] = "#admin";
      }*/
      mysqli_query($con,"INSERT INTO ".$info."(`Username`,`IP Address`,`Action`) VALUES ('".$_SESSION['Username']."','".$_SERVER['REMOTE_ADDR']."', 'On Page".$_SERVER['PHP_SELF']."')");
    } else {
      //If session not set, only add log in link
      array_push($links, "login.php");
      array_push($link_names,"Log In");
    }
    //Echo navbar style class items
    $nav_menu = <<<NAVBAR
    <nav class="navbar-wrapper navbar-default navbar-static-top" role="navigation">     
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Global Mapping of UNICEF Innovations</a>
        </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
NAVBAR;
    //It honestly doesn't matter wether you pick count($links) or count($link_names), both should be same size
    for ($i = 0; $i < count($links); $i++) {
      //Makes format: <li><a href='link'>Link Name</a></li>
      $nav_menu .= "<li ";
      if ($link_names[$i] == $active) { 
        $nav_menu .= "class = 'active'";
      }
      $nav_menu .= "><a";
      $nav_menu .= ($i == 0) ? " target='_blank'" :"";
      $nav_menu .= " href='".$links[$i]."'>".$link_names[$i]."</a></li>";
    }
    // To keep track of the Region
    $area = "";
    if( isset($_SESSION['Region']) && !empty($_SESSION['Region']) ){
      $nav_menu .= "<li id='user'><a>(".$_SESSION['Region'].")</a></li>";
    }
    
    $nav_menu .= "</ul></div></div></nav>";
    echo $nav_menu;
  }
  
  function findProjects() {
#    $rowNames = ['Timestamp','username','region','Project_Name','Country','Primary_Sector','Other_Sectors','Scale','Issue','Solution','Results','Target_Users','Creators','Status','Links','Contacts'];
    //mysql_data.php assigns host, user, pass, db data
    //Find projects using javascript and session/user information
    $session = array();
    $session['Username'] = $_SESSION['Username'];
    $session['Office'] = $_SESSION['Office'];
    $session['Region'] = $_SESSION['Region'];
    $session['Country'] = $_SESSION['Country'];
    $session['Area'] = $_SESSION['Area'];

    $script = "<script>getOfficeProjects(".json_encode($session).");</script>";
    echo $script;
  }

  function confirmSession() {
    if (!(isset($_SESSION['Username']) && isset($_SESSION['Password']))) {
      session_destroy();
      header("Location: login.php");
    }
  }

  function checkTimeout($con) {
    include 'includes/mysql_data.php';
    if (isset($_SESSION['timeout']) && $_SESSION['timeout'] + 30 * 60 < time()) {
      mysqli_query($con,"INSERT INTO ".$info." (`Username`, `IP Address`, `Action`) VALUES ('".$_SESSION['Username']."', '".$_SERVER['REMOTE_ADDR']."', 'Timed Out')");
      session_destroy();
      header("Location: login.php");
    } else {
      $_SESSION['timeout'] = time();
    }
  }

  function addProject() {
    include 'includes/mysql_data.php';
    if (!empty($_SERVER["QUERY_STRING"])) {
      $query = $_SERVER["QUERY_STRING"];
      $con = mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
      if (mysqli_connect_errno()) {
        echo "Error connecting to mysql: " . mysqli_connect_errno();
      }

      $result = mysqli_query($con, "INSERT INTO ".$info." (`Username`, `IP Address`, `Action`) VALUES ('".$_SESSION['Username']."', '".$_SERVER['REMOTE_ADDR']."', '".$query." Project')");
      if ($result) {
        echo "<script type=\"text/javascript\">window.location.href = 'your_projects.php'</script>;";
      }
    }
  }
/*
    function addProject() {
    include 'includes/mysql_data.php';
    //QUERY_STRING is the query after the '?' in the url
    if (!empty($_SERVER["QUERY_STRING"])) {
      $query = explode("%20", $_SERVER["QUERY_STRING"]);
      //If there is QUERY_STRING, connect to mysql
      $con = mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
      if (mysqli_connect_errno()) {
        echo "Error connecting to mysql: " . mysqli_connect_errno();
      }
      $regSession = array();
      if ($_SESSION["Office"] != "Admin" && $_SESSION["Office"] != "HQ") {
        $query[count($query)-3] = $_SESSION["Region"];
        $regSession["Area"] = $_SESSION["Region"];
      } else {
        $regSession["Area"] = $_SESSION["Office"];
      }
      $regSession["cartodb_id"] = $query[count($query)-2];
      //QUERY_STRING is separated by spaces (%20 in address bar) so turn into array based on spaces
      //Find how many projects in log if old projects have same cartodb_id
      $number = "SELECT count(*) AS `projNumber` FROM ".$project_backups." WHERE `cartodb_id`='".$query[count($query)-2]."'";
      //Insert project info into log of old projects, including version (based on how many have already same cartodb_id)
      $SQL = "INSERT INTO ".$project_backups." (`cartodb_id`, `Project Name`, `Country`, `Primary Sector`, `Other Sectors`, `Scale`, `Issue`, `Solution`, `Results`, `Target Users`, `Creators`, `Status`, `Links`, `Contacts`, `the_geom`, `cartodb_georef_status`, `tech_innovatio`, `created_at`, `updated_at`, `region`, `Version`) VALUES ('".$query[count($query)-2]."',";
      //Add all values into SQL query string
      for ($i = 0; $i < count($query)-2; $i++) {
        //Replace single ' with '' and &20^ (placeholder for spaces) with an actual space
        $SQL .= "'".str_replace("&20^"," ",str_replace("'","''",$query[$i]))."'";
        $SQL .= ",";
      }
      //$numResult is query for the number of projects with same cartodb_id from old project table
      $numResult = mysqli_query($con,$number);
      //$data fethces associative array from $numResult, where this['projNumber'] is number of projects with same cartodb_id
      $data = mysqli_fetch_assoc($numResult);
      //$version is number of projects with same cartodb_id, plus 1, to indicate that this is the newest version to add to the projects log
      $version = $data['projNumber'] + 1;
      //Also the last column, so add last
      $SQL .= $version;
      //Add ending parenthesis for syntax
      $SQL .= ")";
      //Query the insert
      mysqli_query($con,$SQL);
      //The final item in the query array is true or false, based on whether we wanted to update or add project
      if ($query[count($query)-1] == "true") $addOrUpdate = "Updated ";
      else $addOrUpdate = "Added ";
      $logSQL = "INSERT INTO ".$info."(`Username`,`IP Address`,`Action`) VALUES ('".$_SESSION['Username']."','".$_SERVER['REMOTE_ADDR']."', '".$addOrUpdate." Project with id: ".$query[count($query)-2].", version: ".$version."')";
      //Query insert
      mysqli_query($con,$logSQL);
      if ($query[count($query)-1]=="false") {
        echo "<script>updateRegion(".json_encode($regSession).");</script>";
      } else {
        echo "<script>window.location.href = 'your_projects.php';</script>";
      }
    }
  }


  function addUpdatedProject() {
    include 'includes/mysql_data.php';
    if (!empty($_SERVER["QUERY_STRING"])) {
      $con = mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
      if (mysqli_connect_errno()) {
        echo "Error connecting to mysql: " . mysqli_connect_errno();
      }
      
      $query = explode("%20", $_SERVER["QUERY_STRING"]);

      $number = "SELECT count(*) AS `projNumber` FROM ".$project_backups." WHERE `cartodb_id`='".$query[count($query)-1]."'";
      $SQL = "INSERT INTO ".$project_backups." (`cartodb_id`, `Project Name`, `Country`, `Primary Sector`, `Other Sectors`, `Scale`, `Issue`, `Solution`,
      `Results`, `Target Users`, `Creators`, `Status`, `Links`, `Contacts`, `Version`) VALUES ('".$query[count($query)-1]."',";
      for ($i = 0; $i < count($query)-1; $i++) {
        $SQL .= "'".str_replace("&20^"," ",str_replace("'","''",$query[$i]))."'";
        $SQL .= ",";
      }
      $numResult = mysqli_query($con,$number);
      $data = mysqli_fetch_assoc($numResult);
      $version = $data['projNumber'] + 1;
      $SQL .= $version;
      $SQL .= ")";
      mysqli_query($con,$SQL);
      $logSQL = "INSERT INTO ".$info."(`Username`,`IP Address`,`Action`) VALUES ('".$_SESSION['Username']."','".$_SERVER['REMOTE_ADDR']."', 'Updated Project with id: ".$query[count($query)-1].", version: ".$version."')";
      mysqli_query($con,$logSQL);
      echo "<script>window.location.href = 'your_projects.php';</script>'";
    }
  }
  */

  function createHeader() {
    $header = <<<HEADER
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- include google maps library *before* load cartodb.js -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_jSsgldpxYyWpt3PQS9WruC6MIx0rX2Q"></script> 
    <!-- cartodb.js library -->
    <script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.uncompressed.js"></script>  

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="css/main_style.css">
HEADER;
    echo $header;
  }

  function jsDocuments() {
    $scripts = '<script src="js/jquery.min.js"></script>';
    $scripts .= '<script src="bootstrap/js/bootstrap.min.js"></script>';
    $scripts .= '<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js"></script>';
    echo $scripts;
  } 

  function NTLMHash($Input) {
    // Convert the password from UTF8 to UTF16 (little endian)
    $Input=iconv('UTF-8','UTF-16LE',$Input);

    // Encrypt it with the MD4 hash
    $MD4Hash=bin2hex(mhash(MHASH_MD4,$Input));

    // You could use this instead, but mhash works on PHP 4 and 5 or above
    // The hash function only works on 5 or above
    //$MD4Hash=hash('md4',$Input);

    // Make it uppercase, not necessary, but it's common to do so with NTLM hashes
    $UpperCaseHash=strtoupper($MD4Hash);
    // Return the result
    return($UpperCaseHash);
  }
?>
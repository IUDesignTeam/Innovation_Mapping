<?php
  /*
    confirmLogin() - looks at mysql database to validate form data, confirm log in data, and determine whether user will be logged in or not
  */
  function confirmLogin() {
    //include mysql_data to use to connect to mySQL (anything not seen as declared is declared in there. Declare your own information)
    include 'includes/mysql_data.php';
    //If they try to log in while a session is already set, destroy the session first so a new session may begin with no errors
    if (isset($_SESSION["Username"]) || isset($_SESSION["Password"])) session_destroy();
    //Set username and password to empty values
    $username = $password = "";
    //$_SERVER METHOD = POST means that the form has been submitted, POST is a request method used by php to get the information in the form
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      //strip all unnecessary characters from $_POST value (to avoid code injection, among other errors), and that new value will be the eMail and password the server will read
      $username = test_input($_POST['username']);
      $password = test_input($_POST['pwd']);
      //connect to mySQL database
      $con = mysqli_connect($mysql_host,$mysql_user,$mysql_pass,$mysql_db);
      //If there is an error connecting, output error
      if (mysqli_connect_errno()) {
        echo "failed to connect to MySQL: " . mysqli_connect_errno();
      }

      //Create SQL query string
      $SQL = sprintf("SELECT * FROM ".$table." WHERE `Username`='".$username."' AND `Password`='".NTLMHash($password)."';",
        mysqli_real_escape_string($con,$username),
        mysqli_real_escape_string($con,$password));

      $result = mysqli_query($con,$SQL);
      //Fetch array from result, which is queried onto $con connection using $SQL, the SQL query string
      $row = mysqli_fetch_assoc($result);
      //If neither have an array, then make sure they know password is invalid
      if (!$row) {
        //If the log in fails, log it as an attempted log in
        $action = "Attempted Log In";
        logAction($con,$info,$username,$action);
        //And then add an error message to the page (alert alert-danger are bootstrap classes for styling)
        echo "<div class=\"alert alert-danger\"><p class=\"error_par\">ERROR: INVALID USERNAME AND PASSWORD</p></div>";
      } else {
        //If it is valid, start session and set session variables
        session_start();
        $_SESSION['Username']=$username;
        $_SESSION['Password']=$password;
        $_SESSION['Office'] = $row['a_co_ro_hq'];
        $_SESSION['Region'] = $row['k_region'];
        $_SESSION['Country'] = $row['d_country'];
        //Set the area based on the Office type to show on project dashboard
        if ($_SESSION['Office'] == 'CO') {
          $_SESSION['Area'] = $_SESSION['Country'];
        } else if ($_SESSION['Office'] == 'Admin') {
          $_SESSION['Area'] = 'Admin';
        } else {
          $_SESSION['Area'] = $_SESSION['Region'];
        }
        //Log the log in
        $action = "Logged In";
        $user = $_SESSION['Username'];
        logAction($con,$info,$user,$action);
        //Redirect to Your Projects Dashboard
        header("Location: your_projects.php");
      }
    }
  }

  /*
    test_input() - Trims any potentially malicious and/or unuseful characters from the data input
    $data - the string being trimmed
  */
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  /*
    createNavigation() - create navigation bar and logs navigation to page
  */
  function createNavigation($active) {
    //Include mysql_data for mysql connection data, and connect to mySQL
    include 'includes/mysql_data.php';
    $con = mysqli_connect($mysql_host,$mysql_user,$mysql_pass,$mysql_db);
    //Start Session and initialize array of links that will appear on all pages
    session_start();
    //Here, including Links to unicefstories Blog Page, index (with map), and about page. Add Project redirects to Log In Page if not logged in
    $links = array("http://unicefstories.org/","index.php", "about.php", "add_project.php");
    //Here, names of links (as they will appear on nav bar). 
    $link_names = array("Blog", "Home", "About", "Add Project");
    //Save String to log page visit later
    $action = "On Page ".$_SERVER['PHP_SELF'];
    //Initialize user as empty variable, to set later for logging
    $user = "";
    //If session is set, add link for your project dashboard, and log out link
    if (isset($_SESSION['Username']) && isset($_SESSION['Password'])) {
      //Make sure the timeout time hasn't passed since they last moved between pages (see checkTimeout function for more info)
      checkTimeout($con);
      
      //Add your projects, add project, and logout script
      array_push($links, "your_projects.php", "logout.php");
      array_push($link_names, "Your Projects","Log Out");
      
     /* if ($_SESSION['Office']=="Admin") {
        $link_names[5] = "Admin"; $links[5] = "#admin";
      }*/
      //Will log Username of account when logging page visits
      $user = $_SESSION['Username'];
    } else {
      //If session not set, add log in link instead
      array_push($links, "login.php");
      array_push($link_names,"Log In");
      //When logged, user will be known as "guest"
      $user = "Guest";
    }
    //Log the page visit
    logAction($con,$info,$user,$action);
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
    //For loop to add links to navbar from array
    //PS you could use $links or $link_names for count(x), because both should be same size
    for ($i = 0; $i < count($links); $i++) {
      //Makes format: <li (class ='active')><a (target='_blank') href='link'>Link Name</a></li>, () = only sometimes
      //Begin making list item
      $nav_menu .= "<li ";
      if ($link_names[$i] == $active) { 
        //Add active class for link of page user is currently on
        $nav_menu .= "class = 'active'";
      }
      //Add actual link
      $nav_menu .= "><a";
      $nav_menu .= ($i == 0) ? " target='_blank'" :"";
      //Add href along with name of link to show on navbar
      $nav_menu .= " href='".$links[$i]."'>".$link_names[$i]."</a></li>";
    }
    //Check if the region is set (region session variable should exist when logged in)
    if( isset($_SESSION['Region']) && !empty($_SESSION['Region']) ){
      //Add region as last item in list. Will be used for reading in as hidden form item when adding projects, to associate with region of office
      $nav_menu .= "<li id='user'><a>(".$_SESSION['Region'].")</a></li>";
    }
    //Finish list, divs, and nav bar
    $nav_menu .= "</ul></div></div></nav>";
    echo $nav_menu;
  }

  /*
    findProjects() - creates a json encodable object from $_SESSION to determine projects to be shown on dashboard based on certain $_SESSION variables
  */
  function findProjects() {
    //Create $session associative array to take some attributes from $_SESSION
    $session = array();
    $session['Username'] = $_SESSION['Username'];
    $session['Office'] = $_SESSION['Office'];
    $session['Region'] = $_SESSION['Region'];
    $session['Country'] = $_SESSION['Country'];
    $session['Area'] = $_SESSION['Area'];
    //json_encode $session array and send to javascript function
    //$session was amde becasue json_encode didn't work with the pure $_SESSION variable. Also wouldn't be safe since the password is stored in $_SESSION
    $script = "<script>getOfficeProjects(".json_encode($session).");</script>";
    echo $script;
  }

  /*
    confirmSession() - confirms session, makes sure that there is a user logged in (used for pages that require user to be logged in)
  */
  function confirmSession() {
    //Make sure session exists, and if doesn't, destroy the session and send to log in page
    if (!(isset($_SESSION['Username']) && isset($_SESSION['Password']))) {
      session_destroy();
      header("Location: login.php");
    }
  }

  /*
    checkTimeout() - whenever action is done, determine whether the session has timed out or not, and if not, reset timeout variable
    $con - mysql connection
  */
  function checkTimeout($con) {
    include 'includes/mysql_data.php';
    //If the timeout $_SESSION variable was already set, check if specified time has passed
    //time() is in seconds (i.e. a time() of 1800 = 30 minutes)
    if (isset($_SESSION['timeout']) && $_SESSION['timeout'] + 30 * 60 < time()) {
      $action = 'Timed Out';
      $user = $_SESSION['Username'];
      logAction($con,$info,$user,$action);
      //If the current time is greater than time since last timeout reset + mathematically displayed time, destroy session and send user to log in page
      session_destroy();
      header("Location: login.php");
    } else {
      //If the user still hasn't reached the timeout limit reset the time
      $_SESSION['timeout'] = time();
    }
    //NOTE: TIMEOUT IS ONLY RESET WHEN USER MOVES PAGES (i.e. playing with the map doesn't reset the timeout)
  }

  /*
    addProject() - logs whenever a project is Added or Updated
  */
  function addProject() {
    //Include mysql_data file for data to connect to mySQL
    include 'includes/mysql_data.php';
    //Check if there is a string string after '?' in URL, or if '?' even exists in url
    if (!empty($_SERVER["QUERY_STRING"])) {
      //If there is a string there, set a string equal to query string
      $query = $_SERVER["QUERY_STRING"];
      //Connect to mySQL, and display error if it gives you an error
      $con = mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
      if (mysqli_connect_errno()) {
        echo "Error connecting to mysql: " . mysqli_connect_errno();
      }
      //$query should either be "Added" or "Updated", so action is explaining whether project as added or updated
      $action = $query." Project";
      $user = $_SESSION['Username'];
      //Make sure "Added" and "Updated" are the ONLY queries the page will log, in order to avoid manipulation with other queries
      if ($query == "Added" || $query == "Updated") {
        //Wait for mySQL to log project addition or project update, THEN redirect to project dashboard
        if (logAction($con,$info,$user,$action)) {
          //Redirect to project dashboard url without query string to avoid query string manipulation (which could end up manipulating the logs heavily)
          echo "<script type=\"text/javascript\">window.location.href = 'your_projects.php'</script>;";
        }
      }
    }
  }

  /*
    logAction() - Logs every action read by server on a phpmyadmin database table
    $con - mySQL database connection
    $table - $table that all log data is being inserted into
    $user - name of user (either "Guest" if logged out, or Username of user if logged in)
    $action - action that will be logged (eg. 'Visited page X', or 'Logged In')
  */
  function logAction($con, $table, $user, $action) {
    //Insert everything into the table, and return the result (returning is used to determine if the query was successful or not)
    return mysqli_query($con,"INSERT INTO ".$table." (`Username`, `IP Address`, `Action`) VALUES ('".$user."', '".$_SERVER['REMOTE_ADDR']."', '".$action."')");
  }

  /*
    createHeader() - creates header with all metadata, scripts used by the whole website, and boostrap files
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

  /*
    jsDocuments() - used to add scripts to end of page (helps page load faster). Any scripts that don't need to be loaded earlier can go here
  */
  function jsDocuments() {
    $scripts = '<script src="js/jquery.min.js"></script>';
    $scripts .= '<script src="bootstrap/js/bootstrap.min.js"></script>';
    $scripts .= '<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js"></script>';
    echo $scripts;
  } 

  /*
    NTLMHash() - passwords are encrypted via this hash. Change the hashing function however you like for your own database
    $Input - non-encrypted inputted potential password that must be encrypted in order to be read by database
  */
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
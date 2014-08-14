/*  Helper Functions  */
/*
  TO DO: 
  2. create attachEvent()
*/
/* Altering the DOM elemenets */
function clearElement( p_ele, p_remove ){
  // If true it deletes the whole element with the children
  if( p_remove ){
    $(p_ele).remove();
  }
  // If false it only deletes the children of that element
  else{
    $(p_ele).empty();
  }
}

function createLink( p_href, p_class, p_text ){
  var link = document.createElement("a");
  link.setAttribute("href", p_href);
  link.setAttribute("class",p_class);
  link.appendChild(document.createTextNode( p_text ));
  return link;
}

/*
addParagraph() - creates a <p> element. Use this for adding extra text to 
  each section.

  p_textString  - TextNode string
*/
function addParagraph( p_textString, p_class ) {
  //Create paragraph element
  var par = document.createElement("p");
  // Bootstrap class
  par.className = p_class; 
  //Add text to paragraph
  par.appendChild(document.createTextNode( p_textString ));
  //Return paragraph
  return par;
}


function addBootstrapClasses(){
  // Find all the div elements that dont have a class yet
  // (they are used for Bootstrap formating)
  $('form div:not([class])').addClass('form-group');
  // Find all text and textarea elements 
  $('input:text, textarea').addClass('form-control input-size');
  // For grid 
  ///$('form').children().addClass('col-md-8');
 // $('.validator-msg').addClass('col-md-4');
  //$('form').addClass('col-md-8');
}


/* Changing a string */
function sanitizeString( p_string ){
  // Replace script and html tags
  var str = p_string.replace(/<script>.*<\/script>/g, "");
  str.replace(/<(.*?)>/g, "");
  // Replace sql commannds if any
  str.replace(/DROP/gi, "");
  str.replace(/;/g, ",");
  return str;
}

function camelCase( p_string ){
  // Make the first letter lowercase
  var str = p_string.substr(0, 1).toLowerCase() + p_string.substr(1);
  // Remove the whitespaces in between the words
  str = str.replace(" ", ""); 
  return str;
}

function upperCase( p_string ){
  var str = p_string.substr(0, 1).toUpperCase() + p_string.substr(1);;
  return str;
}

/* For Objects */
function getObjLength( p_object ){
  var count = 0;
  for( var key in p_object ){
    if(p_object.hasOwnProperty( key )) count++;
  }
  return count;
}

function convertTime( p_timestamp ){
  //var time =
  return time;
}
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

function addBootstrapClasses(){
  // Find all the div elements that dont have a class yet
  // (they are used for Bootstrap formating)
  $('form div:not([class])').addClass('form-group');
  // Find all text and textarea elements 
  $('input:text, textarea').addClass('form-control input-size');
}


function addClass( p_elements, p_className ){
  console.log("Calling from addClass");
  for( var i=0; i<p_elements.length; i++ ){
    p_elements[i].setAttribute("class", p_className);
    console.log(i + " : " + p_elements[i].value);
  }
}

/* Changing a string */
function camelCase( p_string ){
  // Make the first letter lowercase
  var str = p_string.substr(0, 1).toLowerCase() + p_string.substr(1);
  // Remove the whitespaces in between the words
  str = str.replace(" ", ""); 
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
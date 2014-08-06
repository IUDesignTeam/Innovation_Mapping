// Form's questions and choices for each section
var sections = form_json.sections;	

/* 
getFormValues() - Returns an object that contain all the user's input values.
  The object's keys are the name attribute of the form's sections and the values are 
  in an array 

  p_form  - form's id 
*/
function getFormValues( p_formId ){
	var answers = {};

	var form_answers = $('#'+p_formId).find('input:checked, input:text, textarea, select');
	for( var i=0; i<form_answers.length; i++){
		// Current answer
		var ans = form_answers[i];
		if( !answers.hasOwnProperty(ans.name) ){
			if(ans.value == ""){
				ans.value = "placeholder data"; //----------------------------- DELETE
			}
			answers[ans.name] = [ans.value];
		}else{
			answers[ans.name].push(ans.value);
		}
	}
	return answers;
}

/*
createTextField() - creates form's text filed input. (Bootstrap's format)

	inputName		- string value for the input name attribute
	type 			- string 'textarea' or 'text'
	fieldName 		- the name of a section (ex: Project Name, Country)
	descriptionEle	- an element object (Helper text for the sections)
*/
function createTextField( inputName, type, fieldName, descriptionEle ){
	// Create a document fragment to hold the elements
	var docFrag = document.createDocumentFragment(); 
	var div_wrap = document.createElement( "div" );
	//div_wrap.className = "form-group";
	var label = document.createElement( "label" );
	label.setAttribute( "class", "required" );
	label.setAttribute( "for", fieldName );
	label.appendChild( document.createTextNode( fieldName ) );

	var ele;
	if( type == "text" ){
		ele = document.createElement( "input" );
		ele.id = inputName;
	}
	else if( type == "textarea" ){
		ele = document.createElement( "textarea" );
		ele.setAttribute("rows","8");
		ele.setAttribute("cols","150");
	}
	ele.name = inputName;

	// Append all the elements to the div wrapper
	div_wrap.appendChild( label );
	if( descriptionEle ){
		div_wrap.appendChild( descriptionEle );
	}
	div_wrap.appendChild ( ele );
	docFrag.appendChild( div_wrap );
	return docFrag;
}


/*
createInputElements 
	p_name - name attribute of an input
	p_type - 'checkbox' or 'radio' 
	p_fieldName - the name of a section (ex: Project Name, Country)
	p_values - array of options for the inputs
*/
function createInputElements( p_name, p_type, p_fieldName, p_values ){
	// Create a div element to group the checkboxes or radio buttons
	var group_div = document.createElement("div"); 
	group_div.className = p_type + "-container";

	var main_label = document.createElement( "label" );
	//main_label.setAttribute( "class", "required");
	main_label.appendChild( document.createTextNode(p_fieldName) );
	group_div.appendChild( main_label );

	// Loop throught the values array 
	for (var i = 0; i < p_values.length; i++) {
		// Create a div element
		var div_wrap = document.createElement( "div" );
		div_wrap.className = p_type;  // ------ MAKE A FUNCTION FOR BOOTSTAP
		// Create a label element
		var label = document.createElement( "label" );
		// Create an input element
		var input = document.createElement("input");
		input.setAttribute( "type", p_type );
		input.setAttribute( "name", p_name );
		input.setAttribute( "value", p_values[i] );
		// Add additional attributes if its a radio button
		if( p_type == "radio" ){	
			input.id = p_name + "_" + i;	
		}	
		label.appendChild( input );	
		label.appendChild( document.createTextNode(p_values[i]) );
		// append each element to the div_wrap
		div_wrap.appendChild( label );
		group_div.appendChild( div_wrap );
	} 
	return group_div;
}

/*
 createHiddenEle
*/
function createHiddenEle( p_name, p_value ){
	var ele = document.createElement( "input" );
	ele.setAttribute( "type", "hidden" );
	ele.setAttribute( "name", p_name );
	ele.setAttribute( "value", p_value );
	var docFrag = document.createDocumentFragment();
	docFrag.appendChild( ele );
	return docFrag;
}

/*
  createSelectEle() 
 */
function createSelectEle( p_id, p_filterName, p_values, p_parentEle ){
    // Create a <div> element to hold one type of filter
    var filter_div = document.createElement("div");
    filter_div.setAttribute("id", p_id);
    // Create a select element
    var select_ele = document.createElement("select");
    select_ele.setAttribute("name", p_filterName);
    // Loop through the whatValues array and  for each create a form element
    for( i=0; i < p_values.length; i++){
      // Create an option element
      var option = document.createElement("option");
      // Set attributes
      option.setAttribute("value", p_values[i]);     
      select_ele.appendChild(option);
      // Create a text node value
      var textValue = document.createTextNode(p_values[i]); 
      option.appendChild(textValue);
      // Add the new element to the specific filter
      filter_div.appendChild(select_ele);
    }
    // Select the parent element that will hold the sfilter
    p_parentEle.appendChild(filter_div);
}

/*
	createSearchInput()
*/
function createSearchInput( p_parentEle, p_placeholder ){
	// div for search
  var search_div = document.createElement( "div" );
  var input = document.createElement( "input" );
  input.setAttribute( "type", "text" );
  input.setAttribute( "id", "search" );
  input.setAttribute( "placeholder", p_placeholder );
  search_div.appendChild( input );
  p_parentEle.appendChild( search_div );
}

/*
addParagraph() - creates a <p> element. Use this for adding extra text to 
	each section.

	p_textString	- TextNode string
*/
function addParagraph( p_textString ) {
	//Create paragraph element
	var par = document.createElement("p");
	// Bootstrap class
	par.className = "help-block"; 
	//Add text to paragraph
	par.appendChild(document.createTextNode( p_textString ));
	//Return paragraph
	return par;
}

/*
	createButton()
*/
function createButton( p_id, p_type, p_value, p_class ){
    // Create a div wrapper
    var divWrap = document.createElement( "div" );
    // Create <button> tag
    var btn = document.createElement( "button" );
    // Set all the attributes for the button
    btn.setAttribute( "type", p_type );
    btn.setAttribute("value", p_value );
    btn.id = p_id;
    btn.className = p_class;
    btn.appendChild( document.createTextNode(p_value) );
    divWrap.appendChild( btn );
    return divWrap;
}
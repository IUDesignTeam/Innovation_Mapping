// Form's questions and choices for each section
var sections = form_json.sections;	

/* 
getFormValues() - Returns an object that contain all the user's input values.
  The object's keys are the name attribute of the form's sections and the values are 
  in an array 

  p_form  - form's id 
*/
function getFormValues( p_formId ){
	var form_answers;
	var answers = {};

	// The input:hidden messes up when getting hte results for filters
	// To fix this check if the p_formId contains a substring
	var pattern = /Form/gi;
	if( pattern.test(p_formId) ){
		form_answers = $('#'+p_formId).find('input:checked, input:text, textarea, input:hidden, select');
	}else{
		form_answers = $('#'+p_formId).find('input:checked, input:text, textarea, select');
	}
	console.log("FORM A: "  +form_answers);
	for( var i=0; i<form_answers.length; i++){
		// Current answer
		var ans = form_answers[i];
		if( !answers.hasOwnProperty(ans.name) ){
			answers[ans.name] = [ans.value];
		}else{
			// When its checckboces dont include the 'Other' 
			// if its checked or if it's text field is empty
			if(ans.value != "Other"){
				if(ans.value != "")
				answers[ans.name].push(ans.value);
			}
			
		}
	}
	return answers;
}


/*
- Checks if all the fields are filed in
- Sanitizes the inputs
*/
function validateSubmitResults() {
	console.log("Calling from validator");
	var validated; 
  // Select only the inputs that have a parent with a required class
  var required_fields = $('.required');
  // Check if the required fields are filled in
 	required_fields.each(function(){
 		// Determite what type of input it is, and display appropriate alert message
		var field, msg_string;
   	if( $(this).hasClass('checkbox_container') || $(this).hasClass('radio_container') ){
   		field = $(this).find('input:checked');
   		msg_string = "Please select an option";
   	}else{
   		field = $(this).find('input:text, textarea');
   		msg_string = "Please fill in the field";
   	} 
		// For the checkbox/radio check the lenght of selected inputs,
		// at least 1 needs to be selected for it to validate   
		// And for the text, check that the value is not an empty string
 		if( (field.length <= 0) || !field.val() ){
 			console.log("Field length: " + field.length);
 			$(this).addClass('alert alert-warning');
 			var msg = addParagraph(msg_string, "validator-msg text-danger");
 			// Check if there is already an alert message class, 
 			// so that there wouldn't be duplicates
			if( $(this).find('p.validator-msg').length == 0  ){
      	$(this).find('.section-title').before(msg);
      }
      validated = false;
 		}
 		else{
 			// Remove the alert classes and message
 			$(this).find('p.validator-msg').detach();
      $(this).removeClass('alert-warning').removeClass('alert'); 
      validated = true;
 		}
 		// Sanitize the inputs values
 		if( validated ){
 			var answer = sanitizeString(field.val());
 			field.val(answer);
 		}
 	});

	return validated;
}

/*
createTextField() - creates form's text filed input. (Bootstrap's format)

	inputName		- string value for the input name attribute
	type 			- string 'textarea' or 'text'
	fieldName 		- the name of a section (ex: Project Name, Country)
	descriptionEle	- an element object (Helper text for the sections)
*/
function createTextField( inputName, type, fieldName, descriptionEle ){
	var div_wrap, ele;
	// Create a div element to hold the elements
	div_wrap = document.createElement( "div" );
	
	if(fieldName){
		var title = document.createElement( "label" );
		title.className ="section-title";
		title.appendChild( document.createTextNode( fieldName.toUpperCase() ) );
		div_wrap.appendChild( title );
	}

	if( type == "text" ){
		ele = document.createElement( "input" );
		ele.id = inputName;
	}
	else if( type == "textarea" ){
		ele = document.createElement( "textarea" );
	}
	ele.name = inputName;

	// Append all the elements to the div wrapper
	if( descriptionEle ) div_wrap.appendChild( descriptionEle );
	div_wrap.appendChild ( ele );
	return div_wrap;
}


/*
createInputElements 
	p_name - name attribute of an input
	p_type - 'checkbox' or 'radio' 
	p_fieldName - the name of a section (ex: Project Name, Country)
	p_values - array of options for the inputs
*/
function createInputElements( p_name, p_type, p_fieldName, p_values, p_desc ){
	// Create a div element to group the checkboxes or radio buttons
	var group_div = document.createElement("div"); 
	group_div.setAttribute("class", p_type + "_container");
	//group_div.id = p_name + "_checkboxes";
	if(p_fieldName){
		var header = document.createElement( "label" );
		header.className ="section-title";
		header.appendChild( document.createTextNode(p_fieldName.toUpperCase()) );
		group_div.appendChild( header );
	}

	// Helper text
	if( p_desc ) group_div.appendChild( p_desc );
	
	// Loop throught the values array 
	for (var i = 0; i < p_values.length; i++) {
		// Create a div element
		var div_wrap = document.createElement( "div" );
		div_wrap.className = p_type;  
		
		// Create an input element
		var input = document.createElement("input");
		var input_id = p_name + "_" + i;
		input.setAttribute( "type", p_type );
		input.setAttribute( "name", p_name );
		input.setAttribute( "value", p_values[i] );
		input.setAttribute( "id", input_id );

		// Create a label element
		var label = document.createElement( "label" );
		label.setAttribute("for", input_id);
		label.appendChild( document.createTextNode(p_values[i]) );

		// Append each element to the div_wrap
		div_wrap.appendChild( input );
		div_wrap.appendChild( label );
		group_div.appendChild( div_wrap );
	} 
	return group_div;
}

/*
Color Checkboxes
  p_colors array or null, the length needs to be the same length as the p_sections.length
*/
function customCheckboxes( p_sections, p_colors ){
  for( var i=0; i < p_sections.length; i++ ){
    // Create a div element - this will replace our original checkbox
    var box = document.createElement("div");
    box.setAttribute("class","box");
    
    var checkboxes = $("#"+p_sections[i]).find('.checkbox');
    $(checkboxes).addClass('custom-checks');
    
    // Insert the .box container 
	$(checkboxes).find('input:checkbox').after(box);

    if( p_colors ){
      // Add background color for the .box
      $(checkboxes).find('.box').each(function(i){
        $(this).css("background-color", p_colors[i]);
      });
    }
  }
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
function createSelectEle( p_id, p_filterName, p_values, p_class, p_parentEle ){
  // Create a <div> element to hold one type of filter
  var filter_div = document.createElement("div");
  filter_div.id = p_id;
  filter_div.className = p_class;
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
function createSearchInput( p_parentEle, p_class, p_placeholder ){
	// div for search
  var search_div = document.createElement( "div" );
  search_div.setAttribute( "class", p_class );
  var input = document.createElement( "input" );
  input.setAttribute( "type", "text" );
  input.setAttribute( "id", "search" );
  input.setAttribute( "placeholder", p_placeholder );
  search_div.appendChild( input );
  p_parentEle.appendChild( search_div );
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
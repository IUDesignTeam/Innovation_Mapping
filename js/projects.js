/*
createProjectForm() - 	Using this to create Mapping Innov Project Form
	p_formType - 'add' or 'update'
	p_formEle - need to pass in the <form> element refrence not the id
*/
function createProjectForm( p_formType, p_formEle ) {
	for( var i = 0; i < sections.length; i++ ){
		var type = sections[i].input_type;
		var title = sections[i].title;
		// For name attribute use the same names as the cartoDB's column names
		var name = sections[i].cartodb_field; 
		var desc = addParagraph( sections[i].help_text );

    var ele;
		if( type == "text" || type == "textarea" ){
      ele = createTextField( name, type, title, desc );
		}
		else if( type == "checkbox" || type == "radio" ){
			var value = sections[i].input_value;			 
      ele = createInputElements( name, type, title, value );
		}
    else if( type == "hidden" ){
      ele = createHiddenEle( name, value );
    }
    p_formEle.appendChild( ele );
	}
	
	// Add Project Button
	p_formEle.appendChild( createButton( p_formType+"_prj", "submit", p_formType+" Project", "btn btn-default") );
	// Add a Cancel Button 
	p_formEle.appendChild( createButton("cancel_prj", "button", "Cancel", "btn btn-default") );

	// Add an event to submit button
	$('#'+p_formType+'ProjForm').submit( function(e){
		e.preventDefault();
    // 1. Validate the data

    // Get the address for the project
    var address = $('#q02_country').val();
    // Find the x,y points for that address
    geocode(address, function(location){
      // Conver the points to cartodb format
      var cartodb_geo = cartodbGeoLocation(location);
      // Set the value of the hidden field 
      $('input[name="the_geom"]').val( cartodb_geo );
      // Get form data
      var current_form = $('form')[0].id;
      var data = getFormValues(current_form);
     
      var query;
      if( current_form == "addProjForm" ){
        query = constructInsertQuery( cartodb_tables[1], data );
      } 
      else if( current_form == "updateProjForm" ){ 
        var columnId = {"column":"cartodb_id", "value":this.parentNode.id};
        query = constructUpdateQuery( cartodb_tables[1], data, columnId );
      }
      console.log("SQL: "+ query);
      // Post to CartoDB table
      postToCartoDB( query ); 
     });




    //console.log("Carto Point: " + geo );
    // 3. set the_geom hidden element's value to that of geo
   // $('input[name="the_geom"]').val( geo );
   
    
   
	});	


  // Add an event to cancel button
  $('#cancel_prj').on('click', function(){
    // remove the form container
    clearElement(this.parentNode.parentNode, true);
  });
	addBootstrapClasses();
}

/*
	createTable()
*/
function createTable( p_rows ) {
  var numProj = p_rows.length;
  // Find empty projects_table
  var projTable = document.getElementById("projects_table");
  // Headings for each column to display
  var td_data = ["q01_project","q04_scale", "q03a_sector","q02_country"];

  // For each project create <tr> element
  for( var i = 0; i < p_rows.length; i++ ){
    var project = p_rows[i];
    var cartodb_id = project.cartodb_id;

    var newRow = document.createElement("tr");
    newRow.setAttribute("id", cartodb_id);
    
    // In each <tr> create a column <td>
    for( var j=0; j <= td_data.length; j++ ){
      var newCell = document.createElement("td");
      var cellData;
      if( j < td_data.length ){
        cellData = document.createTextNode(project[td_data[j]]);
      }else{
        // Create update link 
        var cellData = createLink( "#update", "update", "Update"  );        
      }
      newCell.appendChild( cellData );
      newRow.appendChild( newCell );
    }
    // Append the newRow to the table
    projTable.appendChild( newRow );
  }
  // Ad an event to the a element
  $('td a').on('click',function() {
    attachForm( this.parentNode.parentNode );
  });
}

/*
  attachForm
    p_row - the refrence to the element not the id
*/
function attachForm( p_row ) {
  var form_ele = document.createElement("form");
  form_ele.setAttribute("id","updateProjForm"); 
  p_row.innerHTML = "";
  p_row.appendChild(form_ele);

  createProjectForm('update', form_ele);
 
  var obj = {"cartodb_id": [p_row.id]};
  var query = constructSelectQuery(cartodb_tables[1], obj, false );
  getFromCartoDB( query, fillInForm ); 
}

/*
	fillInForm()
*/
function fillInForm( p_project ) {
  var prj = p_project[0];

  // Fill in the input's values
  $('input, textarea').each(function() {
    if (this.type == "checkbox" || this.type == "radio") {
      if(prj[this.name] && prj[this.name].indexOf(this.value) >= 0) this.checked = true;
    } 
    else {
      this.value = prj[this.name];
    }
  });

}

/*
	promptUser()
*/
function promptUser() {
  if (window.confirm("Are you sure you with to continue without saving? (Project will keep previous information)")) {
    window.location.href = "your_projects.php";
  }
  else {
    return false;
  }
  return true;
}





/*
  cartodbGeoLocation
*/
function cartodbGeoLocation( p_location ){
  var latitude = p_location.lat;
  var longitude = p_location.lng;

 // console.log("\nFrom carto: " + JSON.stringify(p_location) );
  // CartoDB's the_geom 
  var cartodb_geo;
  /*
  // Slightly move the point over,
  // so that the points wont stack up on top of each other
  var latRandom = Math.random(); 
  var latNegPos = Math.random() < 0.5 ? -1 : 1;  
  latRandom *= latNegPos;
  
  var lonRandom = Math.random();
  var lonNegPos = Math.random() < 0.5 ? -1 : 1;
  lonRandom *= lonNegPos;

  latitude += latRandom;
  longitude += lonRandom;
  */
  if (latitude && longitude) {
    console.log('Yeay');
    // the_geom uses projected point, so we need to convert 
    // the regular point position to projected point
    cartodb_geo = "CDB_LatLng(" + latitude + "," + longitude +")";
  } else {
    cartodb_geo = "null";
  }
  //console.log("cartodb_geo -> " + cartodb_geo );
  return cartodb_geo;
  
  
}


/*
  geocode() - find the lat and lng using gogle's map api
*/
function geocode( p_address, callback ){
  // Location Object that will hold the p_address location
  var loc = {};// {"lat":null, "lng":null};
  // Create a new google geocoder
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( {"address":p_address}, function(results, status){
    if( status == google.maps.GeocoderStatus.OK ){
      loc.lat = results[0].geometry.location.lat();
      loc.lng = results[0].geometry.location.lng();
    }else{
      loc.lat = null;
      loc.lng = null;
    }
    callback(loc);
  });
}


/*
	getFromCartoDB()
*/
function getFromCartoDB( p_query, callback ){
	var url_query = "http://"+cartodb_account+".cartodb.com/api/v2/sql?q=" + p_query + "&api_key=" + cartodb_api_key;
	var rows_obj;
	$.getJSON( encodeURI(url_query), function(data){
		rows_obj = data.rows;
	}).done(function() {
    	console.log("got the data");
    	// Run the callabck function with the rows_obj data passed in
    	callback(rows_obj);
  	});
}

/*
	postToCartoDB()
*/
function postToCartoDB( p_query ){	
	// ---- NEED ----
	// latitude, longitude
	
	var url_query = "http://"+cartodb_account+".cartodb.com/api/v2/sql?q=" + p_query + "&api_key=" + cartodb_api_key;
	$.post( encodeURI(url_query) )
	.done(function(){
		// Refresh the Page
		console.log("Project has been added successfully");
	})
	.fail(function(data){
		console.log("ERROR: " + data.error[0]);
	});
}

/*
getOfficeProjects()
*/
function getOfficeProjects( p_sessionObj ){
  console.log(p_sessionObj);
  var tempString;
  //Find out what countries they can see. HQ can see all, others only some
    if (p_sessionObj["Office"] != "HQ" && p_sessionObj["Office"] != "Admin"){
      if (p_sessionObj["Office"] == "RO") {
        tempString = constructSelectQuery(cartodb_tables[1], {"region": [p_sessionObj["Region"]]}, false, false );
      } else {
        //tempString = selectKeywordQuery(cartodb_tables[1], p_sessionObj["Country"], ["q02_country"]);
        tempString = constructSelectQuery(cartodb_tables[1], {"q02_country":p_sessionObj["Country"]}, false, true );
      }
    }else{
      tempString = constructSelectQuery( cartodb_tables[1], null, true, false );
    }
    console.log(tempString);
    getFromCartoDB( tempString,  createTable );
}

function searchKeyword( p_table, p_searchKey, p_searchIn ){   
  var search_sql = "SELECT * FROM " + p_table + " WHERE ";
  
  for( var i=0; i<p_searchIn.length; i++ ){
   search_sql += p_searchIn[i] +" ILIKE '%" + p_searchKey + "%'"; 
    if( p_searchIn.length>1 && i<p_searchIn.length-1 ){
      search_sql += " OR ";
    }
  }    
  return search_sql;                                       
}

/*
constructSelectQuery - creates a select sql string that uses 'IN' command
  p_table     - (string) CartoDB's data table's name
  p_data      - (object) 
  p_selectAll - (boolean) true will select all the table results, 
                while false will select specific results
*/
function constructSelectQuery( p_table, p_data, p_selectAll, p_keyword ){
  // The # of properties there are in the object
  var len = getObjLength( p_data ); 
  // Tracks the current # of properties in the object
  var keyCount = 0;

  // Beginning the sql string
  var sql = "SELECT * FROM " + p_table;
  // If selectAll is true then the statement ends at the beginning
  if( p_selectAll == false ){
    sql += " WHERE ";
    for( key in p_data ){
      sql += key;

      // Add on ilike if its keyword/pattern or in if its specific value
      sql += ( (p_keyword==true) ? " ILIKE '%":" IN (" );
      for( var i=0; i<p_data[key].length; i++ ){
        // Open quote
        sql += ( (p_keyword==true) ? "":"'" );
        // Value
        sql += p_data[key][i];
        // Close quote
        sql += ( (p_keyword==true) ? "":"'" );
        if ( p_data[key].length > 1 && i < p_data[key].length-1 ) sql += ", ";
      }
      sql += ( (p_keyword==true) ? "%'":")" );
  
      keyCount++; 
      // Only add 'and' if the # of properties in the object is greater than 1, and 
      // the current property # is less than the # of properties in the object
      if(len > 1 && keyCount < len){
        sql += ( (p_keyword==true) ? " OR ":" AND " );    
      }    
    }
  }
  return sql;
}


/*
constructInserQuery 
  p_table - (string) CartoDB's data table's name
  p_data  - (object) 
*/
function constructInsertQuery( p_table, p_data ){
  // The # of properties there are in the object
  var len = getObjLength( p_data ); 
  // Keeping track of object's size
  var keyCount = 0;  
  // strings that will have the column field names and values
  var col_string = "";
  var val_string = "";

  var sql = "INSERT INTO " + p_table;
  for( key in p_data ){
    col_string +=  key;
      
    //val_string += "'";
    val_string += (key != "the_geom") ? "'":"";

    for( var i=0; i < p_data[key].length; i++ ){
      val_string += p_data[key][i]; //.replace(/'/g,"''"); // ---------------- EDIT see if it works with url encoder
      if( p_data[key].length > 1 && i < p_data[key].length-1 ){
        val_string += ", ";   
      }
    }
    //val_string += "'";
    val_string += (key != "the_geom") ? "'":"";

    keyCount++; 
    if(keyCount < len){
      col_string += ", ";
      val_string += ", ";
    } 
  }
  sql += " (" + col_string + ") VALUES (" + val_string + ")";
  return sql;
}

/*
  constructUpdateQuery()
  	p_where - (object) holds the information for the WHERE clause for the query
*/
function constructUpdateQuery( p_table, p_data, p_where ){
  // The # of properties there are in the object
  var len = getObjLength( p_data ); 
  // Keeping track of object's size
  var keyCount = 0;  

  var sql = "UPDATE " + p_table + " SET ";

  for( key in p_data ){
    sql += key + "='"; //  + p_data[key] + "'"; //.replace(/'/g,"''");;
    for( var i=0; i < p_data[key].length; i++ ){
      sql += p_data[key][i];
      if( p_data[key].length > 1 && i < p_data[key].length-1 ){
        sql += ", ";
      } 
    }
    sql += "'";
    keyCount++;
    if(keyCount < len)sql += ", ";
  }
  sql += " WHERE " + p_where.column + "='" + p_where.value + "'";
  return sql;
}
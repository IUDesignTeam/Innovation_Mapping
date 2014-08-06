var data, query;
var sublayers = [];
var all_checked_filters = [];   // Holds the checked filters' values
    
function initMap(){ 
  var layerUrl = "http://unicefinnovation.cartodb.com/api/v2/viz/d360d7b4-f4c5-11e2-914d-c774fd9898f6/viz.json";
                  
  // Options for cartodb's map visualization 
  var visOptions = {
      center: [0, 0],
      zoom: 3,
      zoomControl: false,
      loaderControl: false,
      cartodb_logo: false,
      layer_selector: false,
      legends: false
  };
    
  // Create a visualization map inside the #map div
  var vizMap = cartodb.createVis( 'map', layerUrl, visOptions );

  vizMap.on('done', function( vis, layers ){
    // There are two layers, base layer(gmap) and cartodb layers
    // layers[1] is the cartodb layer created in the UI
    // and it has two sublayers (world_map, mapping_innovation)
    sublayers['region'] = layers[1].getSubLayer(0);
    sublayers['innovation'] = layers[1].getSubLayer(1);

    var map_div = document.getElementById("map");
  
    // First create the side filters
    var side_filters = createFilters();
    // Second populate the side menu with those filters
    createToggleMenu("side_filters", "Filters", side_filters, map_div);

    // Add classes to the elements
    addBootstrapClasses();

    // Add an onchange event to the search box filter
    $( "#search" ).on( 'change', function(){
      var str = searchKeyword( cartodb_tables[1], this.value, search_field );  // chamge to fields
      displayMapLayer('region', constructSelectQuery(cartodb_tables[0],null,true,false) );
      displayMapLayer('innovation', str );        
    });
       
    // Shows/Hides the side filter menu
    $('#menu_tab').on('click', function(){
      $(this).toggleClass('slide-out');
      // Check if its slide-out
      if($(this).hasClass('slide-out')){
        $('#side_filters').show();
        var h = $('nav').height() + $('#top_filters').height();
        var w = $('#side_filters').width() - 2;
        $('#side_filters').height = h;
        $(this).css('left', w);
      }else{
        $(this).css('left', '-1.5em');
        $('#side_filters').hide();
      }   
    });
    
    // Add onclick event to the <input> elements (checkboxes)
    $('.checkbox-container input').on( 'click', function(e){
      data = getFormValues('all_checks_filter');
      query = constructSelectQuery(cartodb_tables[1], data, false, false );
      displayMapLayer('innovation', query );
    });

    // Add onclick to select drop down
    $('#region select').on('change', function(){
      data = getFormValues(this.parentNode.id);
      var r_query = constructSelectQuery(cartodb_tables[0], data, false, false);
      displayMapLayer('region', r_query);
      var c_query = constructSelectQuery(cartodb_tables[1], data, false, false);
      displayMapLayer('innovation', c_query);
    });
    $('#country select').on('change', function(){
      data = getFormValues(this.parentNode.id);
      query = constructSelectQuery(cartodb_tables[1], data, false, true);
      displayMapLayer('innovation', query);
    });

    // Add onclick event to the reset button
    $('#resetFilters').on("click", function(){
      resetFilters();
    });
  }); // end of viz.on

  vizMap.on( 'error', function(err){
    console.log( "ERRORS: " + err );
  });
}

/*
 displayMapLayer - Show the map layer
  p_layer - cartoDB layer 
  p_sql - query string that goes with the layer
*/
function displayMapLayer( p_layer, p_sql ){
   sublayers[p_layer].setSQL( p_sql );
   // add css to the layer as well
}

function resetFilters(){
  // Clear the search field
  $('#search').val("");
  // Reset the region and the country values
  $('#region select').val("All Regions");
  displayMapLayer('region', constructSelectQuery(cartodb_tables[0],null,true,null) );
  $('#country select').val("All Countries");
  displayMapLayer('innovation', constructSelectQuery(cartodb_tables[1],null,true,null) );
  // Clear the checkboxes values
  $('input:checked').prop('checked',false);
}

/*
  createFilters
 */
function createFilters() {
  // Create the content (filters)
  var docFrag = document.createDocumentFragment();
    
  // Filter for Search box
  createSearchInput( docFrag, "Search for keywords..." );
  // Create a reset button
  docFrag.appendChild(createButton("resetFilters", "reset", "x Clear Filters")); //p_class = "btn btn-default"
  // Filter for Regions
  createSelectEle( "region", "unicef_region", region_values, docFrag );
  // Filter for Countries
  createSelectEle( "country", "q02_country", country_values, docFrag );
  // Filter for
  var checkboxes_filters = [
      sections[3],    // Primary Sector
      sections[5],    // Scale 
      sections[10],    // Created By 
      sections[9]     // Created For 
  ];   
  var checkboxes_wrap = document.createElement("div");
  checkboxes_wrap.id = "all_checks_filter";
  var group =  createGroupFilters(checkboxes_filters, "hr");
  checkboxes_wrap.appendChild( group );
  docFrag.appendChild( checkboxes_wrap );
  return docFrag;
}


/*
createGroupFilters
  p_arrayOfFilters    
  p_separationEle - a string of the element to be created (i.e. 'hr', 'br')
*/
function createGroupFilters( p_arrayOfFilters, p_separationEle ) {
  // Create the content (filters)
  var docFrag = document.createDocumentFragment();
  for( var i = 0; i < p_arrayOfFilters.length; i++ ){
    // Curent section filter
    var filter = p_arrayOfFilters[i];
    var inputs = createInputElements( filter.cartodb_field, "checkbox", filter.title, filter.input_value );
    docFrag.appendChild( inputs );
    // element that seperates each section of inputs
    if(i < p_arrayOfFilters.length-1){
      var sepEle = document.createElement(p_separationEle);
      docFrag.appendChild(sepEle);
    }
  }
  return docFrag;
}
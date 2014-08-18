var data, query;
var sublayers = [];
var all_checked_filters = [];   // Holds the checked filters' values
    
function initMap(){ 
  var layerUrl = "http://unicefinnovation.cartodb.com/api/v2/viz/d360d7b4-f4c5-11e2-914d-c774fd9898f6/viz.json";
                  
  // Options for cartodb's map visualization 
  var visOptions = {
      center: [0, 0],
      zoom: 3,
      zoomControl: true,
      loaderControl: false,
      cartodb_logo: false,
      layer_selector: false,
  };

  
  // Create a visualization map inside the #map div
  var vizMap = cartodb.createVis( 'map', layerUrl, visOptions );
  vizMap.on('done', function( vis, layers ){
    var map_div = document.getElementById("map");
    // Change the position of the zoom button
    var zoom_width = $('.cartodb-zoom').width();
    $('.cartodb-zoom').css({
      position:"absolute",
      top: 100,
      left:  $(map_div).width() - (zoom_width*3)
    });

    // Last Updated Box
    var updated = moment(vis.updated_at).format("MM/DD/YYYY");
   
    var time_box = document.createElement("div");
    time_box.id = "date";
    var textEle = document.createElement("p");
    textEle.appendChild(document.createTextNode("Last Updated: " + updated));
    time_box.appendChild(textEle);
    map_div.appendChild(time_box);

  
    // There are two layers, base layer(gmap) and cartodb layers
    // layers[1] is the cartodb layer created in the UI
    // and it has two sublayers (world_map, mapping_innovation)
    sublayers['region'] = layers[1].getSubLayer(0);
    sublayers['innovation'] = layers[1].getSubLayer(1);

    // First create the side filters
    var side_filters = createFilters();
    // Second populate the side menu with those filters
    createToggleMenu("side_filters", null, side_filters, map_div);

    // Select the children of the #side_menu add a class
    //$('#side_filters').children('div').addClass('filter_group');

    // Add class for select filters
    $('#region, #country').addClass('select-options');

    // Add classes to the elements
    addBootstrapClasses();

    // Add color checkboxes
    customCheckboxes( ["q03a_sector_checkboxes"], sections[2].colors );
    customCheckboxes( ["q04_scale_checkboxes","q09_creators_checkboxes","q08_users_checkboxes", "portfolios_checkboxes"], null );
    // Add an onchange event to the search box filter
    $( "#search" ).on( 'change', function(){
      var str = searchKeyword( cartodb_tables[1], [this.value], search_field );  // chamge to fields
      //displayMapLayer('region', constructSelectQuery(cartodb_tables[0],null,true,false) );
      displayMapLayer('innovation', str );        
    });
      
    // Add onclick event to the <input> elements (checkboxes)
    $('.checkbox input, .radio input').on( 'click', function(e){
      var parentId = $(this).parent().parent().attr('id');
      console.log("ID: " + parentId);
      console.log($(this).val());
      var query;
      if( parentId == "portfolios_checkboxes" ){
        if( $(this).val() == "Youth Engagement" ){
          var keywords = portfolios[0].keywords;
        }else if( $(this).val() == "Real-time Data" ){
          var keywords = portfolios[1].keywords;
        }else if( $(this).val() == "Infrastructure" ){
          var keywords = portfolios[2].keywords;
        }
        query = searchKeyword( cartodb_tables[1], keywords, search_field );
      }else{
        data = getFormValues("filterGroup");
        query = constructSelectQuery(cartodb_tables[1], data, false, false );
      } 
      displayMapLayer('innovation', query );
  
      console.log("QUERY: "  + query);
    });

    /*
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
*/
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
  var search_div = document.createElement("div");
  createSearchInput( search_div, "filter_container", "Search for keywords..." );
  docFrag.appendChild(search_div);

  // Create a reset button
  docFrag.appendChild(createButton("resetFilters", "reset", "x Clear Filters")); //p_class = "btn btn-default"
/*  
  // Filter for Regions
  var location_div = document.createElement("div");
  createSelectEle( "region", "unicef_region", region_values, "filter_container", location_div );
  // Filter for Countries
  createSelectEle( "country", "q02_country", country_values, "filter_container", location_div );
  docFrag.appendChild(location_div);
*/

  // Filter for Portfolios
  var portfolio_div = document.createElement("div");
  var port_values = [portfolios[0].portfolio, portfolios[1].portfolio, portfolios[2].portfolio];
  var portEle = createInputElements( "portfolios", "radio", "Portfolios", port_values );
  portEle.className = "filter_container";
  portfolio_div.appendChild( portEle );
  docFrag.appendChild( portfolio_div );

  // Filter for
  var checkboxes_filters = [
      sections[2],    // Primary Sector
      sections[4],    // Scale 
      sections[9],    // Created By 
      sections[8]     // Created For 
  ];   
  docFrag.appendChild( createGroupFilters(checkboxes_filters, null) );
  return docFrag;
}


/*
createGroupFilters
  p_arrayOfFilters    
  p_separationEle - a string of the element to be created (i.e. 'hr', 'br')
*/
function createGroupFilters( p_arrayOfFilters, p_separationEle ) {
  // Create the content (filters)
  var group = document.createElement("div");
  group.className = "filter_group";
  group.id = "filterGroup";

  for( var i = 0; i < p_arrayOfFilters.length; i++ ){
    // Curent section filter
    var filter = p_arrayOfFilters[i];
    var inputs = createInputElements( filter.cartodb_field, "checkbox", filter.title, filter.input_value );
    inputs.className = "filter_container";
    group.appendChild( inputs );

    if (p_separationEle){
      // Element that seperates each section of inputs
      if(i < p_arrayOfFilters.length-1){
        var sepEle = document.createElement(p_separationEle);
        group.appendChild(sepEle);
      }
    }
  }
  return group;
}
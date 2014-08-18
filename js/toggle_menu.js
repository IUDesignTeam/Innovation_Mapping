/*
createToggleMenu

  p_containerId   - id of the div that will hold the filters "side_filters"
  p_tabTitle      - a string value of the Title that is displayed on the tab  
  p_contents       - 
  p_parentEle
*/
function createToggleMenu( p_containerId, p_tabTitle, p_contents, p_parentEle ){
  // Menu wrapper that will hold the content div and the tab div
  var side_menu = document.createElement("div");
  side_menu.setAttribute("id","side_menu");

  // Holds all the content (filters)
  var side_content = document.createElement("div");
  side_content.setAttribute("id", p_containerId);
  
  // Create the content 
  side_content.appendChild(p_contents);
  side_menu.appendChild(side_content);
  
  // Tab
  var tab = document.createElement("div");
  tab.setAttribute("id","menu_tab");

  if(p_tabTitle){
    tab.appendChild( document.createTextNode(p_tabTitle) );
  }else{
    var arrow = document.createElement("div");
    arrow.id = "arrow";
    arrow.className = "tab-in";
    tab.appendChild(arrow);
    
  }
  side_menu.appendChild(tab);
  $(p_parentEle).prepend(side_menu);

  // After the menu is appended to the DOM tree, 
  // Set the position for the tabs location
  var h = $('#map').height() / 3;
  var w = $('#side_filters').outerWidth() + 1;
  $('#menu_tab').css({"top":h, "left":w });

  // Shows/Hides the side filter menu
  $('#arrow').on('click', function(e){
    e.stopPropagation();
    
    $('#arrow').toggleClass('tab-in');
    $('#arrow').toggleClass('tab-out');
    
    // Check if its slide-out
    if($('#arrow').hasClass('tab-in')){
      $('#side_filters').show();
      $('#menu_tab').css('left', w);
    }else if( $('#arrow').hasClass('tab-out') ){
      $('#side_filters').hide();
      $('#menu_tab').css({ "left": 0, "margin-left": 0 });  
    }   
  });
}
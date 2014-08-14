/*
createToggleMenu

  p_containerId   - id of the div that will hold the filters "side_filters"
  p_tabTitle      - a string value of the Title that is displayed on the tab  
  p_content       - 
  p_parentEle
*/
function createToggleMenu( p_containerId, p_tabTitle, p_content, p_parentEle ){
  // Menu wrapper that will hold the content div and the tab div
  var side_menu = document.createElement("div");
  side_menu.setAttribute("id","side_menu");

  // Holds all the content (filters)
  var side_content = document.createElement("div");
  side_content.setAttribute("id", p_containerId);
  // Create the content 
  side_content.appendChild(p_content);
  side_menu.appendChild(side_content);
  
  // Tab
  var tab = document.createElement("div");
  tab.setAttribute("id","menu_tab");
  if(p_tabTitle){
    tab.appendChild( document.createTextNode(p_tabTitle) );
  }else{
    var arrow = document.createElement("div");
    arrow.id = "arrow";
    tab.appendChild(arrow);
  }
  side_menu.appendChild(tab);
  $(p_parentEle).prepend(side_menu);

  // After the menu is appended to the DOM tree, 
  // Set the position for the tabs location
  var h = $('#map').height() / 3;
  var w = $('#side_filters').outerWidth();
  
  $('#menu_tab').addClass('tab-out').css({"top":h, "left":w });

  // Shows/Hides the side filter menu
  $('#menu_tab').on('click', function(){
    $(this).toggleClass('tab-in');
    // Check if its slide-out
    if($(this).hasClass('tab-in')){
      $(this).css({ "left": 0, "margin-left": 0 });
      $('#side_filters').hide();
    }else{
      $('#side_filters').show();
      $(this).css('left', w);
    }   
  });
}
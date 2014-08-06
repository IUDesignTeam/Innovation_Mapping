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
    tab.appendChild( document.createTextNode(p_tabTitle) );
    side_menu.appendChild(tab);

    $(p_parentEle).prepend(side_menu);

    // After the menu is appended to the DOM tree, 
    // Set the position for the tabs location
    var h = $('nav').height() + $('#top_filters').height();
    $('#menu_tab').css({'top':h, 'left':'-1.5em' });
    // Hide the side_content div
    $('#' + p_containerId).hide();
}
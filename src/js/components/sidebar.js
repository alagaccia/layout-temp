
if ( $('#sidebar').length ) {
    var myScrollbar = new GeminiScrollbar({
        element: document.querySelector('#sidebar'),
        autoshow: false
    }).create();
}

window.slideSidebar = function (event) {
    $('#sidebar').toggleClass('is-active');
    $('#main').toggleClass('is-active');

    var myScrollbar = new GeminiScrollbar({
        element: document.querySelector('#sidebar'),
        autoshow: false
    }).update();
};

$(document).on('click', '.navbar .navbar-item.has-dropdown', function(e) {
    if ( ! $(e.target).hasClass(".navbar-item") ) {
        $(this).find('.navbar-dropdown').toggle();
    }
});

// Click outside
window.addEventListener('click', (e) => {
    if ( ! $(e.target).parents('.navbar-item.has-dropdown').length ) {
        $('.navbar-dropdown').hide();
    }
});

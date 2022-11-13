$('.dropdown').click( function() {
    let hasClass = $(this).hasClass('is-active');

    $('.dropdown').removeClass('is-active');

    if ( ! hasClass ) {
        $(this).addClass('is-active');
    }
});

// Click outside
window.addEventListener('click', (e) => {
    if ( ! $(e.target).parents('.dropdown').length ) {
        $('.dropdown').removeClass('is-active');
    }
});

$(document).on('click', '.accordion:not(.no-close) .accordion-header', function (e) {

    var isActiveOrNot = $(this).parent().hasClass('is-active');

    if ( isActiveOrNot ) {
        $(this).parent().removeClass('is-active');
        $(this).find('.accordion-header-close i').removeClass('fa-chevron-down');
        $(this).find('.accordion-header-close i').addClass('fa-chevron-left');
    } else {
        $(this).parent().addClass('is-active');
        $(this).find('.accordion-header-close i').addClass('fa-chevron-down');
        $(this).find('.accordion-header-close i').removeClass('fa-chevron-left');
    }
});

$(document).on('change', '#toggle-accordions', function(e) {
    document.querySelectorAll('.accordion').forEach(el => el.classList.toggle('is-active'));
});

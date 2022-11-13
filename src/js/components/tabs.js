$(document).on('click', '.tabs > li', function(e) {
    e.preventDefault();

    var $tabs = $(this).parents('.tabs');
    var $contents = $('.tabs-content')

    var id = $(this).find('a').attr('href');
    $tabs.find('li').removeClass('is-active');
    $contents.find('.tab-content').removeClass('is-active');

    $(this).addClass('is-active');
    $contents.find('.tab-content' + id).addClass('is-active');
});

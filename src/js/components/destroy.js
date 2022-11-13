$(document).on('click', '.destroy', function(e) {
    e.preventDefault();

    let action = $(this).attr('data-url');
    let title = $(this).attr('data-title') || null;

    // Open Modal
    var urlModal = "/app/remove";
    var modal = "#modal";

    $.get(urlModal, function (data) {
        $(modal).html(data);
        $(modal).find('form').attr('action', action);
        if (title) {
            $(modal).find('form').find('#WHAT').text(title);
        }
        $(modal).addClass('is-active');

        window.ajaxAfter();

        $('[type="submit"]').click(function(e) {
            // if ( $('[name="delete"]').val().toLowerCase() != "elimina" ) {
            //
            //     $('[name="delete"]').removeClass('is-danger');
            //     $('[name="delete"]').parents('.field').find('.help.is-danger').remove();
            //
            //     $('[name="delete"]').parents('.field').append('<p class="help is-danger">Dicitura errata</p>');
            //     $('[name="delete"]').addClass('is-danger');
            //
            //     return false;
            // }
            return true;
        });
    });
});

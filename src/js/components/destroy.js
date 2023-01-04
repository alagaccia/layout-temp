$(document).on('click', '.destroy', function(e) {
    e.preventDefault();

    let action = $(this).attr('data-url');
    let title = $(this).attr('data-title') || null;
    let inline = $(this).hasClass('inline');

    if ( inline ) {
        $.ajax({
            type: 'DELETE',
            url: action,
            dataType: 'json',
            beforeSend: function (result) {
                // window.submitAjax.beforeSend(btnSubmit, result);
            }
        }).done(function (result) {
            window.submitAjax.done(result);
        }).always(function (result) {
            // window.submitAjax.always(btnSubmit, btnClass, result);
        }).fail(function (result) {
            // window.submitAjax.fail(form, result);
        });
    } else {

        $(this).parents('.modal').removeClass('is-active').html('');

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
                return true;
            });
        });
    }
});

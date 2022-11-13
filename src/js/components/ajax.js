window.ajaxAfter = function () {
    customAjax();
};

$(document).on('click', '.ajax', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let dati = '';
    let form = $(this);
    let action = $(this).attr('data-url') || $(this).attr('href');
    let method =  $(this).attr('data-method') || "GET";
    let type = $(this).attr('data-type') || 'json';
    if (method != "GET") {
        dati += '_token=' + $('meta[name="csrf-token"]').attr('content');
    }
    let btnSubmit = form;
    let btnClass = btnSubmit.find('i').attr('class');

    let confirmation = $(this).hasClass('confirm') ? true : false;

    var isConfirmed = true;

    if ( confirmation ) {
        isConfirmed = confirm("Confermi?");
    }

    if (isConfirmed) {
        $.ajax({
            type: method,
            url: action,
            dataType: type,
            data: dati,
            beforeSend: function (result) {
                window.submitAjax.beforeSend(btnSubmit, result);
            }
        }).done(function (result) {
            window.submitAjax.done(result);
        }).always(function (result) {
            window.submitAjax.always(btnSubmit, btnClass, result);
        }).fail(function (result) {
            window.submitAjax.fail(form, result);
        });
    }
});

$(document).on('click', '.fetch', function(e) {
    e.preventDefault();

    let element = $(this);
    let btnSubmit = element;
    let btnClass = btnSubmit.find('i').attr('class');

    let url = $(this).attr('data-url');
    let target = $(this).attr('data-target');
    let where = $(this).attr('data-where') || 'append'; // prepend
    let type = $(this).attr('data-type') || 'html';

    $.get(url, function(fetched) {
        switch(where) {
            case 'append':
                $(target).append(fetched);
                break;
            case 'prepend':
                $(target).prepend(fetched);
                break;
            case 'html':
                $(target).html(fetched);
                break;
        }
    }).done(function (fetched) {
        let result = { modal: true };
        window.submitAjax.done(result);
        window.ajaxAfter();
    }).always(function (fetched) {
        window.submitAjax.always(btnSubmit, btnClass, fetched);
    }).fail(function (fetched) {
        window.submitAjax.fail(element, fetched);
    });
});

$(document).on('change', '.select-ajax', function(e) {
    event.preventDefault();

    let dati = '';
    let form = $(this);
    let action = $(this).attr('data-url') || $(this).attr('href');
    let method =  $(this).attr('data-method') || "GET";
    let type = $(this).attr('data-type') || 'json';
    if (method != "GET") {
        dati += '_token=' + $('meta[name="csrf-token"]').attr('content');
    }
    let btnSubmit = form;
    let btnClass = btnSubmit.find('i').attr('class');

    dati += '&id=' + this.value;

    $.ajax({
        type: method,
        url: action,
        dataType: type,
        data: dati,
        beforeSend: function (result) {
            window.submitAjax.beforeSend(btnSubmit, result);
        },
    }).done(function (result) {
        window.submitAjax.done(result);
    }).always(function (result) {
        window.submitAjax.always(btnSubmit, btnClass, result);
    }).fail(function (result) {
        window.submitAjax.fail(form, result);
    });
});

$(document).on('change', '.fetchFromSelected', function(e) {
    e.preventDefault();

    var url = $(this).attr('data-url');

    var target = $(this).attr('data-target');
    var where = $(this).attr('data-where');
    var method = $(this).attr('data-method') || 'get';
    var id = $(this).val();
    var type = $(this).attr('data-type') || 'json';
    var first = $(this).attr('data-first');
    var prefix = $(this).attr('data-prefix');
    var prefixExcept = $(this).attr('data-prefixExcept');

    url += '/' + id;

    $.ajax({
        url: url,
        method: method,
        dataType: type,
    }).done(function (msg) {
        if (target) {
            $(target).html(msg);
        } else {
            $.each(msg, function (index, value) {
                if (prefix) {
                    if (prefixExcept != null && prefixExcept == index) {
                        if ( $('[name="'+index+'"]').is(':checkbox') ) {
                            $('[name="'+index+'"]').prop('checked', value);
                        } else {
                            $('[name="'+index+'"]').val(value);
                        }
                        $('[name="'+index+'"]').prop('disabled', false);
                    } else {
                        if ( $('[name="'+prefix+'['+index+']"]').is(':checkbox') ) {
                            $('[name="'+prefix+'['+index+']"]').prop('checked', value);
                        } else {
                            $('[name="'+prefix+'['+index+']"]').val(value);
                        }
                        $('[name="'+prefix+'['+index+']"]').prop('disabled', false);
                    }
                }
                else {
                    if ( $('[name="'+index+'"]').is(':checkbox') ) {
                        $('[name="'+index+'"]').prop('checked', value);
                    } else {
                        $('[name="'+index+'"]').val(value);
                    }
                    $('[name="'+index+'"]').prop('disabled', false);
                }
            });
        }
    }).fail(function (result) {
        console.log(result);
    });
});

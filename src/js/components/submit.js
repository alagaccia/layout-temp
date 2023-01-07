$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).on("keydown", ".form-no-enter", function(event) {
    return event.key != "Enter";
});

$(document).on('submit', '.submit', function(e) {
    e.preventDefault();

    let form = $(this);
    let action = form.attr('action');
    let method = form.attr('method');
    let type = form.attr('data-type') || 'json';
    let dati = form.serialize()
        dati += '&_token=' + $('meta[name="csrf-token"]').attr('content');
    let btnSubmit = form.find('[type="submit"]');
    let btnClass = btnSubmit.find('i').attr('class');

    if ( form.find('input[name="_method"]').length ) {
        method = form.find('input[name="_method"]').val();
    }

    if ( form.find('input[name="_modal"]').length ) {
        let modal = form.find('input[name="_modal"]').val();
    }

    $.ajax({
        type: method,
        url: action,
        dataType: type,
        data: dati,
        beforeSend: function (result) {
            window.submitAjax.beforeSend(btnSubmit, result);
        }
    }).done(function (result) {
        if ( ! form.hasClass('only-errors') ) {
            window.submitAjax.done(result);
        }
    }).always(function (result) {
        window.submitAjax.always(btnSubmit, btnClass, result);
    }).fail(function (result) {
        window.submitAjax.fail(form, result);
    });
});

window.submitAjax = {
    beforeSend: function(btnSubmit, result) {
        $('html').addClass('loading');
        $('.loader-box').show();
        $('.helper-text').text('');
        $('[name]').removeClass('is-danger');
        $('.tab a').removeClass('active');
        $('input.is-danger').removeClass('is-danger');
        $('.select.is-danger').removeClass('is-danger');
        $('.help.is-danger').remove();
        // Spin the button
        btnSubmit.find('i').attr('class', 'fas fa-spinner fa-spin');
        // Disable submit button to prevent double click
        btnSubmit.prop('disabled', true);
    },
    always: function(btnSubmit, btnClass, result) {
        $('html').removeClass('loading');
        $('.loader-box').hide();
        // Disable spin
        btnSubmit.find('i').attr('class', btnClass);
        // Get submit button active again
        btnSubmit.prop('disabled', false);
    },
    actions: function(result) {
        if ( ! result.errors && ! result.modal && ! result.where ){
            if (result.modal_close) {
                $(result.modal_close).removeClass('is-active');
            } else {
                $('.modal').removeClass('is-active');
            }
        }

        if (result.redirect){
			location.href = result.redirect;
    	}

        if (result.notify) {
            window.notify.alert(result);
        }

        // Elimina una riga
        if (result.tr){
            $('[id="'+result.tr+'"]').remove();
        }

        // Elimina più righe
        if (result.trs){
            $.each(result.trs, function(i, value){
                $('[id="'+value+'"]').remove();
            });
        }

        // Operazioni in ajax
        if (result.load){
            $.each(result.load, function(i, value){
                $.get(value.page, function(data){
                    if (value.prepend){
                        $(value.element).prepend(data);
                    } else if (value.replace){
                        $(value.element).replaceWith(data);
                    } else {
                        $(value.element).html(data);
                    }
                    window.ajaxAfter();
                });
            });
        }

        // Operazioni su degli elementi
        if (result.element) {
            $.each(result.element, function(i, value){
                if (value.remove){
                    $(value.selector).remove();
                } else {
                    var selettore = $(value.selector);

                    if (value.getAttribute && value.setAttribute) {
                        selettore.attr(value.getAttribute, value.setAttribute);
                    }
                    if (value.id) {
                        selettore.attr('id', value.id);
                    }
                    if (value.style) {
                        selettore.attr('style', value.style);
                    }
                    if (value.href) {
                        selettore.attr('href', value.href);
                    }
                    if (value.prop) {
                        selettore.prop(value.prop, value.prop_value);
                    }
                    if (value.removeAttr) {
                        selettore.removeAttr(value.removeAttr);
                    }
                    if (value.removeClass) {
                        selettore.removeClass(value.removeClass);
                    }
                    if (value.addClass) {
                        selettore.addClass(value.addClass);
                    }
                    if (value.toggleClass) {
                        selettore.toggleClass(value.toggleClass);
                    }
                    if (value.html) {
                        selettore.html(value.html);
                    }
                    if (value.append) {
                        selettore.append(value.append);
                    }
                    if (value.prepend) {
                        selettore.prepend(value.prepend);
                    }
                    if (value.text) {
                        selettore.text(value.text);
                    }
                    if (value.after) {
                        selettore.after(value.after);
                    }
                    if (value.value) {
                        selettore.val(value.value).change();
                    }
                    if (value.empty) {
                        selettore.val('');
                    }
                    if (value.emptyHtml) {
                        selettore.html('');
                    }
                    if (value.parents_remove){
                        selettore.parents(value.parents_remove).remove();
                    }
                    if (value.focus){
                        selettore.focus();
                    }
                }
            });
        }
        if (result.callback){
			$.each(result.callback, function(funzione, parametri){
				// Function we want to run
				var fn_string = funzione.toString();

				// Find object
				var fn = window[fn_string];

				if (parametri != null){
					// Object to array
					var fn_params = $.map(parametri, function(value, index) {
						return [value];
					});
				}
				else {
					var fn_params = null;
				}

				// Is object a function?
				if (typeof fn === "function"){
					fn.apply(null, fn_params);
				}

			});
		}
    },
    done: function (result) {
        $('.help.is-danger').remove();
        this.actions(result);
    },
    fail: function (form, result) {
        $(".notifications-top").html('');

        switch (result.status) {
            case 400:
                window.displayNotification(form, "Azione errata");
                break;
            case 403:
                window.displayNotification(form, "Azione non autorizzata");
                break;
            case 404:
                window.displayNotification(form, "Pagina o elemento non trovato");
                break;
            case 422:
                if ( ! result.responseJSON.errors ) {
                    window.displayNotification(form, result.responseJSON.message || "422 error");
                } else {
                    this.actions(result.responseJSON);

                    if (result.responseJSON.errors) {
                        $.each(result.responseJSON.errors, function (index, value) {
                            index = dotToArray(index);

                            if ( form.find('[name="' + index + '"]').parent().hasClass('select') ) { // select
                                form.find('[name="' + index + '"]').parent().addClass('is-danger');
                            }
                            else { // input
                                form.find('[name="' + index + '"]').addClass('is-danger');
                            }

                            if (index == "generic") {
                                window.displayNotification(form, value);
                            }

                            form.find('[name="' + index + '"]').parents('.field').after('<p class="help is-danger">' + value[0] + '</p>');
                        });
                    }
                }

                break;
            case 500:
                window.displayNotification(form, result.responseJSON.message || "Errore generico");
                break;
            default:
                window.displayNotification(form, result.responseJSON.message || "Errore generico");
        }
    }
}

window.displayNotification = function(form, value) {
    if ( form.parents('.modal').length ) {
        form.parents('.modal').find('.notifications-top').html(window.notification.error(value));
    } else {
        $('.notifications-top').html(window.notification.error(value));
    }
};

window.dotToArray = function(str) {
    var output = '';
    var chucks = str.split('.');
    if(chucks.length > 1){
        for(i = 0; i < chucks.length; i++){
            if(i == 0){
                output = chucks[i];
            }else{
                output += '['+chucks[i]+']';
            }
        }
    }else{
        output = chucks[0];
    }

    return output
}

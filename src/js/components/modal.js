window.openModal = function (self = null, customUrl = null, customModal = null) {
    var url = $(self).attr('data-url') || $(self).attr('href') || customUrl;
    var modal = $(self).attr('data-modal') || customModal;
    var preClose = $(self).attr('data-preclose');

    if ( url != null ) {
        if (preClose) {
            $('.modal').removeClass('is-active');
        }

        var zIndexes = [];
        var modals = $('.modal.is-active');
        if ( modals.length ) {
            modals.each(function(index, element) {
                var zIndex = $(element).css('z-index');
                zIndexes.push( zIndex );
            });
        }

        $.get(url, function (data) {
            $(modal).html(data);
            $(modal).addClass('is-active');
            if ( zIndexes.length ) {
                $(modal).css('z-index', Math.max(zIndexes) + 1);
            }
            window.ajaxAfter();
            $('.modal [autofocus]').focus();
        });
    }
}

$(function(){
    /**
     * Close modal by pushing ESC o clicking outside the modal
     **/
    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            $(".modal").removeClass('is-active').html('');
            $(".dropdown").removeClass('is-active');
        }
    });

    /**
     * Search by F4
     **/
    $(document).keyup(function(e) {
        if (e.keyCode === 115) {
            $('#main-search').click();
        }
    });

    // $(document).on('click', '.modal-background', function(e) {
    //     $(".modal").removeClass('is-active').html('');
    // });

    $(document).on('click', '[data-modal]', function (e) {
        if ( $(this).attr('data-modal') != "" ) {
            e.preventDefault();

            openModal( $(this) );
        }
    });

    $(document).on('click', '.modal-card-head .close-modal, .modal-card-foot .close-modal', function () {
        $(this).parents('.modal').removeClass('is-active').html('');
    });
});

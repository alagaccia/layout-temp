$(function(){
    $(document).on('keydown.autocomplete', '.cerca', function(){
        var resultLength;
        var id;

        var element = this;

        $( element ).autocomplete({
            onSearchStart: function(params) {
                $(element).parents('.control').addClass('is-loading');
            },
            onSearchComplete: function (query, suggestions) {
                $(element).parents('.control').removeClass('is-loading');
            },
            serviceUrl: $(element).attr('data-url'),
            dataType: 'json',
            type: 'GET',
            minChars: 2,
            paramName: 'term',
            onSelect: function (suggestion) {
                resultLength = suggestion.value.length;
                id = suggestion.id;

                $.each(suggestion.data, function (index, value) {
                    if ( $(element).parents('.tab-content').length ) {
                        var tab_id = $(element).parents('.tab-content').attr('id');
                        $( '#' + tab_id + ' [name="'+index+'"]' ).val(value).change();
                    } else {
                        $( '[name="'+index+'"]' ).val(value).change();
                    }
                });
                $.each(suggestion.replace, function (index, value) {
                    $( '.' + index ).text(value);
                });

                window.submitAjax.actions(suggestion.actions);
            }
        });

        $( element ).keyup(function(e) {
            if ( $( element ).val().length != resultLength ) {
                $( '[name="'+id+'"]' ).val('').change();
            }
        });
    });

});

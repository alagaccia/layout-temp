
$(document).on('click', '#check_all', function(e) {
    if ( $(this).is(":checked") ) {
        $('.checkbox-selecting').prop('checked', true);
    } else {
        $('.checkbox-selecting').prop('checked', false);
    }

    FillMultipleCheckbox();
});

$(document).on('click', '.checkbox-selecting', function(e) {

    if ( $(this).is(":checked") ) {
        $(this).closest('tr').addClass("has-background-success");
    }
    else  {
        $(this).closest('tr').removeClass("has-background-success");
    }
});

$(document).on('click', '.checkbox-multiple', function(e) {
    var currentSelectedValue = this.getAttribute('name');

    FillMultipleCheckbox();
});

window.FillMultipleCheckbox = function() {
    var rows = document.querySelectorAll('.checkbox-multiple:checked');

    var multiple_selected = [];
    for(var i=0; i<rows.length; i++)
    {
        multiple_selected.push(rows[i].getAttribute('name'));
    }

    customCheckboxMultiple(rows);

    $('[name="multiple_selected"]').val(multiple_selected.toString());
}

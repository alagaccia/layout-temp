$(document).on('keyup', '.filter', function() {
    var input, filter, table, tr, td, i, txtValue;
    input = $(this);
    filter = $(this).val().toUpperCase();
    table = $( $(this).attr('data-ref') );
    trs = table.find("> tbody > tr");
    console.log(trs.length);

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < trs.length; i++) {
        td = trs[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                trs[i].style.display = "";
            } else {
                trs[i].style.display = "none";
            }
        }
    }
});

$(document).on('keyup', '.filter-simple', function() {
    var input, filter, table, tr, td, i, txtValue;
    input = $(this);
    filter = $(this).val().toUpperCase();
    table = $( $(this).attr('data-ref') );
    trs = table.find("> tbody > tr");
    td = null;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < trs.length; i++) {
        tds = trs[i].getElementsByTagName("td");

        for (j = 0; j < tds.length; j++) {
            txtValue = tds[j].textContent || tds[j].innerText;
            // console.log(txtValue);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                trs[i].style.display = "";
                break;
            } else {
                trs[i].style.display = "none";
            }
        }
    }
});

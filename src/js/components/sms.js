(window.inputCounter = function() {
    $('.inputCounter').keyup(function() {
        $(".charsCounter span").text( 160 - $(this).val().length );
    });
})();

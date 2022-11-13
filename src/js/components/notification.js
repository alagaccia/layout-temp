
window.notification = {
    error: function(text) {
        return `<div class="notification is-danger">
            <button class="delete" type="button"></button>
                ${text}
        </div>`;
    },
    success: function(text) {
        return `<div class="notification is-success">
            <button class="delete" type="button"></button>
                ${text}
        </div>`;
    }
}

$(document).on('click', '.notification .delete', function (e) {
    $(this).parents('.notification').fadeOut();
});

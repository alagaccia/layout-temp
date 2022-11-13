window.notify = {
    alert: function(res) {
        var classe = res.error ? 'is-danger' : 'is-success';

        if ( res.notify.remove ) {
            $(res.notify.el).fadeOut();
        }

        if ( res.notify.restore) {
            $(res.notify.el).fadeIn();
        }

        if ( res.notify.restoreUrl) {
            var notification = `
                <div class="notification ${classe}" id="notify-${res.notify.id}">
                    <button class="delete"></button>
                    <div class="notification-box">
                        <p>
                            <i class="fas fa-check icon"></i>
                            ${res.notify.text}
                        </p>
                        <p class="has-text-warning">
                            <i class="fas fa-undo-alt icon restore"></i>
                            <a href="#!" onclick="notify.restore('${res.notify.restoreUrl}')">Ripristina</a>
                        </p>
                    </div>
                </div>`;

            $('.notifications').append(notification);
        } else {

            var notification = `
                <div class="notification ${classe}" id="notify-${res.notify.id}">
                    <button class="delete"></button>
                    <div class="notification-box">
                        <p>
                            <i class="fas fa-check icon"></i>
                            ${res.notify.text}
                        </p>
                    </div>
                </div>`;

            $('.notifications').append(notification);

            setTimeout( () => {
                $('.notification#notify-' + res.notify.id).fadeOut();
            }, 5000);

        }
    },
    remove: function (id) {
        $('.notification#attachment-' + id).fadeOut();
    },
    restore: function (url) {
        var self = this;

        $.ajax({
            method: 'POST',
            url: url,
            dataType: 'json',
        }).done(function (result) {
            if (!result.error){
                $(result.notify.el).fadeIn();
                self.remove(result.notify.id);
            }

            window.submitAjax.done(result);
        });
    }
};

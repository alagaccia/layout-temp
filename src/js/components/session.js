/**
 * Session always on
 * every minute
 */
setInterval(function() {
    $.get( '/app/sessionAlwaysOn', (data) => console.log(data) );
}, 1 * 60 * 1000);

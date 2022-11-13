import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';

$(document).on('click', '.zoomable', function(event) {
    var options = {
        inline: false,
        toggleOnDblclick: false,
        movable: false,
        rotatable: false,
        scalable: false,
        zoomable: false,
        navbar: false,
        toolbar: false,
        url: 'data-original',
    };

    const viewer = new Viewer(this, options).show();
});

$(document).on('click', '.zoomable-inline', function(event) {
    var options = {
        inline: true,
        toggleOnDblclick: false,
        movable: false,
        rotatable: false,
        scalable: false,
        zoomable: false,
        navbar: false,
        toolbar: false,
        url: 'data-original',
    };

    const viewer = new Viewer(this, options).show();
});

window.datetimepicker = {
    date: function () {
        var options = {
            allowInput: true,
            dateFormat: "d/m/Y",
            disableMobile: true,
            onChange: function(selectedDates, dateStr, instance) {
                if ( $(instance.element).hasClass("goto") ) {
                    var date = dateStr.split('/').join('-');
                    var temp = date.split('-');
                    var newDate = temp[2] + '-' + temp[1] + '-' + temp[0];

                    var url = $(instance.element).attr('data-url');

                    window.location.href = url + "?date=" + newDate;
                };
            }
        };

        $(".datepicker:not([readonly],[disabled])").flatpickr(options);
    },

    time: function () {
        var options = {
            allowInput: true,
            dateFormat: "H:i",
            disableMobile: true,
            enableTime: true,
            noCalendar: true,
            time_24hr: true
        };

        $(".timepicker:not([readonly],[disabled])").flatpickr(options);
    },

    datetime: function () {
        var options = {
            allowInput: true,
            dateFormat: "d/m/Y, H:i",
            disableMobile: true,
            enableTime: true,
            time_24hr: true
        };

        $(".datetimepicker:not([readonly],[disabled])").flatpickr(options);
    },

    daterange: function () {
        var options = {
            allowInput: true,
            dateFormat: "d/m/Y",
            disableMobile: true,
            mode: "range"
        };

        $(".daterangepicker:not([readonly],[disabled])").flatpickr(options);
    }
}

window.startDatetimePicker = function () {
    window.datetimepicker.date();
    window.datetimepicker.time();
    window.datetimepicker.datetime();
    window.datetimepicker.daterange();
}
window.startDatetimePicker();

$(function () {
    'use strict';

    // Apply the filter
    var filter = $('input#filterinput'), clearfilter = $('input#clearfilter');
    $('ul#mylist').listfilter({
        'filter': filter,
        'clearlink': clearfilter,
        'alternate': true,
        'alternateclass': 'other'
    });
});

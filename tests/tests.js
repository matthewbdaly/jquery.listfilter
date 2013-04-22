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

    // Test alternate class applied correctly
    test("Alternate class applied correctly", function () {

        // Declare the variables used
        var evenitems, item, odditems;

        // Get all the even list items
        evenitems = $('ul#mylist li:even');

        // Get just the odd-numbered items (zero-indexed, so will be every second item
        odditems = $('ul#mylist li:odd');

        // Assert that each odd item has a class of 'other'
        odditems.each(function () {
            ok($(this).hasClass('other'), "Odd item has a class of 'other'");
        });

        // Assert that each even item does not have a class of 'other'
        evenitems.each(function () {
            ok(!$(this).hasClass('other'), "Event item does not have a class of 'other'");
        });
    });
});

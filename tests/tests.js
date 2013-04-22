$(function () {
    'use strict';

    // Apply the filter
    var myfilter, filter = $('input#filterinput'), clearfilter = $('input#clearfilter');
    myfilter = $('ul#mylist').listfilter({
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
        evenitems = myfilter.children('li:even');

        // Get just the odd-numbered items (zero-indexed, so will be every second item
        odditems = myfilter.children('li:odd');

        // Assert that each odd item has a class of 'other'
        odditems.each(function () {
            ok($(this).hasClass('other'), "Odd item has a class of 'other'");
        });

        // Assert that each even item does not have a class of 'other'
        evenitems.each(function () {
            ok(!$(this).hasClass('other'), "Event item does not have a class of 'other'");
        });
    });

    // Test filter
    test("Test filter works as expected", function () {

        // Test filter with no content
        ok(myfilter.children('li:visible').length === 5, "All 5 items visible");

        // Enter text in the filter
        filter.val('T').change();

        // Assert that only two elements are now visible
        ok(myfilter.children('li:visible').length === 2, "Only 2 items visible");
        filter.val('').change();

        // Enter more text
        filter.val('o').change();

        // Assert that only thee elements are now visible
        ok(myfilter.children('li:visible').length === 3, "Only 3 items visible");
        filter.val('').change();

        // Assert that all 4 are again visible
        ok(myfilter.children('li:visible').length === 5, "All 5 items visible");
    });

    // Test filter and alternate together
    test("Test filter and alternate together work as expected", function () {

        // Test that all 5 items are visible
        ok(myfilter.children('li:visible').length === 5, "All 5 items visible");
        ok(myfilter.children('li:hidden').length === 0, "No items hidden");

        // Test classes applied correctly
        ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
        ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");

        // Enter text in the filter
        filter.val('e').change();

        // Test that three items are visible and two are not
        ok(myfilter.children('li:visible').length === 3, "Only 3 items visible");
        ok(myfilter.children('li:hidden').length === 2, "Only 2 items hidden");

        // Test classes applied correctly
        ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
        ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");

        // Remove text in the filter
        filter.val('').change();

        // Test that all 5 items are visible
        ok(myfilter.children('li:visible').length === 5, "All 5 items visible");
        ok(myfilter.children('li:hidden').length === 0, "No items hidden");

        // Test classes applied correctly
        ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
        ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");
    });

    // Test clear
    test("Test filter cleared", function () {

        // Enter text in the filter
        filter.val('T').change();

        // Assert that only two elements are now visible
        ok(myfilter.children('li:visible').length === 2, "Only 2 items visible");

        // Clear the filter
        clearfilter.trigger('click');

        // Now assert 5 elements visible
        ok(myfilter.children('li:visible').length === 5, "All 5 items visible");
    });
});

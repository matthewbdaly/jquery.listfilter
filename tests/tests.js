$(function () {
    'use strict';

    // Apply the filter
    var myfilter, mytablefilter, filter = $('input#filterinput'), clearfilter = $('input#clearfilter'), tablefilter = $('input#tablefilterinput'), tableclearfilter = $('input#tableclearfilter');
    myfilter = $('ul#mylist').listfilter({
        'filter': filter,
        'clearlink': clearfilter,
        'alternate': true,
        'alternateclass': 'other',
        'callback': function () {
            window.callback += 1;
        }
    });
    mytablefilter = $('table#mytable').listfilter({
        'filter': tablefilter,
        'clearlink': tableclearfilter,
        'alternate': true,
        'alternateclass': 'other',
        'callback': function () {
            window.callback += 1;
        }
    });

    // Test alternate class applied correctly
    test("Alternate class applied correctly", function () {

        // Declare the variables used
        var evenitems, odditems;

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

    // Test callback function
    test("Test callback function", function () {

        // Set window.callback to 0
        window.callback = 0;

        // Enter text in the filter
        filter.val('T').change();

        // Assert the value of window.callback is 1
        equal(window.callback, 1, 'Callback function fired');

        // Clear the filter
        clearfilter.trigger('click');

        // Assert the value of window.callback is 2
        equal(window.callback, 2, 'Callback function fired');
    });

    // Test refresh
    test("Test refresh after items added or removed", function () {

        // This test needs to run last, as otherwise it mucks up the other tests
        stop();
        setTimeout(function () {

            // Restart the test after 1 second
            start();

            // Test classes applied correctly and length correct
            ok(myfilter.children('li:visible').length === 5, "All 5 items visible");
            ok(myfilter.children('li:hidden').length === 0, "No items hidden");
            ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
            ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");

            // Append a new item and refresh the listview
            $('ul#mylist').append('<li>Six</li>');
            myfilter.listfilter("refresh");

            // Test length
            ok(myfilter.children('li:visible').length === 6, "All 6 items visible");
            ok(myfilter.children('li:hidden').length === 0, "No items hidden");

            // Test classes
            ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
            ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");

            // Test filter
            filter.val('i').change();
            ok(myfilter.children('li:visible').length === 2, "Only 2 items visible");
            ok(myfilter.children('li:hidden').length === 4, "4 items hidden");
            ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
            ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");
            filter.val('').change();

            // Now remove some items and refresh the listview
            $('ul#mylist li:nth-child(6)').remove();
            $('ul#mylist li:nth-child(5)').remove();
            myfilter.listfilter("refresh");

            // Test length and classes
            ok(myfilter.children('li:visible').length === 4, "All 4 items visible");
            ok(myfilter.children('li:hidden').length === 0, "No items hidden");
            ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
            ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");

            // Test filter
            filter.val('r').change();
            ok(myfilter.children('li:visible').length === 2, "Only 2 items visible");
            ok(myfilter.children('li:hidden').length === 2, "2 items hidden");
            ok(myfilter.children('li:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
            ok(!myfilter.children('li:visible:even').hasClass('other'), "Even items do not have a class of 'other'");
            filter.val('').change();
        }, 1000);
    });

    // Separate tests for tables
    // Test alternate class applied correctly
    test("Alternate class applied correctly for tables", function () {

        // Declare the variables used
        var evenitems, odditems;

        // Get all the even list items
        evenitems = mytablefilter.find('tr:even');

        // Get just the odd-numbered items (zero-indexed, so will be every second item
        odditems = mytablefilter.find('tr:odd');

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
    test("Test filter works as expected for tables", function () {

        // Test filter with no content
        ok(mytablefilter.find('tr:visible').length === 5, "All 5 items visible");

        // Enter text in the filter
        tablefilter.val('T').change();

        // Assert that only two elements are now visible
        ok(mytablefilter.find('tr:visible').length === 2, "Only 2 items visible");
        tablefilter.val('').change();

        // Enter more text
        tablefilter.val('o').change();

        // Assert that only thee elements are now visible
        ok(mytablefilter.find('tr:visible').length === 3, "Only 3 items visible");
        tablefilter.val('').change();

        // Assert that all 4 are again visible
        ok(mytablefilter.find('tr:visible').length === 5, "All 5 items visible");
    });

    // Test filter and alternate together
    test("Test filter and alternate together work as expected for tables", function () {

        // Test that all 5 items are visible
        ok(mytablefilter.find('tr:visible').length === 5, "All 5 items visible");
        ok(mytablefilter.find('tr:hidden').length === 0, "No items hidden");

        // Test classes applied correctly
        ok(mytablefilter.find('tr:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
        ok(!mytablefilter.find('tr:visible:even').hasClass('other'), "Even items do not have a class of 'other'");

        // Enter text in the filter
        tablefilter.val('e').change();

        // Test that three items are visible and two are not
        ok(mytablefilter.find('tr:visible').length === 3, "Only 3 items visible");
        ok(mytablefilter.find('tr:hidden').length === 2, "Only 2 items hidden");

        // Test classes applied correctly
        ok(mytablefilter.find('tr:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
        ok(!mytablefilter.find('tr:visible:even').hasClass('other'), "Even items do not have a class of 'other'");

        // Remove text in the filter
        tablefilter.val('').change();

        // Test that all 5 items are visible
        ok(mytablefilter.find('tr:visible').length === 5, "All 5 items visible");
        ok(mytablefilter.find('tr:hidden').length === 0, "No items hidden");

        // Test classes applied correctly
        ok(mytablefilter.find('tr:visible:odd').hasClass('other'), "Odd items have a class of 'other'");
        ok(!mytablefilter.find('tr:visible:even').hasClass('other'), "Even items do not have a class of 'other'");
    });

    // Test clear
    test("Test filter cleared for tables", function () {

        // Enter text in the filter
        tablefilter.val('T').change();

        // Assert that only two elements are now visible
        ok(mytablefilter.find('tr:visible').length === 2, "Only 2 items visible");

        // Clear the filter
        tableclearfilter.trigger('click');

        // Now assert 5 elements visible
        ok(mytablefilter.find('tr:visible').length === 5, "All 5 items visible");
    });

    // Test callback function
    test("Test callback function for tables", function () {

        // Set window.callback to 0
        window.callback = 0;

        // Enter text in the filter
        tablefilter.val('T').change();

        // Assert the value of window.callback is 1
        equal(window.callback, 1, 'Callback function fired');

        // Clear the filter
        tableclearfilter.trigger('click');

        // Assert the value of window.callback is 2
        equal(window.callback, 2, 'Callback function fired');
    });
});

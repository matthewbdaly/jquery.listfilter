Listfilter
----------

[![Build Status](https://travis-ci.org/matthewbdaly/jquery.listfilter.png?branch=master)](https://travis-ci.org/matthewbdaly/jquery.listfilter)

Listfilter is a jQuery plugin for filtering HTML lists or tables. Check out the [demo](http://matthewbdaly.github.io/jquery.listfilter/) to see the plugin in action and try the [tests](http://matthewbdaly.github.io/jquery.listfilter/tests/)

How do I use it?
================

Here's an example:

    $('ul#mylist').listfilter({
        'filter': $('input#mylistfilter'),
        'clearlink': $('a#clearmylistfilter')
    });

Installation
============

It's now available via NPM:

    npm install listfilter


Creating a filtered list
========================

To create a filtered list, you need two things as a minimum:

* An HTML list or table to filter
* A text input to enter the text to filter by into

Assuming that the list you want to filter has an ID of mylist and the filter is an input with an id of myfilter, the following would set up a listfilter:

    $('ul#mylist').listfilter({
        'filter': $('input#myfilter')
    });

This is the bare minimum you need to create a listfilter, but there are other settings.

Settings
========

The following settings can be passed through on initialisation:

* **filter** - The input element you wish users to enter text into in order to filter. If none is provided, one will be added automatically.
* **clearlink** (Optional) - A clickable element, such as a button or link. When clicked, this will clear the text in the filter and reset the list to its default state. If none is provided, one will be added automatically.
* **alternate** (Optional) - Sometimes you may want to differentiate between adjacent elements in a list by alternating the CSS to improve readability. If alternate is set to true, a class will be applied to every second element in the list. This will remain consistent even when filtered.
* **alternateclass** (Optional) - If alternate is set to true, the default class to be applied to every other element is 'alternate'. If you don't want to use this, you can pass through an alternative class to apply to alternate elements
* **callback** (Optional) - A function that is called after the filtering is complete
* **nofilter** (Optional) - You may want to exclude certain elements from filtering, such as the first row in a table. You can apply the default class of `nofilter` to an element to do this, or you can specify your own nofilter class

Refresh
=======

If you wish to programmatically add or remove list items, and are using the alternate option, you'll need to call this to ensure the alternate class is applied correctly afterwards. You can call it as follows:

    $('ul#mylist').listfilter("refresh");

Tests
=====

Listfilter comes with its own QUnit test suite. You can find this in the tests folder . It's set up to be run either with Testem, or with `grunt test` (you'll need to run `npm install` first to install the dependencies). Running `grunt test` will also run JSLint.

License
=======

GPLv2

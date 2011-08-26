jQuery FormWatch: easily monitor changes in form data.

What it does
============

This plugin lets you watch a form for data changes. This lets you, for example, easily notify users when they have unsaved changes (particularly important in single-page apps).

Usage
=====

Monitor the form you're interested in:

    $('form').watch();
  
Then bind to the watch events:

    // 'modified' - Fired when data changes.
    $('form').bind('modified', function() {
      unsavedChanges.show();
    });
  
    // 'reverted' - Fired when data changes back to the initial state.
    $('form').bind('reverted', function() {
      unsavedChanges.hide();
    });

Why?
====

Binding to individual form elements is a pain, and `form.change()` only fires on blur. This plugin lets you respond to changes in a form's data in real time.
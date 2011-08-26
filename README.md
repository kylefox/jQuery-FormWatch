jQuery FormWatch: easily monitor changes in form data.

What it does
============

This plugin lets you watch a form for data changes. This lets you, for example, easily notify users when they have unsaved changes (particularly important in single-page apps).

You can [view the demo](http://dl.dropbox.com/u/780754/jQuery-FormWatch/demo/index.html) to see the basic idea in action.

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

Accessing changed data
----------------------
    
Event handlers are passed three parameters:

* `newData` : The new (current) form data.
* `oldData` : The previous form data.
* `originalData` : Form data initially present when `.watch()` was called.

It's **highly recommended** you use [jQuery BBQ](https://github.com/cowboy/jquery-bbq/) if you plan to use these parameters in your event handlers. BBQ will convert the parameters to objects, rather than the default strings (which aren't very useful).

For example:
  
    // Assume this form has a single field called `faveAnimal`
    $('form').bind('modified', function(newData, oldData, originalData) {
      console.log("Your fave animal changed from " + oldData.faveAnimal + " to " + newData.faveAnimal);
    });
  
Note that FormWatch *does not indicate which specific form fields have changed.* If you need this kind of functionality, simply use [jQuery Diff](http://plugins.jquery.com/project/jquery-diff) in your event handlers.

Why?
====

Binding to individual form elements is a pain, and `form.change()` only fires on blur. This plugin lets you respond to changes in a form's data in real time.

Bugs, feedback, or patches?
===========================

Why, just use the [issue tracker](https://github.com/kylefox/jQuery-FormWatch/issues) right here on GitHub!
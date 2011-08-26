/*
    jQuery FormWatch: easily monitor changes in form data.
    https://github.com/kylefox/jQuery-FormWatch
    Version 0.1
*/
(function($) {
  
  function _eventArgs() {
    return $.map(arguments, function(arg) {
      if('deparam' in $) {
        return $.deparam(arg);
      }
      return arg;
    });
  }
  
  function _checkChange() {
    var form = $(this),
        oldData = form.data('oldData'),
        originalData = form.data('originalData'),
        newData = form.serialize(),
        args = _eventArgs(newData, oldData, originalData);
    if(newData !== oldData) {
      form.trigger('modified', args);
      form.data('dirty', true);
    }
    if(form.data('dirty') && newData === originalData) {
      form.trigger('reverted', args);
      form.data('dirty', false);
    }
    form.data('oldData', newData);
  };
  
  function _watch(form) {
    var formData = form.serialize();
    form.bind('change', _checkChange);
    form.bind('keydown', _checkChange);
    form.bind('keyup', _checkChange);
    form.data('dirty', false);
    form.data('oldData', formData);
    form.data('originalData', formData);
  };
  
  function _unwatch(form) {
    form.unbind('change', _checkChange);
    form.unbind('keydown', _checkChange);
    form.unbind('keyup', _checkChange);
    form.data('dirty', null);
    form.data('oldData', null);
    form.data('originalData', null);
  }
  
  $.fn.watch = function() {
    $(this).each(function(idx, elm) {
      _watch($(elm));
    });
  };
  
  $.fn.unwatch = function() {
    $(this).each(function(idx, elm) {
      _unwatch($(elm));
    });
  };
  
})(jQuery);
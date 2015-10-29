/*
    jQuery FormWatch: easily monitor changes in form data.
    https://github.com/kylefox/jQuery-FormWatch
    Version 0.2
*/
(function($) {
  var timeoutId;
  var delay = 0;

  function _eventArgs() {
    return $.map(arguments, function(arg) {
      if('deparam' in $) {
        return $.deparam(arg);
      }
      return arg;
    });
  }

  function _checkChangeWithTimeout() {
    if (typeof timeoutId != 'undefined') {
      clearTimeout(timeoutId)
    }

    var that = this
    timeoutId = setTimeout(function() {
      _checkChange.apply(that)
    }, delay)
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
    form.on('change', _checkChangeWithTimeout);
    form.on('keydown', _checkChangeWithTimeout);
    form.on('keyup', _checkChangeWithTimeout);
    form.data('dirty', false);
    form.data('oldData', formData);
    form.data('originalData', formData);
  };

  function _unwatch(form) {
    form.off('change', _checkChangeWithTimeout);
    form.off('keydown', _checkChangeWithTimeout);
    form.off('keyup', _checkChangeWithTimeout);
    form.data('dirty', null);
    form.data('oldData', null);
    form.data('originalData', null);
  }

  $.fn.watch = function(_delay) {
    if (_delay) {
      delay = _delay
    }

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

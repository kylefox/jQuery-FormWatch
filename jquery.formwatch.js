(function($) {
  
  function _checkChange() {
    var form = $(this),
        oldData = form.data('oldData'),
        originalData = form.data('originalData'),
        newData = form.serialize();
    if(newData !== oldData) {
      form.trigger('modified');
      form.data('dirty', true);
    }
    if(form.data('dirty') && newData === originalData) {
      form.trigger('reverted');
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
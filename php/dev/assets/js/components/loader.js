jQuery(function () {
  'use strict';

  jQuery('.loader__container').on('click touchend', '.loader', function () {
    if (jQuery('.loader__spinner', this).length <= 0) {
      jQuery('.loader__label', this)
        .append('<span class="loader__spinner"><span></span>' +
          '<span></span><span></span></span>');
      jQuery(this).addClass('is-active');
    }
  });

});

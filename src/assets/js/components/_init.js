'use strict';

var zanata = (function () {
  var z = {};

  z.tooltip = function (el) {
    jQuery(el).tooltip({
      placement: 'auto bottom',
      container: 'body',
      delay: {
        show: '500',
        hide: '100'
      }
    });
  };

  z.tooltipRefresh = function (el, newValue) {
    jQuery(el)
      .tooltip('hide')
      .attr('data-original-title', newValue)
      .tooltip('fixTitle')
      .tooltip('show');
  };

  return z;
}());

jQuery(function () {
  zanata.tooltip('[title]');
  jQuery('body').zanataForm();
});

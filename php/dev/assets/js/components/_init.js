var zanata = (function () {
  var z = {};

  z.tooltip = function(selector) {
    jQuery(selector).tooltip({
      placement: 'auto bottom',
      container: 'body',
      delay: {
         show: '500',
         hide: '100'
      }
    });
  };

  z.tooltipRefresh = function(selector, newValue) {
    jQuery(selector).tooltip('hide')
               .attr('data-original-title', newValue)
               .tooltip('fixTitle')
               .tooltip('show');
  };

  return z;
}());

jQuery(function () {
  zanata.tooltip('[title]');
});

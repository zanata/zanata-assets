'use strict';

// create the root namespace and making sure we're not overwriting it
var zanata = zanata || {};

zanata.createNS = function (namespace) {
  var nsparts = namespace.split('.');
  var parent = zanata;

  // we want to be able to include or exclude the root namespace so we strip
  // it if it's in the namespace
  if (nsparts[0] === 'zanata') {
    nsparts = nsparts.slice(1);
  }

  // loop through the parts and create a nested namespace if necessary
  for (var i = 0; i < nsparts.length; i++) {
    var partname = nsparts[i];
    // check if the current parent already has the namespace declared
    // if it isn't, then create it
    if (typeof parent[partname] === 'undefined') {
        parent[partname] = {};
    }
    // get a reference to the deepest element in the hierarchy so far
    parent = parent[partname];
  }
  // the parent is now constructed with empty namespaces and can be used.
  // we return the outermost namespace
  return parent;
};

zanata.createNS('zanata.tooltip');

zanata.tooltip = (function ($) {

  // Private methods
  var init = function (el) {
    $(el).tooltip({
      placement: 'auto bottom',
      container: 'body',
      delay: {
        show: '500',
        hide: '100'
      }
    });
  };

  var refresh = function (el, newTitle) {
    $(el)
      .tooltip('hide')
      .attr('data-original-title', newTitle)
      .tooltip('fixTitle')
      .tooltip('show');
  };

  // public API
  return {
    init: init,
    refresh: refresh
  };

})(jQuery);

jQuery(function () {
  zanata.tooltip.init('[title]');
});

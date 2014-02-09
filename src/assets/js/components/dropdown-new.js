jQuery(function() {

  var collapseActiveDropdowns,
      toggleThisCollapseOthers;
      // mouseOutTimer;

  collapseActiveDropdowns = function () {
    jQuery('.js-dropdown.is-active .js-dropdown__toggle').click();
  };

  toggleThisCollapseOthers = function (e) {
    e.preventDefault();
    jQuery(this).blur();
    var $dropdown = jQuery(this).parent('.js-dropdown');
    // $dropdown.removeClass('is-hover');
    jQuery('.js-dropdown.is-active').not($dropdown)
                               .removeClass('is-active')
                               .parents('.js-dropdown__container')
                               .removeClass('is-active');
    $dropdown.toggleClass('is-active').parents('.js-dropdown__container')
                                      .toggleClass('is-active');
    e.stopPropagation();
  };

  // Don't toggle dropdown when clicking links inside it
  jQuery('.js-dropdown__toggle a, .js-dropdown__content').bind('click', function(e) {
    e.stopPropagation();
  });

  jQuery(document).bind('click touchend', collapseActiveDropdowns);
  jQuery(document).on('click touchend', '.js-dropdown__toggle', toggleThisCollapseOthers);

});

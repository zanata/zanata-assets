jQuery(function () {
  'use strict';

  var collapseActiveDropdowns,
      toggleThisCollapseOthers,
      collapseActiveDropdownsOld,
      toggleThisCollapseOthersOld;

  collapseActiveDropdowns = function () {
    jQuery('.js-dropdown.is-active .js-dropdown__toggle').click();
  };

  toggleThisCollapseOthers = function (e) {
    e.preventDefault();
    jQuery(this).blur();
    var $dropdown = jQuery(this).parent('.js-dropdown');
    // $dropdown.removeClass('is-hover');
    jQuery('.js-dropdown.is-active')
      .not($dropdown)
      .removeClass('is-active')
      .parents('.js-dropdown__container')
      .removeClass('is-active');
    $dropdown.toggleClass('is-active')
      .parents('.js-dropdown__container')
      .toggleClass('is-active');
    e.stopPropagation();
  };

  // Add this back when old dropdowns are removed

  // Don't toggle dropdown when clicking links inside it
  jQuery('.js-dropdown__toggle a, .js-dropdown__content')
    .bind('click', function (e) {
      e.stopPropagation();
    });

  jQuery(document)
    .bind('click', collapseActiveDropdowns);

  jQuery(document)
    .on('click', '.js-dropdown__toggle', toggleThisCollapseOthers);


  // TODO: All this can be deleted when old components are removed - in 3.4

  collapseActiveDropdownsOld = function () {
    jQuery('.dropdown.is-active .dropdown__toggle').click();
  };

  toggleThisCollapseOthersOld = function (e) {

    e.preventDefault();

    jQuery(this).blur();

    var $dropdown = jQuery(this).parent('.dropdown');

    jQuery('.dropdown.is-active')
      .not($dropdown)
      .removeClass('is-active')
      .parents('.dropdown__container')
      .removeClass('is-active');

    $dropdown.toggleClass('is-active')
      .parents('.dropdown__container')
      .toggleClass('is-active');
    e.stopPropagation();
  };

  // Don't toggle dropdown when clicking links inside it
  jQuery('.dropdown__toggle a, .dropdown__content')
    .not('.js-dropdown__toggle')
    .bind('click', function (e) {
      e.stopPropagation();
    });

  jQuery(document)
    .bind('click', collapseActiveDropdownsOld);
  jQuery('.dropdown__toggle')
    .not('.js-dropdown__toggle')
    .on('click', toggleThisCollapseOthersOld);

});

jQuery(function () {
  'use strict';

  jQuery('.js-tabs').on('click touchend', '.js-tabs-nav a', function (e) {
    e.preventDefault();
    if (!jQuery(this).parent().hasClass('is-active')) {
      var $this = jQuery(this),
          targetHash = $this.attr('href'),
          targetID = targetHash.replace('#', ''),
          $parent = $this.parents('.js-tabs');
      // Remove all is-active classes
      $parent
        .find('.js-tabs-content li, .js-tabs-nav li')
        .removeClass('is-active');
      // Add relevant is-active classes
      $this.blur().parent().addClass('is-active');
      // Add hashed class so we can remove ID to change the hash
      jQuery(targetHash)
        .addClass('is-active is-hashed')
        .removeAttr('id');
      // Change URL hash
      window.location.hash = targetHash;
      // Add ID back
      $parent
        .find('.is-hashed')
        .attr('id', targetID)
        .removeClass('is-hashed');
    }
  });

  // Search for hash in url and change to that tab
  if (window.location.hash && jQuery('.js-tabs')) {
    var targetHash = window.location.hash,
        $target = jQuery(targetHash),
        $parent = $target.parents('.js-tabs');
    $parent
      .find('.js-tabs-content li, .js-tabs-nav li')
      .removeClass('is-active');
    jQuery('.js-tabs a[href="' + targetHash + '"]')
      .parent()
      .addClass('is-active');
    $target.addClass('is-active');
  }

});

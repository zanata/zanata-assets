jQuery(function () {
  jQuery(document).on('click touchend', '.js-modal__show', function() {
    var modalTarget = jQuery(this).attr('data-target');
    jQuery(modalTarget).addClass('is-active');
    jQuery('#container').addClass('is-modal');
  });
  jQuery(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      jQuery('.modal').removeClass('is-active');
      jQuery('#container').removeClass('is-modal');
    }
  });
});

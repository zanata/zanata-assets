$(function() {

  var collapseActiveDropdowns,
      toggleThisCollapseOthers,
      mouseOutTimer;

  collapseActiveDropdowns = function () {
    $('.js-dropdown.is-active .js-dropdown__toggle').click();
  };

  toggleThisCollapseOthers = function (e) {
    e.preventDefault();
    $(this).blur();
    var $dropdown = $(this).parent('.js-dropdown');
    $dropdown.removeClass('is-hover');
    $('.js-dropdown.is-active').not($dropdown).removeClass('is-active')
                            .parents('.js-dropdown__container').removeClass('is-active');
    $dropdown.toggleClass('is-active').parents('.js-dropdown__container').toggleClass('is-active');
    e.stopPropagation();
  };

  // Don't toggle dropdown when clicking links inside it
  $('.js-dropdown__toggle a, .js-dropdown__content').bind('click', function(e) {
    e.stopPropagation();
  });

  $(document).bind('click', collapseActiveDropdowns);
  $(document).on('click touchstart', '.js-dropdown__toggle', toggleThisCollapseOthers);

  $(document).on('mouseenter', '.js-dropdown', function() {
    clearTimeout(mouseOutTimer);
    $(this).addClass('is-hover');
  });
  $(document).on('mouseleave', '.js-dropdown', function() {
    var that = $(this);
    mouseOutTimer = setTimeout(function(){
               that.removeClass('is-hover');
             },300);
  });

});

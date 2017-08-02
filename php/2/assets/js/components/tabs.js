$(function () {
  $('.js-tabs').on('click', '.js-tabs-nav a', function(e) {
    e.preventDefault();
    if (!$(this).parent().hasClass('is-active')) {
      // Remove all is-active classes
      $(this).parents('.js-tabs')
        .find('.js-tabs-content li, .js-tabs-nav li')
        .removeClass('is-active');
      // Add relevant is-active classes
      $(this).parent().addClass('is-active');
      $($(this).attr('href'))
        .addClass('is-active');
    }
  });
});

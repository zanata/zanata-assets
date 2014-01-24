$(function () {
  $(document).on('click touchend', '.js-modal__show', function() {
    var modalTarget = $(this).attr('data-target');
    console.log($(modalTarget), modalTarget);
    $(modalTarget).addClass('is-active');
    $('#container').addClass('is-modal');
  });
  $(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.modal').removeClass('is-active');
      $('#container').removeClass('is-modal');
    }
  });
});

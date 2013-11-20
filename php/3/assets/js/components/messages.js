$(function () {
  $(document).on('click', '.js-message-remove', function(e) {
    var $this = $(this),
        $parent = $this.parents('.message--removable');
    e.preventDefault();
    if($parent.hasClass('is-active')) {
      $parent.removeClass('is-active');
      setTimeout(function() {
        $parent.remove();
      }, 300);
    }
    else {
      $parent.addClass('is-removed');
      setTimeout(function() {
        $parent.remove();
      }, 300);
    }
  });
});

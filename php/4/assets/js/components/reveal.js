$(function() {
  $('.js-reveal__click').on('click', function() {
    var $revealTarget = $($(this).attr('data-target')),
        $revealTargetInput = $revealTarget.find('.js-reveal__target__input');
    $(this).toggleClass('is-active');
    $revealTarget.toggleClass('is-active');
    if ($revealTarget.hasClass('is-active') && $revealTargetInput) {
      console.log('True');
      setTimeout(function() {
        $revealTargetInput.focus();
      }, 100);
    }
    else if($revealTargetInput) {
      $revealTargetInput.blur();
      console.log('False');
    }
  });
});

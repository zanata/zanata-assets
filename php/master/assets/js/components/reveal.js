$(function() {
  $('.js-reveal__show').on('click', function() {
    var $revealTarget = $($(this).attr('data-target')),
        $revealTargetInput = $revealTarget.find('.js-reveal__target__input'),
        $revealParent = $(this).parents('.js-reveal');
    $(this).addClass('is-hidden');
    $revealParent.addClass('is-active');
    $revealTarget.toggleClass('is-active');
    setTimeout(function() {
      $revealTargetInput.focus();
    }, 100);
  });
  $('.js-reveal__reset').on('click', function() {
    var $revealTarget = $($(this).attr('data-target')),
        $revealTargetInput = $revealTarget.find('.js-reveal__target__input');
    $revealTargetInput.val('').focus();
    $(this).addClass('is-hidden');
  });
  $('.js-reveal__cancel').on('click', function() {
    var $revealTarget = $($(this).attr('data-target')),
        $revealTargetInput = $revealTarget.find('.js-reveal__target__input'),
        $revealParent = $(this).parents('.js-reveal');
    $revealTarget.removeClass('is-active');
    $revealTargetInput.blur();
    $revealTargetInput.val('');
    $revealParent.find('.js-reveal__reset').addClass('is-hidden');
    $revealParent.find('.js-reveal__show').removeClass('is-hidden').focus();
  });
  $('.js-reveal__target__input').on('keyup', function(e) {
    var $revealParent = $(this).parents('.js-reveal'),
        $revealReset = $revealParent.find('.js-reveal__reset'),
        $revealCancel = $revealParent.find('.js-reveal__cancel');
    if ($(this).val() !== '') {
      $revealReset.removeClass('is-hidden');
    }
    else {
      $revealReset.addClass('is-hidden');
    }
    if (e.keyCode === 27) {
      $revealCancel.click();
    }
  });
});

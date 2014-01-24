$(function() {
  $('.js-reveal__show').on('click touchend', function() {
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
  $('.js-reveal__toggle').on('click touchend', function(e) {
    var $revealTarget = $($(this).attr('data-target')),
        $revealTargetInput = $revealTarget.find('.js-reveal__target__input'),
        $revealParent = $(this).parents('.js-reveal'),
        $revealText = $(this).find('.js-reveal__toggle__text'),
        revealTextValue = $revealText.text(),
        revealToggleValue = $revealText.attr('data-toggle-value'),
        revealTitle = $(this).attr('title') || $(this).attr('data-original-title'),
        revealToggleTitle = $(this).attr('data-toggle-title');
    // Label need to register the click so it applies to the checkbox or radio
    // it is attached to
    if(!$(event.target).is('label')) {
      e.preventDefault();
    }
    $(this).toggleClass('is-active');
    $revealParent.toggleClass('is-active');
    $revealTarget.toggleClass('is-active is-hidden');
    if (revealToggleTitle && revealTitle) {
      $(this).attr('data-toggle-title', revealTitle);
      zanata.tooltipRefresh($(this), revealToggleTitle);
    }
    if (revealTextValue && revealToggleValue) {
      $revealText.text(revealToggleValue);
      $revealText.attr('data-toggle-value', revealTextValue);
    }
    setTimeout(function() {
      $revealTargetInput.focus();
    }, 100);
  });


  $('.js-reveal__reset').on('click touchend', function() {
    var $revealTarget = $($(this).attr('data-target')),
        $revealTargetInput = $revealTarget.find('.js-reveal__target__input');
    $revealTargetInput.val('').focus();
    $(this).addClass('is-hidden');
  });
  $('.js-reveal__cancel').on('click touchend', function() {
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

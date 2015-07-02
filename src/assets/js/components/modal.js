'use strict';

zanata.createNS('zanata.modal');

zanata.modal = (function ($) {

  var show = function (el) {
    var $el = $(el);
    if ($el.parent().is('body')) {
      // TODO: Remove when old template is removed
      $el.wrap('<div class="new-zanata new-zanata-base"></div>');
      $el.addClass('is-active');
    }
    else {
      $el.before('<div id="' + $el.attr('id') + '-placeholder"/>');
      $el.appendTo('body');
      // TODO: Remove when old template is removed
      $el.wrap('<div class="new-zanata new-zanata-base"></div>');
      // Allow this to animate in
      setTimeout(function () {
        $el.addClass('is-active is-moved');
      }, 0);
    }
    $('body').addClass('is-modal').css('padding-right', getScrollBarWidth());
  };

  var hide = function (el) {
    var $el = $(el);
    $el.removeClass('is-active');

    if ($el.hasClass('is-moved')) {
      var elPlaceholder = '#' + $el.attr('id') + '-placeholder';
      setTimeout(function () {
        $el.unwrap(); // TODO: Remove when old template is removed
        $el.appendTo(elPlaceholder).unwrap().removeClass('is-moved');
      }, 300);
    }

    $('body').removeClass('is-modal').removeAttr('style');
  };

  var init = function () {

    $(document).on('click', '[data-toggle="modal"]', function () {
      var modalTarget = $(this).attr('data-target');
      $(modalTarget).trigger('show.zanata.modal');
    });

    $(document).on('click', '.is-modal', function (e) {
      if ($(e.target).not('.modal__dialog') &&
        !$(e.target).parents('.modal__dialog').length) {
        $('.modal.is-active').trigger('hide.zanata.modal');
      }
    });

    $(document).on('keyup', function (e) {
      if (e.keyCode === 27) {
        e.stopPropagation();
        $('.modal.is-active').trigger('hide.zanata.modal');
      }
    });

    $(document).on('click', '[data-dismiss="modal"]', function () {
      $(this).parents('.modal.is-active').trigger('hide.zanata.modal');
    });

    $(document).on('hide.zanata.modal', function (e) {
      hide(e.target);
    });

    $(document).on('show.zanata.modal', function (e) {
      show(e.target);
    });

  };

  function getScrollBarWidth () {
    var $outer = $('<div>').css({visibility: 'hidden', width: 100,
          overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'})
          .appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
  }

  // public API
  return {
    init: init,
    show: show,
    hide: hide
  };

})(jQuery);

jQuery(function () {
  zanata.modal.init();
});

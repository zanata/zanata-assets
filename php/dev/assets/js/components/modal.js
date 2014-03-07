'use strict';

zanata.createNS('zanata.modal');

zanata.modal = (function ($) {

  var show = function (el) {
    var $el = $(el);
    if ($el.parent().is('body')) {
      $(el).addClass('is-active');
    }
    else {
      var $newEl = $el.clone().appendTo('body');
      $el.attr('id', $el.attr('id') + '-cloned').empty();
      // Allow this to animate in
      setTimeout(function () {
        $newEl.addClass('is-active is-clone');
      }, 0);
    }
    $('body').addClass('is-modal');
  };

  var hide = function (el) {
    var $el = $(el);
    $el.removeClass('is-active');

    if ($el.hasClass('is-clone')) {
      var elClone = '#' + $el.attr('id') + '-cloned';
      setTimeout(function () {
        $el.appendTo(elClone).unwrap().removeClass('is-clone');
      }, 300);
    }

    $('body').removeClass('is-modal');
  };

  var init = function () {

    $(document).on('click touchend', '[data-toggle="modal"]', function () {
      var modalTarget = $(this).attr('data-target');
      $(modalTarget).trigger('show.zanata.modal');
    });

    $(document).on('click touchend', '.is-modal', function (e) {
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

    $(document).on('click touchend', '[data-dismiss="modal"]', function () {
      $(this).parents('.modal.is-active').trigger('hide.zanata.modal');
    });

    $(document).on('hide.zanata.modal', function (e) {
      hide(e.target);
    });

    $(document).on('show.zanata.modal', function (e) {
      show(e.target);
    });

  };

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

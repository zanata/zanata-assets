(function ($) {
  'use strict';

  var removeModal = function ($el) {
    $el.removeClass('is-active');
    $('body').removeClass('is-modal');
  };

  $(document).on('click touchend', '[data-toggle="modal"]', function () {
    var modalTarget = $(this).attr('data-target');

    $(modalTarget).addClass('is-active');
    $('body').addClass('is-modal');
  });

  $(document).on('click touchend', '.is-modal', function (e) {
    if ($(e.target).not('.modal__dialog') &&
      !$(e.target).parents('.modal__dialog').length) {
      removeModal($('.modal.is-active'));
    }
  });

  $(document).on('keyup', function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      removeModal($('.modal.is-active'));
    }
  });

  $(document).on('click touchend', '[data-dismiss="modal"]', function () {
    removeModal($(this).parents('.modal.is-active'));
  });

  // TODO: make sure modals are at the top level of them DOM
  // If not, copy them there

})(jQuery);

'use strict';

zanata.createNS('zanata.form');

zanata.form = (function ($) {

  var formSearchInProgress = false,
      formSearchInputMouseDown = false;

  // Private methods
  function setCheckRadio ($this) {
    var $input = $this.find('.js-form__checkbox__input,.js-form__radio__input');
    if (!$input.is(':checked')) {
      $input.prop('checked', true).change();
    }
    else if ($input.attr('type') === 'checkbox') {
      $input.prop('checked', false).change();
    }
  }

  function setCheckRadioStatus ($this) {
    var $input = $this.find('.js-form__checkbox__input,.js-form__radio__input'),
        $item = $this.find('.js-form__checkbox__item, .js-form__radio__item');

    // Wait until checkbox/radio change has propagated
    setTimeout(function () {
      if ($input.is(':checked')) {
        $this.addClass('is-checked');
        $item.addClass('is-checked');
      }
      else {
        $this.removeClass('is-checked');
        $item.removeClass('is-checked');
      }
    }, 0);
  }

  function removeRadioStatus ($this) {
    var $input = $this.find('.js-form__radio__input'),
        $item = $this.find('.js-form__checkbox__item, .js-form__radio__item'),
        $radios = jQuery('[name=' + $input.attr('name') + ']')
                    .parents('.js-form__radio'),
        $items = $radios.find('.js-form__radio__item');
    setTimeout(function () {
      $radios.removeClass('is-checked');
      $items.removeClass('is-checked');
      if ($input.is(':checked')) {
        $this.addClass('is-checked');
        $item.addClass('is-checked');
      }
    }, 0);
  }

  function updateSearchProgressFlag(e) {
    var $target = $(e.target);
    formSearchInProgress =
      $target.parents('.js-form--search').length > 0 ||
      $target.hasClass('js-form--search');

    if (!formSearchInProgress && !formSearchInputMouseDown) {
      $('.js-form--search__input').blur();
    }
  }

  var appendCheckboxes = function (el) {

    var $elCheckboxes;

    el = el || 'body';
    $elCheckboxes = $(el).find('.js-form__checkbox');

    $.each($elCheckboxes, function () {
      var $this = $(this);

      if (!$this.find('.form__checkbox__item').length) {
        $this
          .append('<span class="form__checkbox__item ' +
            'js-form__checkbox__item"/>');
        setCheckRadioStatus($this);
      }

    });

  };

  var appendRadios = function (el) {

    var $elRadios;

    el = el || 'body',
    $elRadios = $(el).find('.js-form__radio');

    $.each($elRadios, function () {
      var $this = $(this);

      if (!$this.find('.form__radio__item').length) {
        $this
          .append('<span class="form__radio__item js-form__radio__item"/>');
        setCheckRadioStatus($this);
      }

    });

  };

  var enableInputLoading = function(el, callback) {
    var $el = $(el),
        $elParent = $(el).parent(),
        $loader = $('<span />')
          .addClass('js-loader form__loader loader loader--mini');

    // Add a loader if there isn't one
    if (!$elParent.find('.js-loader').length) {
      $el.addClass('form__input--load');
      $elParent.addClass('js-form__load form__load').append($loader);
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  var activateInputLoading = function(el) {
    var $elParent = $(el).parent(),
        $loader = $elParent.find('.js-loader');

    enableInputLoading(el, function() {
      zanata.loader.activate($loader);
      $elParent.addClass('is-loading');
    });
  };

  var deactivateInputLoading = function(el) {
    var $elParent = $(el).parent(),
        $loader = $elParent.find('.js-loader');

    enableInputLoading(el, function() {
      zanata.loader.deactivate($loader);
      $elParent.removeClass('is-loading');
    });
  };


  // Form Clear

  var clearFormInit = function() {

    $('.js-form__input--clear').addClass('form__input--clear')
      .parent().addClass('form__clear js-form__clear')
      .append('<button class="button--link ' +
      'form__button--clear js-form__button--clear is-hidden">' +
      '<i class="i i--remove"></i></button>');

    clearFormBindings();
  };

  var clearFormBindings = function() {

    $('.js-form__button--clear').on('click', function (e) {
      e.preventDefault();
      $(this).prev('.js-form__input--clear').val('').focus();
      $(this).addClass('is-hidden');
    });

    $('.js-form__input--clear').on('keyup', function () {
      var $this = $(this),
          val = $this.val(),
          $clearButton = $this.next('.js-form__button--clear');

      if (val !== '') {
        $clearButton.removeClass('is-hidden');
      } else {
        $clearButton.addClass('is-hidden');
      }
    });

  };

  var init = function () {

    appendCheckboxes();
    appendRadios();
    enableInputLoading();
    clearFormInit();


    $('.js-form-password-parent')
      .on('click', '.js-form-password-toggle', function (e) {

        var $passwordInput = $(this)
          .parents('.js-form-password-parent')
          .find('.js-form-password-input');

        e.preventDefault();

        if ($passwordInput.attr('type') === 'password') {
          $passwordInput.attr({
            'type': 'text',
            'autocapitalize': 'off',
            'autocomplete': 'off',
            'autocorrect': 'off',
            'spellcheck': 'false'
          });
          $(this).text('Hide');
        }
        else {
          $passwordInput.attr('type', 'password');
          $(this).text('Show');
        }

        $passwordInput.focus();
      });

    $('.js-form--search__input, .js-form--search__button').on('focus',
      function () {
        $(this).parents('.js-form--search').addClass('is-active');
      }
    );

    $('.js-form--search__input, .js-form--search__button').on('blur',
      function (e) {
        if (!formSearchInProgress) {
          $(this).parents('.js-form--search').removeClass('is-active');
        }
      }
    );

    $('.js-form--search').on('mousedown', function(e) {
      formSearchInputMouseDown =
        $(e.target).hasClass('js-form--search__input');
      updateSearchProgressFlag(e);
    });

    $(document).on('mouseup', function(e) {
      updateSearchProgressFlag(e);
      // Reset mouse down
      formSearchInputMouseDown = false;
    });

    $('.js-form__input--copyable')
      .on('mouseup', function () {
        var $this = $(this),
            thisItem = $this[0];
        if (thisItem.selectionStart === thisItem.selectionEnd) {
          $this.select();
        }
      });

    $('.js-form__checkbox').on('click', function (e) {
      e.preventDefault();
      setCheckRadio($(this));
    });

    $('.js-form__radio').on('click', function (e) {
      setCheckRadio($(this));
      e.preventDefault();
    });

    $('.js-form__checkbox__input').on('change', function (e) {
      var $parent = $(this).parents('.js-form__checkbox');
      setCheckRadioStatus($parent);
    });

    $('.js-form__radio__input').on('change', function (e) {
      var $parent = $(this).parents('.js-form__radio');
      removeRadioStatus($parent);
      setCheckRadioStatus($parent);
    });

  };

  // public API
  return {
    init: init,
    appendCheckboxes: appendCheckboxes,
    appendRadios: appendRadios,
    activateInputLoading: activateInputLoading,
    deactivateInputLoading: deactivateInputLoading
  };

})(jQuery);

jQuery(function () {
  zanata.form.init();
});

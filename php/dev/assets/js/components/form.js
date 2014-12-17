'use strict';

zanata.createNS('zanata.form');

zanata.form = (function ($) {

  var formSearchInProgress = false,
      formSearchInputMouseDown = false;

  // Private methods
  function setCheckRadio ($this) {
    var $input = $this.find('.js-form__checkbox__input,.js-form__radio__input');

    if (!$input.is(':checked')) {
      $input.prop('checked', true);
    }
    else if ($input.attr('type') === 'checkbox') {
      $input.prop('checked', false);
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
      $target.parents('.autocomplete').length > 0 ||
      $target.hasClass('autocomplete');

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

  var init = function () {

    appendCheckboxes();
    appendRadios();

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

    $('.js-form--search')
      .on('focus', '.js-form--search__input, .js-form--search__button',
        function () {
          $(this).parents('.js-form--search').addClass('is-active');
        }
      );

    $('.js-form--search')
      .on('blur', '.js-form--search__input, .js-form--search__button',
        function (e) {
          if (!formSearchInProgress) {
            $(this).parents('.js-form--search').removeClass('is-active');
          }
          // console.log(e);
        }
      );

    $('.js-form--search')
      .on('click', '.js-form--search__clear', function () {
        $(this).prev('.js-form--search__input').val('').focus();
        $(this).addClass('is-hidden');
      }
    );

    $('.js-form--search')
      .on('keyup', '.js-form--search__input', function () {
          var $this = $(this),
              val = $this.val(),
              $clearButton = $this.next('.js-form--search__clear');
          if (val !== '') {
            $clearButton.removeClass('is-hidden');
          } else {
            $clearButton.addClass('is-hidden');
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

    $(document).on('click', '.js-form__checkbox', function (e) {
      setCheckRadio($(this));
      setCheckRadioStatus($(this));
      e.preventDefault();
    });

    $(document).on('click', '.js-form__radio', function (e) {
      setCheckRadio($(this));
      removeRadioStatus($(this));
      setCheckRadioStatus($(this));
      e.preventDefault();
    });

  };

  // public API
  return {
    init: init,
    appendCheckboxes: appendCheckboxes,
    appendRadios: appendRadios
  };

})(jQuery);

jQuery(function () {
  zanata.form.init();
});

$(function () {
  $('.js-form-password-parent').on('click touchend', '.js-form-password-toggle', function(e) {
    var $passwordInput = $(this).parents('.js-form-password-parent')
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

  $('.js-form--search').on('focus', '.js-form--search__input, .js-form--search__button', function() {
    $(this).parents('.js-form--search').addClass('is-active');
  });
  $('.js-form--search').on('blur', '.js-form--search__input, .js-form--search__button', function() {
    $(this).parents('.js-form--search').removeClass('is-active');
  });
  $('.js-form__input--copyable').on('click touchend', function() {
    $(this).select();
  });

  // On load
  $.each($('.js-form__checkbox'), function() {
    $(this).append('<span class="form__checkbox__item js-form__checkbox__item"></span>');
    setCheckRadioStatus($(this));
  });

  $.each($('.js-form__radio'), function() {
    $(this).append('<span class="form__radio__item js-form__radio__item"></span>');
    setCheckRadioStatus($(this));
  });

  $(document).on('click touchend', '.js-form__checkbox', function(e) {
    setCheckRadio($(this));
    setCheckRadioStatus($(this));
    e.preventDefault();
  });

  $(document).on('click touchend', '.js-form__radio', function(e) {
    setCheckRadio($(this));
    removeRadioStatus($(this));
    setCheckRadioStatus($(this));
    e.preventDefault();
  });

  function setCheckRadio($this) {
    var $input = $this.find('.js-form__checkbox__input, .js-form__radio__input');
    if (!$input.is(':checked')) {
      $input.prop('checked', true);
    }
    else if ($input.attr('type') === 'checkbox'){
      $input.prop('checked', false);
    }
  }

  function setCheckRadioStatus($this) {
    var $input = $this.find('.js-form__checkbox__input, .js-form__radio__input'),
        $item = $this.find('.js-form__checkbox__item, .js-form__radio__item');

    // Wait until checkbox/radio change has propagated
    setTimeout(function() {
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

  function removeRadioStatus($this) {
    var $input = $this.find('.js-form__radio__input'),
        $item = $this.find('.js-form__checkbox__item, .js-form__radio__item'),
        $radios = $('[name=' + $input.attr('name') + ']').parents('.js-form__radio'),
        $items = $radios.find('.js-form__radio__item');
    setTimeout(function() {
      console.log($input.is(':checked'));
      $radios.removeClass('is-checked');
      $items.removeClass('is-checked');
      if ($input.is(':checked')) {
        $this.addClass('is-checked');
        $item.addClass('is-checked');
      }
    }, 0);
  }

});

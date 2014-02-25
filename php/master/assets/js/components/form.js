jQuery(function () {
  jQuery('.js-form-password-parent').on('click touchend', '.js-form-password-toggle', function(e) {
    var $passwordInput = jQuery(this).parents('.js-form-password-parent')
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
      jQuery(this).text('Hide');
    }
    else {
      $passwordInput.attr('type', 'password');
      jQuery(this).text('Show');
    }
    $passwordInput.focus();
  });

  jQuery('.js-form--search').on('focus', '.js-form--search__input, .js-form--search__button', function() {
    jQuery(this).parents('.js-form--search').addClass('is-active');
  });
  jQuery('.js-form--search').on('blur', '.js-form--search__input, .js-form--search__button', function() {
    jQuery(this).parents('.js-form--search').removeClass('is-active');
  });
  jQuery('.js-form__input--copyable').on('click touchend', function() {
    jQuery(this).select();
  });

  // On load
  $.each(jQuery('.js-form__checkbox'), function() {
    jQuery(this).append('<span class="form__checkbox__item js-form__checkbox__item"></span>');
    setCheckRadioStatus(jQuery(this));
  });

  $.each(jQuery('.js-form__radio'), function() {
    jQuery(this).append('<span class="form__radio__item js-form__radio__item"></span>');
    setCheckRadioStatus(jQuery(this));
  });

  jQuery(document).on('click touchend', '.js-form__checkbox', function(e) {
    setCheckRadio(jQuery(this));
    setCheckRadioStatus(jQuery(this));
    e.preventDefault();
  });

  jQuery(document).on('click touchend', '.js-form__radio', function(e) {
    setCheckRadio(jQuery(this));
    removeRadioStatus(jQuery(this));
    setCheckRadioStatus(jQuery(this));
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
        $radios = jQuery('[name=' + $input.attr('name') + ']').parents('.js-form__radio'),
        $items = $radios.find('.js-form__radio__item');
    setTimeout(function() {
      $radios.removeClass('is-checked');
      $items.removeClass('is-checked');
      if ($input.is(':checked')) {
        $this.addClass('is-checked');
        $item.addClass('is-checked');
      }
    }, 0);
  }

});

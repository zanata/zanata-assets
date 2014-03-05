// the semi-colon before function invocation is a safety net against
// concatenated scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {
  'use strict';

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really
  // being passed in so we can ensure the value of it is truly undefined.
  // In ES5, undefined can no longer be modified.

  // window and document are passed through as local variable rather than global
  // as this (slightly) quickens the resolution process and can be more
  // efficiently minified (especially when both are regularly referenced in
  // your plugin).

  // Create the defaults once
  var pluginName = 'zanataForm',
      defaults = {};

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Private Functions

  function setCheckRadio($this) {
    var $input = $this.find('.js-form__checkbox__input,.js-form__radio__input');

    if (!$input.is(':checked')) {
      $input.prop('checked', true);
    }
    else if ($input.attr('type') === 'checkbox') {
      $input.prop('checked', false);
    }
  }

  function setCheckRadioStatus($this) {
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

  function removeRadioStatus($this) {
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

  Plugin.prototype = {
    init: function () {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.settings
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.settings).
      this.appendCheckboxes();
      this.appendRadios();

      $('.js-form-password-parent')
        .on('click touchend', '.js-form-password-toggle', function (e) {

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
          function () {
            $(this).parents('.js-form--search').removeClass('is-active');
          }
        );

      $('.js-form__input--copyable')
        .on('click touchend', function () {
          $(this).select();
        });

      $(document).on('click touchend', '.js-form__checkbox', function (e) {
        setCheckRadio($(this));
        setCheckRadioStatus($(this));
        e.preventDefault();
      });

      $(document).on('click touchend', '.js-form__radio', function (e) {
        setCheckRadio($(this));
        removeRadioStatus($(this));
        setCheckRadioStatus($(this));
        e.preventDefault();
      });
    },

    appendCheckboxes: function (element) {
      var el = element || 'body',
          $elCheckboxes = $(el).find('.js-form__checkbox');

      $.each($elCheckboxes, function () {
        $(this)
          .append('<span class="form__checkbox__item ' +
            'js-form__checkbox__item"/>');
        setCheckRadioStatus($(this));
      });
    },

    appendRadios: function (element) {
      var el = element || 'body',
          $elRadios = $(el).find('.js-form__radio');

      $.each($elRadios, function () {
        $(this)
          .append('<span class="form__radio__item js-form__radio__item"/>');
        setCheckRadioStatus($(this));
      });
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });

    // chain jQuery functions
    return this;
  };

})(jQuery, window, document);

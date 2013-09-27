$(function () {
  $('.js-form-password-parent').on('click', '.js-form-password-toggle', function(e) {
    var $passwordInput = $(this).parents('.js-form-password-parent').find('.js-form-password-input');
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
});

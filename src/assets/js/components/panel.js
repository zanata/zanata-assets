(function ($) {
  'use strict';

  var $panelBody = $('.js-panel__body');
  var resizeTimeout;

  function resizePanels() {
    var windowHeight = $(window).height();
    $.each($panelBody, function(i) {
      var $this = $(this);
      var $panel = $this.parents('.js-panel');
      var panelFromTop = $panelBody[i].getBoundingClientRect().top;
      var bottomResultsSize =
        $panel.find('.js-panel__results--bottom').height() || 29;
      var footerHeight = $('.js-footer').height();
      var panelHeight = Math.floor(
        // Minus 1 to account for rounding errors
        windowHeight - panelFromTop - footerHeight - bottomResultsSize - 1
      );
      console.log(panelFromTop);
      $this.css('height', panelHeight);
    });
  }

  if ($panelBody.length > 0) {
    $(window).resize(function(event) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizePanels, 600);
    });
    resizePanels();
  }


})(jQuery);

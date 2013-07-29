$(function () {
  $(".loader").click(function() {
    if ($(".loader__spinner", this).length <= 0) {
      $(".loader__label", this).append("<span class='loader__spinner'><span></span><span></span><span></span></span>");
      var loader = $(this).addClass("is-active");
      setTimeout(function() {
        loader.removeClass("is-active");
        setTimeout(function() {
          $(".loader__spinner", loader).remove();
        }, 300);
      }, 1200);
    }
  });
});

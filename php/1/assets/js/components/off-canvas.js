$(function() {
  var offCanvasToggle = $("[class^=off-canvas__toggle], .off-canvas__close");

  function offCanvasAction(offCanvasTarget) {
    var offCanvasMethod = $(offCanvasTarget).attr("data-off-canvas"),
        offCanvasClass  = offCanvasTarget.replace("#", ""),
        offCanvasToggleItem = offCanvasClass.replace("off-canvas--", ".off-canvas__toggle--");
    $(".off-canvas__outer").toggleClass(offCanvasClass + "-" + offCanvasMethod);
    $(offCanvasToggleItem).toggleClass("is-active");
  }

  // TODO: Figure out how to use hammer.js properly
  // TODO: Implement drag instead of swipe but with a high threshold

  offCanvasToggle.on("click", function(e) {
    e.preventDefault();
  });

  offCanvasToggle.hammer().on("swipe", function() {
    offCanvasAction($(this).attr("href"));
  });

  offCanvasToggle.hammer().on("release", function() {
    offCanvasAction($(this).attr("href"));
  });

  $(".off-canvas__target").hammer().on("swipe", function() {
    offCanvasAction("#" + $(this).attr("id"));
  });

});

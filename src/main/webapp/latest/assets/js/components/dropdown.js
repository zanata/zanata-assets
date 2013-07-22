$(function() {

  var collapseActiveDropdowns,
      toggleThisCollapseOthers;

  collapseActiveDropdowns = function () {
    $(".dropdown.is-active .dropdown__toggle").click();
  };

  toggleThisCollapseOthers = function (e) {
    var dropdown = $(this).parent(".dropdown");
    $(".dropdown.is-active").not(dropdown).removeClass("is-active")
                            .parents(".dropdown__container").removeClass("is-active");
    dropdown.toggleClass("is-active").parents(".dropdown__container");
    e.stopPropagation();
  };

  $(document).bind("click", collapseActiveDropdowns);
  $(".dropdown__toggle").bind("click", toggleThisCollapseOthers);

});

$(function () {
  $(document).on('click touchend', '.js-example__setter', function() {
    var exampleState = $(this).attr('data-example');
    // Reset class and apply new one
    $(this).parents('.js-example').find('.js-example__target')
           .attr('class', 'js-example__target').addClass(exampleState);
  });
});

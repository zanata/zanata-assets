function init() {
  $('[title]').tooltip({
    placement: 'auto top',
    container: 'body',
    delay: {
       show: '500',
       hide: '100'
    }
  });
}

$(function () {
  init();
});

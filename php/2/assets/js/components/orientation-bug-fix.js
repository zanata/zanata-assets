 (function(doc) {
  var metas = doc.querySelectorAll('meta[name="viewport"]'),
      forEach = [].forEach;
  function fixMetas(isFirstTime) {
   var scales = isFirstTime === true ? ['1.0', '1.0'] : ['0.25', '1.6'];
   forEach.call(metas, function(el) {
    el.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
   });
  }
  fixMetas(true);
  doc.addEventListener('gesturestart', fixMetas, false);
 }(document));

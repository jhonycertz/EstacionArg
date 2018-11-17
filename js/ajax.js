(function($) {
  'use strict';
  if ($.support.pjax) {
    $.pjax({
      url: "views/home.html",
      container: app.contenido,
      timeout: 6000,
      push: false
    });
    $.pjax.defaults.maxCacheLength = 0;
    $(document).on('click', 'a[data-pjax], [data-pjax] a', function(event) {
      if ($("#contenido").length == 0 || $(this).hasClass('no-ajax')) {
        return;
      }
      // if ($(this).parent("li").hasClass("nav-top") && !$(this).parent("li").hasClass("active") && $(this).attr("href")==app.setting.view) {
        // return false;
      // } else {
      $.pjax.click(event, {
        url: $(this).attr("href"),
        container: app.contenido,
        timeout: 6000,
        push: false,
        success: function() {
          // $('#search').show();
        }
      });
      // }
    });
    $(document).on('pjax:error', function(event, request) {
      event.preventDefault();
    });
    $(document).on('pjax:start', function() {
      $(document).trigger("pjaxStart");
      $.each(app.realtime, function(i, rt)
      {
        clearInterval(rt);
      });
      app.realtime.length = 0;
    });
    // fix js
    $(document).on('pjax:end', function(event, d, x) {
      $(document).trigger("pjaxEnd");
    });
  }
})(jQuery);

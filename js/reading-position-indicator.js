jQuery(window).on("load", function () {
  "use strict";
  var n = function () {
      return jQuery(document).height() - jQuery(window).height();
    },
    o = function () {
      return jQuery(window).scrollTop();
    };
  if ("max" in document.createElement("progress")) {
    (r = jQuery("progress")).attr({ max: n() }),
      jQuery(document).on("scroll", function () {
        r.attr({ value: o() });
      }),
      jQuery(window).resize(function () {
        r.attr({ max: n(), value: o() });
      });
  } else {
    var e,
      t,
      r = jQuery("#eskimo-progress-bar").find(".eskimo-progress-bar"),
      i = n(),
      c = function () {
        r.css({ width: ((e = o()), (t = (e / i) * 100), (t += "%")) });
      };
    jQuery(document).on("scroll", c),
      jQuery(window).on("resize", function () {
        (i = n()), c();
      });
  }
});

!(function (e) {
  "use strict";
  function i(i, a) {
    var s = i.outerWidth(!0),
      o = {};
    if (!i.is(":visible") && !n) {
      switch (
        ((n = !0),
        i
          .addClass("ps-active-panel")
          .css({
            position: "fixed",
            top: 0,
            height: "100%",
            "z-index": 9999999999,
          }),
        i.data(a),
        e("html").addClass("overflow-hidden"),
        e("body").addClass("overflow-hidden"),
        e("#eskimo-overlay").bind("touchmove", !1),
        e("#eskimo-overlay").fadeIn(200),
        a.side)
      ) {
        case "left":
          i.css({ left: "-" + s + "px", right: "auto" }), (o.left = "+=" + s);
          break;
        case "right":
          i.css({ left: "auto", right: "-" + s + "px" }), (o.right = "+=" + s);
      }
      t.animate({}, a.duration),
        i.show().animate(o, a.duration, function () {
          (n = !1), "function" == typeof a.onOpen && a.onOpen();
        });
    }
  }
  var t = e("body"),
    n = !1;
  (e.panelslider = function (t, n) {
    var a = e(".ps-active-panel");
    (n = e.extend(
      {},
      { side: "left", duration: 200, clickClose: !0, onOpen: null },
      n
    )),
      a.is(":visible") && a[0] != t[0]
        ? e.panelslider.close(function () {
            i(t, n);
          })
        : (a.length && !a.is(":hidden")) || i(t, n);
  }),
    (e.panelslider.close = function (i) {
      var a = e(".ps-active-panel"),
        s = a.data("duration"),
        o = a.outerWidth(!0),
        l = {};
      if (a.length && !a.is(":hidden") && !n) {
        switch (((n = !0), a.data("side"))) {
          case "left":
            l.left = "-=" + o;
            break;
          case "right":
            l.right = "-=" + o;
        }
        a.animate(l, s),
          t.animate({}, s, function () {
            a.fadeOut(200),
              a.removeClass("ps-active-panel"),
              e("html").removeClass("overflow-hidden"),
              e("body").removeClass("overflow-hidden"),
              e("#eskimo-overlay").fadeOut(200),
              (n = !1),
              i && i();
          });
      }
    }),
    e(document).bind("click keyup", function (i) {
      var t = e(".ps-active-panel");
      ("keyup" == i.type && 27 != i.keyCode) ||
        (t.is(":visible") && t.data("clickClose") && e.panelslider.close());
    }),
    e(document).on("click", ".ps-active-panel", function (e) {
      e.stopPropagation();
    }),
    (e.fn.panelslider = function (i) {
      return (
        this.on("click", function (t) {
          var n = e(".ps-active-panel"),
            a = e(this.getAttribute("href"));
          n.is(":visible") && a[0] == n[0]
            ? e.panelslider.close()
            : e.panelslider(a, i),
            t.preventDefault(),
            t.stopPropagation();
        }),
        this
      );
    });
})(jQuery);
jQuery(document).ready(function () {
  jQuery("body")
    .find(".eskimo-panel-open")
    .panelslider({ side: "right", clickClose: !0, duration: 400 }),
    jQuery("body")
      .find(".eskimo-panel-close")
      .on("click", function () {
        return jQuery.panelslider.close(), !1;
      });
});

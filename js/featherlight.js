/**
 * Detect Swipe Extention
 **/
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? (module.exports = e(require("jquery")))
    : e(jQuery);
})(function (e) {
  function t() {
    this.removeEventListener("touchmove", n),
      this.removeEventListener("touchend", t),
      (h = !1);
  }
  function n(n) {
    if ((e.detectSwipe.preventDefault && n.preventDefault(), h)) {
      var i,
        o = n.touches[0].pageX,
        c = n.touches[0].pageY,
        r = s - o,
        d = u - c,
        p = window.devicePixelRatio || 1;
      Math.abs(r) * p >= e.detectSwipe.threshold
        ? (i = r > 0 ? "left" : "right")
        : Math.abs(d) * p >= e.detectSwipe.threshold &&
          (i = d > 0 ? "up" : "down"),
        i &&
          (t.call(this),
          e(this)
            .trigger("swipe", i)
            .trigger("swipe" + i));
    }
  }
  function i(e) {
    1 == e.touches.length &&
      ((s = e.touches[0].pageX),
      (u = e.touches[0].pageY),
      (h = !0),
      this.addEventListener("touchmove", n, !1),
      this.addEventListener("touchend", t, !1));
  }
  function o() {
    this.addEventListener && this.addEventListener("touchstart", i, !1);
  }
  e.detectSwipe = {
    version: "2.1.2",
    enabled: "ontouchstart" in document.documentElement,
    preventDefault: !0,
    threshold: 20,
  };
  var s,
    u,
    h = !1;
  (e.event.special.swipe = { setup: o }),
    e.each(["left", "up", "down", "right"], function () {
      e.event.special["swipe" + this] = {
        setup: function () {
          e(this).on("swipe", e.noop);
        },
      };
    });
});
/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 1.5.0 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2016, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
 **/
!(function (a) {
  "use strict";
  function b(a, c) {
    if (!(this instanceof b)) {
      var d = new b(a, c);
      return d.open(), d;
    }
    (this.id = b.id++), this.setup(a, c), this.chainCallbacks(b._callbackChain);
  }
  if ("undefined" == typeof a)
    return void (
      "console" in window &&
      window.console.info("Too much lightness, Featherlight needs jQuery.")
    );
  var c = [],
    d = function (b) {
      return (c = a.grep(c, function (a) {
        return a !== b && a.$instance.closest("body").length > 0;
      }));
    },
    e = function (a, b) {
      var c = {},
        d = new RegExp("^" + b + "([A-Z])(.*)");
      for (var e in a) {
        var f = e.match(d);
        if (f) {
          var g = (f[1] + f[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
          c[g] = a[e];
        }
      }
      return c;
    },
    f = { keyup: "onKeyUp", resize: "onResize" },
    g = function (c) {
      a.each(b.opened().reverse(), function () {
        if (!c.isDefaultPrevented() && !1 === this[f[c.type]](c))
          return c.preventDefault(), c.stopPropagation(), !1;
      });
    },
    h = function (c) {
      if (c !== b._globalHandlerInstalled) {
        b._globalHandlerInstalled = c;
        var d = a
          .map(f, function (a, c) {
            return c + "." + b.prototype.namespace;
          })
          .join(" ");
        a(window)[c ? "on" : "off"](d, g);
      }
    };
  (b.prototype = {
    constructor: b,
    namespace: "featherlight",
    targetAttr: "data-featherlight",
    variant: null,
    resetCss: !1,
    background: null,
    openTrigger: "click",
    closeTrigger: "click",
    filter: null,
    root: "body",
    openSpeed: 250,
    closeSpeed: 250,
    closeOnClick: "background",
    closeOnEsc: !0,
    closeIcon: "&#xf00d;",
    loading: "",
    persist: !1,
    otherClose: null,
    beforeOpen: a.noop,
    beforeContent: a.noop,
    beforeClose: a.noop,
    afterOpen: a.noop,
    afterContent: a.noop,
    afterClose: a.noop,
    onKeyUp: a.noop,
    onResize: a.noop,
    type: null,
    contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
    setup: function (b, c) {
      "object" != typeof b ||
        b instanceof a != !1 ||
        c ||
        ((c = b), (b = void 0));
      var d = a.extend(this, c, { target: b }),
        e = d.resetCss ? d.namespace + "-reset" : d.namespace,
        f = a(
          d.background ||
            [
              '<div class="' + e + "-loading " + e + '">',
              '<div class="' + e + '-content">',
              '<span class="' + e + "-close-icon " + d.namespace + '-close">',
              d.closeIcon,
              "</span>",
              '<div class="' + d.namespace + '-inner">' + d.loading + "</div>",
              "</div>",
              "</div>",
            ].join("")
        ),
        g =
          "." +
          d.namespace +
          "-close" +
          (d.otherClose ? "," + d.otherClose : "");
      return (
        (d.$instance = f.clone().addClass(d.variant)),
        d.$instance.on(d.closeTrigger + "." + d.namespace, function (b) {
          var c = a(b.target);
          (("background" === d.closeOnClick && c.is("." + d.namespace)) ||
            "anywhere" === d.closeOnClick ||
            c.closest(g).length) &&
            (d.close(b), b.preventDefault());
        }),
        this
      );
    },
    getContent: function () {
      if (this.persist !== !1 && this.$content) return this.$content;
      var b = this,
        c = this.constructor.contentFilters,
        d = function (a) {
          return b.$currentTarget && b.$currentTarget.attr(a);
        },
        e = d(b.targetAttr),
        f = b.target || e || "",
        g = c[b.type];
      if (
        (!g && f in c && ((g = c[f]), (f = b.target && e)),
        (f = f || d("href") || ""),
        !g)
      )
        for (var h in c) b[h] && ((g = c[h]), (f = b[h]));
      if (!g) {
        var i = f;
        if (
          ((f = null),
          a.each(b.contentFilters, function () {
            return (
              (g = c[this]),
              g.test && (f = g.test(i)),
              !f && g.regex && i.match && i.match(g.regex) && (f = i),
              !f
            );
          }),
          !f)
        )
          return (
            "console" in window &&
              window.console.error(
                "Featherlight: no content filter found " +
                  (i ? ' for "' + i + '"' : " (no target specified)")
              ),
            !1
          );
      }
      return g.process.call(b, f);
    },
    setContent: function (b) {
      var c = this;
      return (
        (b.is("iframe") || a("iframe", b).length > 0) &&
          c.$instance.addClass(c.namespace + "-iframe"),
        c.$instance.removeClass(c.namespace + "-loading"),
        c.$instance
          .find("." + c.namespace + "-inner")
          .not(b)
          .slice(1)
          .remove()
          .end()
          .replaceWith(a.contains(c.$instance[0], b[0]) ? "" : b),
        (c.$content = b.addClass(c.namespace + "-inner")),
        c
      );
    },
    open: function (b) {
      var d = this;
      if (
        (d.$instance.hide().appendTo(d.root),
        !((b && b.isDefaultPrevented()) || d.beforeOpen(b) === !1))
      ) {
        b && b.preventDefault();
        var e = d.getContent();
        if (e)
          return (
            c.push(d),
            h(!0),
            d.$instance.fadeIn(d.openSpeed),
            d.beforeContent(b),
            a
              .when(e)
              .always(function (a) {
                d.setContent(a), d.afterContent(b);
              })
              .then(d.$instance.promise())
              .done(function () {
                d.afterOpen(b);
              })
          );
      }
      return d.$instance.detach(), a.Deferred().reject().promise();
    },
    close: function (b) {
      var c = this,
        e = a.Deferred();
      return (
        c.beforeClose(b) === !1
          ? e.reject()
          : (0 === d(c).length && h(!1),
            c.$instance.fadeOut(c.closeSpeed, function () {
              c.$instance.detach(), c.afterClose(b), e.resolve();
            })),
        e.promise()
      );
    },
    resize: function (a, b) {
      if (a && b) {
        this.$content.css("width", "").css("height", "");
        var c = Math.max(
          a / (parseInt(this.$content.parent().css("width"), 10) - 1),
          b / (parseInt(this.$content.parent().css("height"), 10) - 1)
        );
        c > 1 &&
          ((c = b / Math.floor(b / c)),
          this.$content
            .css("width", "" + a / c + "px")
            .css("height", "" + b / c + "px"));
      }
    },
    chainCallbacks: function (b) {
      for (var c in b) this[c] = a.proxy(b[c], this, a.proxy(this[c], this));
    },
  }),
    a.extend(b, {
      id: 0,
      autoBind: "[data-featherlight]",
      defaults: b.prototype,
      contentFilters: {
        jquery: {
          regex: /^[#.]\w/,
          test: function (b) {
            return b instanceof a && b;
          },
          process: function (b) {
            return this.persist !== !1 ? a(b) : a(b).clone(!0);
          },
        },
        image: {
          regex: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,
          process: function (b) {
            var c = this,
              d = a.Deferred(),
              e = new Image(),
              f = a(
                '<img src="' +
                  b +
                  '" alt="" class="' +
                  c.namespace +
                  '-image" />'
              );
            return (
              (e.onload = function () {
                (f.naturalWidth = e.width),
                  (f.naturalHeight = e.height),
                  d.resolve(f);
              }),
              (e.onerror = function () {
                d.reject(f);
              }),
              (e.src = b),
              d.promise()
            );
          },
        },
        html: {
          regex: /^\s*<[\w!][^<]*>/,
          process: function (b) {
            return a(b);
          },
        },
        ajax: {
          regex: /./,
          process: function (b) {
            var d = a.Deferred(),
              e = a("<div></div>").load(b, function (a, b) {
                "error" !== b && d.resolve(e.contents()), d.fail();
              });
            return d.promise();
          },
        },
        iframe: {
          process: function (b) {
            var c = new a.Deferred(),
              d = a("<iframe/>")
                .hide()
                .attr("src", b)
                .css(e(this, "iframe"))
                .on("load", function () {
                  c.resolve(d.show());
                })
                .appendTo(
                  this.$instance.find("." + this.namespace + "-content")
                );
            return c.promise();
          },
        },
        text: {
          process: function (b) {
            return a("<div>", { text: b });
          },
        },
      },
      functionAttributes: [
        "beforeOpen",
        "afterOpen",
        "beforeContent",
        "afterContent",
        "beforeClose",
        "afterClose",
      ],
      readElementConfig: function (b, c) {
        var d = this,
          e = new RegExp("^data-" + c + "-(.*)"),
          f = {};
        return (
          b &&
            b.attributes &&
            a.each(b.attributes, function () {
              var b = this.name.match(e);
              if (b) {
                var c = this.value,
                  g = a.camelCase(b[1]);
                if (a.inArray(g, d.functionAttributes) >= 0)
                  c = new Function(c);
                else
                  try {
                    c = a.parseJSON(c);
                  } catch (a) {}
                f[g] = c;
              }
            }),
          f
        );
      },
      extend: function (b, c) {
        var d = function () {
          this.constructor = b;
        };
        return (
          (d.prototype = this.prototype),
          (b.prototype = new d()),
          (b.__super__ = this.prototype),
          a.extend(b, this, c),
          (b.defaults = b.prototype),
          b
        );
      },
      attach: function (b, c, d) {
        var e = this;
        "object" != typeof c ||
          c instanceof a != !1 ||
          d ||
          ((d = c), (c = void 0)),
          (d = a.extend({}, d));
        var h,
          f = d.namespace || e.defaults.namespace,
          g = a.extend({}, e.defaults, e.readElementConfig(b[0], f), d);
        return (
          b.on(g.openTrigger + "." + g.namespace, g.filter, function (f) {
            var i = a.extend(
                { $source: b, $currentTarget: a(this) },
                e.readElementConfig(b[0], g.namespace),
                e.readElementConfig(this, g.namespace),
                d
              ),
              j = h || a(this).data("featherlight-persisted") || new e(c, i);
            "shared" === j.persist
              ? (h = j)
              : j.persist !== !1 && a(this).data("featherlight-persisted", j),
              i.$currentTarget.blur(),
              j.open(f);
          }),
          b
        );
      },
      current: function () {
        var a = this.opened();
        return a[a.length - 1] || null;
      },
      opened: function () {
        var b = this;
        return (
          d(),
          a.grep(c, function (a) {
            return a instanceof b;
          })
        );
      },
      close: function (a) {
        var b = this.current();
        if (b) return b.close(a);
      },
      _onReady: function () {
        var b = this;
        b.autoBind &&
          (a(b.autoBind).each(function () {
            b.attach(a(this));
          }),
          a(document).on("click", b.autoBind, function (c) {
            c.isDefaultPrevented() ||
              "featherlight" === c.namespace ||
              (c.preventDefault(),
              b.attach(a(c.currentTarget)),
              a(c.target).trigger("click.featherlight"));
          }));
      },
      _callbackChain: {
        onKeyUp: function (b, c) {
          return 27 === c.keyCode
            ? (this.closeOnEsc && a.featherlight.close(c), !1)
            : b(c);
        },
        onResize: function (a, b) {
          return (
            this.resize(
              this.$content.naturalWidth,
              this.$content.naturalHeight
            ),
            a(b)
          );
        },
        afterContent: function (a, b) {
          var c = a(b);
          return this.onResize(b), c;
        },
      },
    }),
    (a.featherlight = b),
    (a.fn.featherlight = function (a, c) {
      return b.attach(this, a, c);
    }),
    a(document).ready(function () {
      b._onReady();
    });
})(jQuery);
/**
 * Featherlight - Gallery Extention
 **/
!(function (e) {
  "use strict";
  function t(n, i) {
    if (!(this instanceof t)) {
      var a = new t(e.extend({ $source: n, $currentTarget: n.first() }, i));
      return a.open(), a;
    }
    e.featherlight.apply(this, arguments), this.chainCallbacks(o);
  }
  var n = function (e) {
    window.console &&
      window.console.warn &&
      window.console.warn("FeatherlightGallery: " + e);
  };
  if (void 0 === e) return n("Too much lightness, Featherlight needs jQuery.");
  if (!e.featherlight)
    return n("Load the featherlight plugin before the gallery plugin");
  var i =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch),
    a = e.event && e.event.special.swipeleft && e,
    r =
      window.Hammer &&
      function (e) {
        var t = new window.Hammer.Manager(e[0]);
        return t.add(new window.Hammer.Swipe()), t;
      },
    s = i && (a || r);
  i &&
    !s &&
    n(
      "No compatible swipe library detected; one must be included before featherlightGallery for swipe motions to navigate the galleries."
    );
  var o = {
    afterClose: function (e, t) {
      var n = this;
      return (
        n.$instance.off("next." + n.namespace + " previous." + n.namespace),
        n._swiper &&
          (n._swiper
            .off("swipeleft", n._swipeleft)
            .off("swiperight", n._swiperight),
          (n._swiper = null)),
        e(t)
      );
    },
    beforeOpen: function (e, t) {
      var n = this;
      return (
        n.$instance.on(
          "next." + n.namespace + " previous." + n.namespace,
          function (e) {
            var t = "next" === e.type ? 1 : -1;
            n.navigateTo(n.currentNavigation() + t);
          }
        ),
        s &&
          ((n._swiper = s(n.$instance)
            .on(
              "swipeleft",
              (n._swipeleft = function () {
                n.$instance.trigger("next");
              })
            )
            .on(
              "swiperight",
              (n._swiperight = function () {
                n.$instance.trigger("previous");
              })
            )),
          n.$instance.addClass(this.namespace + "-swipe-aware", s)),
        n.$instance
          .find("." + n.namespace + "-content")
          .append(n.createNavigation("previous"))
          .append(n.createNavigation("next")),
        e(t)
      );
    },
    beforeContent: function (e, t) {
      var n = this.currentNavigation(),
        i = this.slides().length;
      return (
        this.$instance
          .toggleClass(this.namespace + "-first-slide", 0 === n)
          .toggleClass(this.namespace + "-last-slide", n === i - 1),
        e(t)
      );
    },
    onKeyUp: function (e, t) {
      var n = { 37: "previous", 39: "next" }[t.keyCode];
      return n ? (this.$instance.trigger(n), !1) : e(t);
    },
  };
  e.featherlight.extend(t, { autoBind: "[data-featherlight-gallery]" }),
    e.extend(t.prototype, {
      previousIcon: "&#9664;",
      nextIcon: "&#9654;",
      galleryFadeIn: 100,
      galleryFadeOut: 300,
      slides: function () {
        return this.filter ? this.$source.find(this.filter) : this.$source;
      },
      images: function () {
        return (
          n("images is deprecated, please use slides instead"), this.slides()
        );
      },
      currentNavigation: function () {
        return this.slides().index(this.$currentTarget);
      },
      navigateTo: function (t) {
        var n = this,
          i = n.slides(),
          a = i.length,
          r = n.$instance.find("." + n.namespace + "-inner");
        return (
          (t = ((t % a) + a) % a),
          (n.$currentTarget = i.eq(t)),
          n.beforeContent(),
          e
            .when(n.getContent(), r.fadeTo(n.galleryFadeOut, 0.2))
            .always(function (e) {
              n.setContent(e), n.afterContent(), e.fadeTo(n.galleryFadeIn, 1);
            })
        );
      },
      createNavigation: function (t) {
        var n = this;
        return e(
          '<span title="' +
            t +
            '" class="' +
            this.namespace +
            "-" +
            t +
            '"><span>' +
            this[t + "Icon"] +
            "</span></span>"
        ).click(function () {
          e(this).trigger(t + "." + n.namespace);
        });
      },
    }),
    (e.featherlightGallery = t),
    (e.fn.featherlightGallery = function (e) {
      return t.attach(this, e), this;
    }),
    e(document).ready(function () {
      t._onReady();
    });
})(jQuery);

jQuery("body").find(".eskimo-lightbox").featherlightGallery({
  previousIcon: "&#xf053;" /* Code that is used as previous icon */,
  nextIcon: "&#xf054;" /* Code that is used as next icon */,
  galleryFadeIn: 100 /* fadeIn speed when slide is loaded */,
  galleryFadeOut: 300 /* fadeOut speed before slide is loaded */,
});

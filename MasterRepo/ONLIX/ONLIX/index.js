(() => {
  var e = {
      876: () => {
        !(function () {
          "use strict";
          if ("file:" !== location.protocol) {
            var e,
              t,
              n,
              o,
              r,
              i,
              a,
              s,
              l,
              c,
              u,
              d,
              h = (function () {
                var e,
                  t,
                  n,
                  o = {},
                  r = [],
                  i = [],
                  a = function (o) {
                    var r = document.getElementById("page" + o),
                      a = document.createElement("div");
                    (a.className = "page-inner"),
                      a.setAttribute(
                        "style",
                        "position: absolute; pointer-events: none;"
                      ),
                      (a.style.width = r.style.width),
                      (a.style.height = r.style.height),
                      r.appendChild(a),
                      (i[o] = a);
                    for (var s = 0; s < e.length; s++)
                      if (e[s].page === o)
                        for (var l = e[s].annotations, c = 0; c < l.length; c++)
                          n(a, l[c], t);
                  };
                return (
                  IDRViewer.on("ready", function (n) {
                    t = n;
                    var o = n.url || "",
                      i = new XMLHttpRequest();
                    i.open("GET", o + "annotations.json", !0),
                      (i.onload = function () {
                        i.status >= 200 &&
                          i.status < 400 &&
                          ((e = JSON.parse(i.responseText).pages),
                          (function () {
                            if (r.length) {
                              for (var e = 0; e < r.length; e++) a(r[e]);
                              r = [];
                            }
                          })());
                      }),
                      i.send();
                  }),
                  IDRViewer.on("pageload", function (t) {
                    e ? a(t.page) : r.push(t.page);
                  }),
                  IDRViewer.on("pageunload", function (e) {
                    i[e.page] &&
                      (i[e.page].parentNode.removeChild(i[e.page]),
                      (i[e.page] = null));
                  }),
                  (o.setLoadFunction = function (e) {
                    n = e;
                  }),
                  o
                );
              })(),
              g = (function () {
                var e = {},
                  t = {
                    click: [],
                    mouseover: [],
                    mouseout: [],
                    touchstart: [],
                    setup: [],
                  };
                return (
                  (e.register = function (e, n, o) {
                    for (var r = 0; r < e.length; r++)
                      for (var i = 0; i < n.length; i++)
                        t[n[i]].push({ type: e[r], handler: o });
                  }),
                  (e.onclick = function (e, n) {
                    for (var o = 0; o < t.click.length; o++)
                      e.type === t.click[o].type &&
                        t.click[o].handler.onclick.apply(this, [e, n]);
                  }),
                  (e.onmouseover = function (e, n) {
                    for (var o = 0; o < t.mouseover.length; o++)
                      e.type === t.mouseover[o].type &&
                        t.mouseover[o].handler.onmouseover.apply(this, [e, n]);
                  }),
                  (e.onmouseout = function (e, n) {
                    for (var o = 0; o < t.mouseout.length; o++)
                      e.type === t.mouseout[o].type &&
                        t.mouseout[o].handler.onmouseout.apply(this, [e, n]);
                  }),
                  (e.ontouchstart = function (e, n) {
                    for (var o = 0; o < t.touchstart.length; o++)
                      e.type === t.touchstart[o].type &&
                        t.touchstart[o].handler.ontouchstart.apply(this, [
                          e,
                          n,
                        ]);
                  }),
                  (e.onsetup = function (e, n) {
                    for (var o = 0; o < t.setup.length; o++)
                      e.type === t.setup[o].type &&
                        t.setup[o].handler.onsetup.apply(this, [e, n]);
                  }),
                  e
                );
              })(),
              f = {
                play: function (n, o) {
                  (e && !e.ended && !e.paused && (e.pause(), o === t)) ||
                    ((t = o), (e = new Audio(n)).play());
                },
              };
            (o = {}),
              IDRViewer.on("ready", function (e) {
                n = e.pagecount;
              }),
              (o.onsetup = function (e) {
                if (e.action && "URI" === e.action.type) {
                  const t = document.createElement("a");
                  (t.href = e.action.uri),
                    (t.title = e.action.uri),
                    (t.target = "_blank"),
                    (t.style.position = "absolute"),
                    (t.style.width = "100%"),
                    (t.style.height = "100%"),
                    this.appendChild(t);
                }
              }),
              (o.onmouseover = function (e) {
                e.action &&
                  "URI" !== e.action.type &&
                  (this.style.cursor = "pointer");
              }),
              (o.onclick = function (e, t) {
                if (e.action)
                  switch (e.action.type) {
                    case "GoTo":
                      IDRViewer.goToPage(e.action.page, e.action.zoom);
                      break;
                    case "Named":
                      switch (e.action.name) {
                        case "NextPage":
                          IDRViewer.next();
                          break;
                        case "PrevPage":
                          IDRViewer.prev();
                          break;
                        case "FirstPage":
                          IDRViewer.goToPage(1);
                          break;
                        case "LastPage":
                          n && IDRViewer.goToPage(n);
                      }
                      break;
                    case "Sound":
                      f.play((t.url || "") + e.action.sound, e.objref);
                      break;
                    case "Launch":
                      t.enableLaunchActions &&
                        window.open("../" + e.action.target, "_blank");
                  }
              }),
              g.register(
                ["Link", "Widget", "TextLink"],
                ["click", "mouseover", "setup"],
                o
              ),
              (r = {
                onmouseover: function () {
                  this.style.cursor = "pointer";
                },
                onclick: function (e, t) {
                  e.sound && f.play((t.url || "") + e.sound, e.objref);
                },
              }),
              g.register(["Sound"], ["click", "mouseover"], r),
              (i = {
                onmouseover: function () {
                  this.style.cursor = "pointer";
                },
                onclick: function (e, t) {
                  var n = document.createElement("a");
                  (n.href = (t.url || "") + e.attachment),
                    (n.download = e.filename),
                    (n.target = "_blank"),
                    document.body.appendChild(n),
                    n.click(),
                    document.body.removeChild(n);
                },
              }),
              g.register(["FileAttachment"], ["click", "mouseover"], i),
              (c = function (e) {
                if (e.contents && e.objref) {
                  var t = document
                      .querySelector("[data-objref='" + e.objref + "']")
                      .getBoundingClientRect(),
                    n = (t.right - t.left) / 2 + t.left,
                    o = t.bottom,
                    r = document.createElement("div");
                  (r.dataset.parentRef = e.objref),
                    r.setAttribute(
                      "style",
                      "position: fixed; width: 300px; min-height: 200px; left: " +
                        (n - 150) +
                        "px; top: " +
                        (o + 5) +
                        "px; background-color: #FFFFEF; border-radius: 10px; border: 1px #bbb solid; padding: 10px; box-sizing: border-box; font-family: Arial;"
                    );
                  var i = document.createElement("p");
                  e.title && (i.innerText = e.title),
                    i.setAttribute("style", "font-weight: bold; margin: 0;");
                  var a = document.createElement("p");
                  return (
                    e.contents && (a.innerText = e.contents),
                    r.appendChild(i),
                    r.appendChild(a),
                    document.body.appendChild(r),
                    r
                  );
                }
                return null;
              }),
              ((l = {}).onmouseover = function (e) {
                s ||
                  (a ? (a.parentNode.removeChild(a), (a = null)) : (a = c(e)));
              }),
              (l.onmouseout = function () {
                a && (a.parentNode.removeChild(a), (a = null));
              }),
              (l.onclick = function (e) {
                if (s)
                  if (a) {
                    var t = a.dataset.parentRef;
                    a.parentNode.removeChild(a),
                      (a = null),
                      t !== e.objref && (a = c(e));
                  } else a = c(e);
              }),
              (l.ontouchstart = function () {
                s = !0;
              }),
              g.register(
                [
                  "Text",
                  "Line",
                  "Square",
                  "Circle",
                  "Polygon",
                  "PolyLine",
                  "Highlight",
                  "Underline",
                  "Squiggly",
                  "StrikeOut",
                  "Stamp",
                  "Caret",
                  "Ink",
                  "FileAttachment",
                  "Redact",
                  "Projection",
                ],
                ["click", "mouseover", "mouseout", "touchstart"],
                l
              ),
              (u = {
                onmouseover: function () {
                  this.style.cursor = "pointer";
                },
                onclick: function (e, t) {
                  if (e.richmedia.length) {
                    var n = e.richmedia[0].type.startsWith("video"),
                      o = document.createElement(n ? "video" : "audio");
                    o.setAttribute(
                      "style",
                      "position: absolute; object-fit: fill; pointer-events: auto;"
                    ),
                      o.setAttribute("controls", "controls"),
                      (o.style.left = e.bounds[0] + "px"),
                      (o.style.top = e.bounds[1] + "px"),
                      (o.style.width = e.bounds[2] + "px"),
                      (o.style.height = e.bounds[3] + "px"),
                      (o.title = e.type),
                      (o.dataset.objref = e.objref);
                    for (var r = 0; r < e.richmedia.length; r++) {
                      var i = document.createElement("source");
                      i.setAttribute("src", (t.url || "") + e.richmedia[r].src),
                        i.setAttribute("type", e.richmedia[r].type),
                        o.appendChild(i);
                    }
                    this.parentNode.replaceChild(o, this);
                  }
                },
              }),
              g.register(["RichMedia"], ["click", "mouseover"], u),
              (d = {
                onmouseover: function () {
                  this.style.cursor = "pointer";
                },
                onclick: function (e, t) {
                  if (e.action) {
                    var n = document.createElement(
                      e.action.media.type.substr(0, 5)
                    );
                    if (
                      (n.setAttribute(
                        "style",
                        "position: absolute; pointer-events: auto;"
                      ),
                      n.setAttribute("controls", "controls"),
                      (n.style.left = e.bounds[0] + "px"),
                      (n.style.top = e.bounds[1] + "px"),
                      (n.title = e.type),
                      (n.dataset.objref = e.objref),
                      "video/mp4" === e.action.media.type)
                    ) {
                      (n.style.objectFit = "fill"),
                        (n.style.width = e.bounds[2] + "px"),
                        (n.style.height = e.bounds[3] + "px");
                      var o = document.createElement("source");
                      o.setAttribute("src", (t.url || "") + e.action.media.src),
                        o.setAttribute("type", e.action.media.type),
                        n.appendChild(o);
                    } else
                      "audio/mpeg" === e.action.media.type &&
                        n.setAttribute(
                          "src",
                          (t.url || "") + e.action.media.src
                        );
                    this.parentNode.replaceChild(n, this), n.play();
                  }
                },
              }),
              g.register(["Screen"], ["click", "mouseover"], d),
              h.setLoadFunction(function (e, t, n) {
                var o = document.createElement("div");
                o.setAttribute(
                  "style",
                  "position: absolute; pointer-events: auto; -webkit-user-select: none;"
                ),
                  (o.style.left = t.bounds[0] + "px"),
                  (o.style.top = t.bounds[1] + "px"),
                  (o.style.width = t.bounds[2] + "px"),
                  (o.style.height = t.bounds[3] + "px"),
                  t.objref && (o.dataset.objref = t.objref),
                  t.appearance &&
                    ((o.style.backgroundImage = "url('" + t.appearance + "')"),
                    (o.style.backgroundSize = "100% 100%")),
                  e.appendChild(o),
                  o.addEventListener("click", function () {
                    g.onclick.apply(this, [t, n]);
                  }),
                  o.addEventListener("mouseover", function () {
                    g.onmouseover.apply(this, [t, n]);
                  }),
                  o.addEventListener("mouseout", function () {
                    g.onmouseout.apply(this, [t, n]);
                  }),
                  o.addEventListener("touchstart", function () {
                    g.ontouchstart.apply(this, [t, n]);
                  }),
                  g.onsetup.apply(o, [t, n]);
              });
          } else
            console.log(
              "Annotations functionality is not available when loading from the file:// protocol."
            );
        })();
      },
      334: () => {
        !(function () {
          "use strict";
          var e = {
            isFullscreenEnabled: function () {
              return (
                document.fullscreenEnabled ||
                document.msFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.webkitFullscreenEnabled
              );
            },
            isFullscreen: function () {
              return !!(
                document.fullscreenElement ||
                document.msFullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement
              );
            },
            toggleFullScreen: function () {
              this.isFullscreen()
                ? (
                    document.exitFullscreen ||
                    document.msExitFullscreen ||
                    document.mozCancelFullScreen ||
                    document.webkitCancelFullScreen
                  ).call(document)
                : (
                    document.body.requestFullscreen ||
                    document.body.msRequestFullscreen ||
                    document.body.mozRequestFullScreen ||
                    document.body.webkitRequestFullscreen
                  ).call(document.body);
            },
          };
          for (var t in e) e.hasOwnProperty(t) && (IDRViewer[t] = e[t]);
          [
            "fullscreenchange",
            "MSFullscreenChange",
            "mozfullscreenchange",
            "webkitfullscreenchange",
          ].forEach(function (t) {
            document.addEventListener(t, function () {
              IDRViewer.fire("fullscreenchange", {
                isFullscreen: e.isFullscreen(),
              });
            });
          });
        })();
      },
      800: (e, t) => {
        var n;
        !(function () {
          "use strict";
          var o,
            r,
            i,
            a,
            s,
            l,
            c = {
              LAYOUT_PRESENTATION: "presentation",
              LAYOUT_MAGAZINE: "magazine",
              LAYOUT_CONTINUOUS: "continuous",
              SELECT_SELECT: "select",
              SELECT_PAN: "pan",
              ZOOM_SPECIFIC: "specific",
              ZOOM_ACTUALSIZE: "actualsize",
              ZOOM_FITWIDTH: "fitwidth",
              ZOOM_FITHEIGHT: "fitheight",
              ZOOM_FITPAGE: "fitpage",
              ZOOM_AUTO: "auto",
            },
            u = 1,
            d = 0,
            h = [],
            g = !1;
          c.setup = function (e) {
            e || (e = IDRViewer.config),
              (g = !0),
              (a = e.bounds),
              (d = e.pagecount),
              (s = void 0 !== e.paddingX ? e.paddingX : 5),
              (l = void 0 !== e.paddingY ? e.paddingY : 5),
              (u < 1 || u > d) && (u = 1),
              (r = document.getElementById("idrviewer"));
            var t = document.createElement("div");
            (t.style.position = "relative"),
              (t.style.display = "inline-block"),
              (t.style.verticalAlign = "middle"),
              (t.style.minWidth = "100%"),
              (t.style.lineHeight = "normal"),
              r.appendChild(t),
              ((o = document.createElement("div")).id = "contentContainer"),
              (o.style.overflow = "hidden"),
              (o.style.transform = "translateZ(0)"),
              (o.style.padding = l + "px " + s + "px"),
              t.appendChild(o);
            for (var n = 1; n <= d; n++) {
              var f = document.createElement("div");
              (f.id = "page" + n),
                f.setAttribute(
                  "style",
                  "width: " + a[n - 1][0] + "px; height: " + a[n - 1][1] + "px;"
                ),
                (f.className = "page"),
                o.appendChild(f),
                (h[n] = f);
            }
            T.setup(),
              b.setup(),
              v.setup(e.pageType, e.url),
              y.setup(!!e.isR2L),
              x.setup(),
              i.goToPage(u),
              b.setPage(u, !0);
            var p = {
              selectMode: T.currentSelectMode,
              isMobile:
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                ),
              layout: i.toString(),
              availableLayouts: y.getAvailableLayouts(),
              isFirstPage: 1 === u,
              isLastPage: i.isLastPage(u),
            };
            for (var m in e) e.hasOwnProperty(m) && (p[m] = e[m]);
            (p.page = u), c.fire("ready", p);
          };
          var f,
            p,
            m,
            v = (function () {
              var e,
                t,
                n,
                o = {},
                r = !1,
                i = [],
                s = "file:" === location.protocol,
                l = "";
              (o.setup = function (o, r) {
                (t = (n = "svgz" === o) || "svg" === o),
                  r && (l = r),
                  s &&
                    !t &&
                    console.log(
                      "Cannot load pages using AJAX over the file:// protocol. Falling back to iframes (some features may not be available)."
                    );
                var i = document.createElement("style");
                i.setAttribute("type", "text/css"),
                  document.head.appendChild(i),
                  (e = i.sheet),
                  t &&
                    window.addEventListener("mousedown", function (e) {
                      0 === e.button && u(window);
                    });
              }),
                (o.clearSelection = function () {
                  t ? u(window) : c(window);
                });
              var c = function (e) {
                  try {
                    e.getSelection
                      ? e.getSelection().empty
                        ? e.getSelection().empty()
                        : e.getSelection().removeAllRanges &&
                          e.getSelection().removeAllRanges()
                      : e.document.selection && e.document.selection.empty();
                  } catch (e) {}
                },
                u = function (e) {
                  try {
                    c(e);
                    for (var t = 1; t <= d; t++)
                      b.isVisible(t) && c(h[t].firstChild.contentDocument);
                  } catch (e) {}
                },
                g = function (e, t) {
                  var n = document.createElement("iframe");
                  n.setAttribute("class", "page-inner"),
                    n.setAttribute("src", l + e + ".html"),
                    n.setAttribute(
                      "style",
                      "width: " +
                        a[e - 1][0] +
                        "px; height: " +
                        a[e - 1][1] +
                        "px; position: absolute; border: 0;"
                    ),
                    (n.onload = t),
                    h[e].appendChild(n);
                };
              return (
                (o.show = function (e) {
                  h[e].firstChild.style.display = "block";
                }),
                (o.hide = function (e) {
                  h[e].firstChild.style.display = "none";
                }),
                (o.load = function (o, c) {
                  t
                    ? (function (e, t) {
                        var o = function () {
                            this.removeEventListener("load", o);
                            try {
                              this.contentDocument.addEventListener(
                                "mousedown",
                                function (e) {
                                  0 === e.button && u(window);
                                }
                              );
                            } catch (e) {}
                            t();
                          },
                          r = document.createElement("object");
                        r.setAttribute("width", "" + a[e - 1][0]),
                          r.setAttribute("height", "" + a[e - 1][1]),
                          r.setAttribute(
                            "data",
                            l + e + (n ? ".svgz" : ".svg")
                          ),
                          r.setAttribute("type", "image/svg+xml"),
                          r.setAttribute("class", "page-inner"),
                          r.setAttribute("style", "position: absolute"),
                          r.addEventListener("load", o),
                          h[e].appendChild(r);
                      })(o, c)
                    : s
                    ? g(o, c)
                    : (function (t, n) {
                        var o = new XMLHttpRequest();
                        o.open("GET", l + t + ".html", !0),
                          (o.onload = function () {
                            o.status >= 200 && o.status < 400
                              ? (function (t, n, o) {
                                  var a = document.createElement("div");
                                  a.innerHTML = t;
                                  var s = a.querySelector("#p" + n);
                                  (s.style.margin = "0"),
                                    (s.style.overflow = "hidden"),
                                    (s.style.position = "absolute");
                                  var c = function () {
                                      this &&
                                        this.removeEventListener("load", c),
                                        o();
                                    },
                                    u = s.querySelector("#pdf" + n),
                                    d =
                                      u.getAttribute("data") ||
                                      u.getAttribute("src");
                                  if ((d && u.addEventListener("load", c), l)) {
                                    var g = u.getAttribute("data");
                                    g
                                      ? u.setAttribute("data", l + g)
                                      : (g = u.getAttribute("src")) &&
                                        -1 === g.indexOf("base64") &&
                                        u.setAttribute("src", l + g);
                                  }
                                  var f = s.querySelector("#fonts" + n);
                                  if (f) {
                                    var p = f.innerHTML;
                                    f.parentNode.removeChild(f),
                                      p
                                        .match(/@font-face {[\s\S]*?}/g)
                                        .forEach(function (t) {
                                          -1 === i.indexOf(t) &&
                                            (i.push(t),
                                            e.insertRule(
                                              t.replace('url("', 'url("' + l),
                                              e.cssRules.length
                                            ));
                                        });
                                  }
                                  var m = s.querySelector(".shared-css");
                                  m &&
                                    (m.parentNode.removeChild(m),
                                    r ||
                                      (document.head.appendChild(m), (r = !0))),
                                    E.addClass(s, "page-inner"),
                                    h[n].appendChild(s),
                                    d || c();
                                })(o.responseText, t, n)
                              : g(t, n);
                          }),
                          (o.onerror = function () {
                            g(t, n);
                          }),
                          o.send();
                      })(o, c);
                }),
                (o.unload = function (e) {
                  h[e].removeChild(h[e].firstChild);
                }),
                o
              );
            })(),
            b = (function () {
              var e,
                t,
                n,
                o = "loading",
                r = "hidden",
                i = "unloaded",
                a = "loaded",
                s = {},
                l = 0,
                u = 0,
                g = [];
              s.setup = function () {
                n = d;
                for (var e = 1; e <= d; e++)
                  (g[e] = i), (h[e].dataset.state = i);
              };
              var f = function (e, t) {
                  p(g[e], t), (g[e] = t), (h[e].dataset.state = t);
                },
                p = function (e, t) {
                  switch (e) {
                    case o:
                      l--;
                      break;
                    case a:
                      u--;
                      break;
                    case r:
                      break;
                    case i:
                      n--;
                  }
                  switch (t) {
                    case o:
                      l++;
                      break;
                    case a:
                      u++;
                      break;
                    case r:
                      break;
                    case i:
                      n++;
                  }
                },
                m = function (e) {
                  return g[e] === a;
                },
                b = function (e) {
                  return g[e] === a || g[e] === r;
                },
                y = function (e) {
                  g[e] === a && (f(e, r), v.hide(e));
                },
                T = function (e) {
                  g[e] === r && (f(e, a), v.show(e)),
                    g[e] === i &&
                      (f(e, o),
                      v.load(e, function () {
                        f(e, a), c.fire("pageload", { page: e });
                      }));
                },
                w = function (e) {
                  (g[e] !== a && g[e] !== r) ||
                    (f(e, i), v.unload(e), c.fire("pageunload", { page: e }));
                },
                x = function () {
                  if ((T(e), l < 2))
                    for (
                      var o = 1;
                      o < 10 &&
                      (E(e - o) && (m(e - o) || T(e - o)), 2 !== l) &&
                      (E(e + o) && (m(e + o) || T(e + o)), 2 !== l);
                      o++
                    );
                  for (var r = 1, i = d; u + l > 20; )
                    e - r > i - e ? (m(r) && y(r), r++) : (m(i) && y(i), i--);
                  for (r = 1, i = d; d - n > 50; )
                    e - r > i - e ? (b(r) && w(r), r++) : (b(i) && w(i), i--);
                  t = setTimeout(x, 500);
                },
                E = function (e) {
                  return e >= 1 && e <= d;
                };
              return (
                (s.setPage = function (n, o) {
                  (e = n), o && T(n), clearTimeout(t), (t = setTimeout(x, 500));
                }),
                (s.stopLoading = function () {
                  clearTimeout(t), (t = setTimeout(x, 500));
                }),
                (s.hide = y),
                (s.isVisible = m),
                s
              );
            })(),
            y = (function () {
              var e,
                t = {},
                n = {},
                o = !0,
                s = !1;
              return (
                (t.setup = function (t) {
                  s = t;
                  for (var l = 0; l < d; l++)
                    if (a[l][0] !== a[0][0] || a[l][1] !== a[0][1]) {
                      o = !1;
                      break;
                    }
                  (i = n[e] || n[IDRViewer.LAYOUT_CONTINUOUS]).setup(o, s),
                    E.addClass(r, "layout-" + i.toString()),
                    s && E.addClass(r, "isR2L");
                }),
                (t.setLayout = function (e) {
                  i.unload(),
                    E.removeClass(r, "layout-" + i.toString()),
                    (i = n[e]).setup(o, s),
                    E.addClass(r, "layout-" + i.toString()),
                    x.updateZoom(IDRViewer.ZOOM_AUTO),
                    i.goToPage(u),
                    c.fire("layoutchange", { layout: e });
                }),
                (t.addLayout = function (e, t) {
                  n[e] = t;
                }),
                (t.setDefault = function (t) {
                  e = t;
                }),
                (t.getAvailableLayouts = function () {
                  return Object.keys(n);
                }),
                (t.updatePage = function (e) {
                  u != e &&
                    ((u = e),
                    b.setPage(e),
                    c.fire("pagechange", {
                      page: u,
                      pagecount: d,
                      isFirstPage: 1 === u,
                      isLastPage: i.isLastPage(e),
                    }));
                }),
                t
              );
            })();
          y.addLayout(
            c.LAYOUT_PRESENTATION,
            ((p = {
              setup: function (e) {
                f = e;
              },
              unload: function () {
                for (var e = 1; e <= d; e++)
                  (h[e].style.marginLeft = ""),
                    (h[e].style.marginTop = ""),
                    E.removeClass(
                      h[e],
                      "current",
                      "prev",
                      "next",
                      "before",
                      "after"
                    );
                (o.style.width = ""), (o.style.height = "");
              },
              goToPage: function (e) {
                y.updatePage(e),
                  f || x.updateZoom(),
                  (r.scrollTop = 0),
                  m(e),
                  p.updateLayout();
              },
              getVisiblePages: function () {
                return [u];
              },
            }),
            (m = function (e) {
              for (var t = 1; t <= d; t++)
                E.removeClass(
                  h[t],
                  "current",
                  "prev",
                  "next",
                  "before",
                  "after"
                ),
                  t < e
                    ? E.addClass(h[t], "before")
                    : t > e && E.addClass(h[t], "after");
              E.addClass(h[e], "current"),
                e - 1 >= 1 && E.addClass(h[e - 1], "prev"),
                e + 1 <= d && E.addClass(h[e + 1], "next");
            }),
            (p.updateLayout = function () {
              var e = x.getZoom(),
                t = Math.floor(a[u - 1][0] * e),
                n = 0,
                i = r.clientWidth - 2 * s;
              i > t ? (n = (i - t) / 2) : (i = t);
              var c = Math.floor(a[u - 1][1] * e),
                g = 0,
                f = r.clientHeight - 2 * l;
              f > c ? (g = (f - c) / 2) : (f = c),
                (o.style.width = i + "px"),
                (o.style.height = f + "px");
              for (var p = 1; p <= d; p++)
                (h[p].style.marginLeft = n + "px"),
                  (h[p].style.marginTop = g + "px");
            }),
            (p.isLastPage = function (e) {
              return e === d;
            }),
            (p.getZoomBounds = function () {
              return { width: a[u - 1][0], height: a[u - 1][1] };
            }),
            (p.getAutoZoom = function (e, t) {
              return Math.min(e, t);
            }),
            (p.next = function () {
              c.goToPage(u + 1);
            }),
            (p.prev = function () {
              c.goToPage(u - 1);
            }),
            (p.toString = function () {
              return IDRViewer.LAYOUT_PRESENTATION;
            }),
            p)
          ),
            y.addLayout(
              c.LAYOUT_MAGAZINE,
              (function () {
                var e,
                  t,
                  n = {};
                function i(e) {
                  return e > 1 && e < d;
                }
                (n.setup = function (n, o) {
                  (e = n), (t = o);
                }),
                  (n.unload = function () {
                    for (var e = 1; e <= d; e++)
                      (h[e].style.marginLeft = ""),
                        (h[e].style.marginTop = ""),
                        E.removeClass(
                          h[e],
                          "current",
                          "prev",
                          "next",
                          "before",
                          "after"
                        );
                    (o.style.width = ""), (o.style.height = "");
                  }),
                  (n.goToPage = function (t) {
                    1 !== t && t % 2 != 0 && (t -= 1),
                      y.updatePage(t),
                      e || x.updateZoom(),
                      g(t),
                      n.updateLayout();
                  }),
                  (n.getVisiblePages = function () {
                    var e = [u];
                    return i(u) && e.push(u + 1), e;
                  });
                var g = function (e) {
                  for (var t = 1; t <= d; t++)
                    E.removeClass(
                      h[t],
                      "current",
                      "prev",
                      "next",
                      "before",
                      "after"
                    );
                  if (
                    (E.addClass(h[e], "current"),
                    i(e) && E.addClass(h[e + 1], "current"),
                    1 == e && (e = 0),
                    e + 2 <= d &&
                      (E.addClass(h[e + 2], "next"),
                      e + 3 <= d && E.addClass(h[e + 3], "next")),
                    e - 1 > 0 &&
                      (E.addClass(h[e - 1], "prev"),
                      e - 2 > 0 && E.addClass(h[e - 2], "prev")),
                    e + 4 <= d)
                  )
                    for (t = e + 4; t <= d; t++) E.addClass(h[t], "after");
                  if (e - 3 > 0)
                    for (t = e - 3; t > 0; t--) E.addClass(h[t], "before");
                };
                return (
                  (n.updateLayout = function () {
                    var e = i(u),
                      n = x.getZoom(),
                      c = Math.floor(a[u - 1][0] * n),
                      g = e ? Math.floor(a[u][0] * n) : c,
                      f = 2 * Math.max(c, g),
                      p = Math.max(f, r.clientWidth - 2 * s),
                      m = Math.floor(p / 2),
                      v = m,
                      b = m;
                    t ? (b -= g) : (v -= c);
                    var y = Math.floor(a[u - 1][1] * n),
                      T = e ? Math.floor(a[u][1] * n) : y,
                      w = Math.max(y, T, r.clientHeight - 2 * l),
                      E = Math.floor((w - (t ? T : y)) / 2),
                      L = Math.floor((w - (t ? y : T)) / 2);
                    (o.style.width = p + "px"),
                      (o.style.height = w + "px"),
                      (h[1].style.marginLeft = b + "px"),
                      (h[1].style.marginTop = L + "px");
                    for (var I = 2; I <= d; I += 2)
                      (h[I].style.marginLeft = v + "px"),
                        (h[I].style.marginTop = E + "px"),
                        I < d &&
                          ((h[I + 1].style.marginLeft = b + "px"),
                          (h[I + 1].style.marginTop = L + "px"));
                  }),
                  (n.isLastPage = function (e) {
                    return e + (1 == e ? 1 : 2) > d;
                  }),
                  (n.getZoomBounds = function () {
                    var e = i(u),
                      t = Math.floor(a[u - 1][0]),
                      n = e ? Math.floor(a[u][0]) : 0,
                      o = Math.floor(a[u - 1][1]),
                      r = e ? Math.floor(a[u][1]) : 0;
                    return {
                      width: 2 * Math.max(t, n),
                      height: Math.max(o, r),
                    };
                  }),
                  (n.getAutoZoom = function (e, t) {
                    return Math.min(e, t);
                  }),
                  (n.next = function () {
                    c.goToPage(u + (1 == u ? 1 : 2));
                  }),
                  (n.prev = function () {
                    c.goToPage(u - 1);
                  }),
                  (n.toString = function () {
                    return IDRViewer.LAYOUT_MAGAZINE;
                  }),
                  n
                );
              })()
            ),
            y.addLayout(
              c.LAYOUT_CONTINUOUS,
              (function () {
                var e = {},
                  t = 0,
                  n = 0,
                  o = [];
                (e.setup = function () {
                  r.addEventListener("scroll", i);
                  for (var e = 0; e < d; e++)
                    a[e][0] > t && (t = a[e][0]), a[e][1] > n && (n = a[e][1]);
                }),
                  (e.unload = function () {
                    r.removeEventListener("scroll", i);
                  });
                var i = function () {
                    b.stopLoading(), g();
                  },
                  g = function () {
                    var e, t;
                    if (h[1].getBoundingClientRect().top > 0) y.updatePage(1);
                    else
                      for (e = 1; e <= d; e++) {
                        var n = h[e].getBoundingClientRect();
                        t = n.top;
                        var o = n.bottom - n.top;
                        if (t <= 0.25 * o && t > 0.5 * -o) {
                          y.updatePage(e);
                          break;
                        }
                      }
                    f();
                  },
                  f = function () {
                    o = [u];
                    var e,
                      t,
                      n = r.clientHeight,
                      i = function (e) {
                        return (
                          (t = h[e].getBoundingClientRect()).bottom > 0 &&
                          t.top < n
                        );
                      };
                    for (e = u - 1; e >= 1 && i(e); e--) o.push(e);
                    for (e = u + 1; e <= d && i(e); e++) o.push(e);
                  };
                return (
                  (e.goToPage = function (e, t) {
                    var n = 0;
                    if (t) {
                      var o = t.split(" ");
                      switch (o[0]) {
                        case "XYZ":
                          n = Number(o[2]);
                          break;
                        case "FitH":
                        case "FitBH":
                          n = Number(o[1]);
                          break;
                        case "FitR":
                          n = Number(o[4]);
                      }
                      (isNaN(n) || n < 0 || n > a[e - 1][1]) && (n = 0),
                        0 !== n && (n = a[e - 1][1] - n);
                    }
                    var i = x.getZoom();
                    (r.scrollTop = h[e].offsetTop - l + n * i),
                      y.updatePage(e),
                      f();
                  }),
                  (e.getVisiblePages = function () {
                    return o;
                  }),
                  (e.updateLayout = function () {}),
                  (e.isLastPage = function (e) {
                    return e === d;
                  }),
                  (e.getZoomBounds = function () {
                    return { width: t, height: n };
                  }),
                  (e.getAutoZoom = function (t) {
                    return e.getZoomBounds().width > r.clientWidth - 2 * s
                      ? t
                      : 1;
                  }),
                  (e.next = function () {
                    c.goToPage(u + 1);
                  }),
                  (e.prev = function () {
                    c.goToPage(u - 1);
                  }),
                  (e.toString = function () {
                    return IDRViewer.LAYOUT_CONTINUOUS;
                  }),
                  e
                );
              })()
            );
          var T = (function () {
            var e,
              t,
              n,
              i,
              a = {},
              s = !1;
            (a.setup = function () {
              switch (
                (((i = document.createElement("div")).id = "overlay"),
                o.parentNode.insertBefore(i, o),
                n)
              ) {
                case IDRViewer.SELECT_PAN:
                case IDRViewer.SELECT_SELECT:
                  break;
                default:
                  n = IDRViewer.SELECT_SELECT;
              }
              (this.currentSelectMode = n),
                this.currentSelectMode == c.SELECT_SELECT
                  ? a.enableTextSelection()
                  : a.enablePanning();
            }),
              (a.enableTextSelection = function () {
                (this.currentSelectMode = c.SELECT_SELECT),
                  E.removeClass(i, "panning"),
                  i.removeEventListener("mousedown", l),
                  document.removeEventListener("mouseup", u),
                  i.removeEventListener("mousemove", d);
              });
            var l = function (n) {
                return (
                  (n = n || window.event),
                  E.addClass(i, "mousedown"),
                  (e = n.clientX),
                  (t = n.clientY),
                  (s = !0),
                  !1
                );
              },
              u = function () {
                E.removeClass(i, "mousedown"), (s = !1);
              },
              d = function (n) {
                if (s)
                  return (
                    (n = n || window.event),
                    (r.scrollLeft = r.scrollLeft + e - n.clientX),
                    (r.scrollTop = r.scrollTop + t - n.clientY),
                    (e = n.clientX),
                    (t = n.clientY),
                    !1
                  );
              };
            return (
              (a.enablePanning = function () {
                (this.currentSelectMode = c.SELECT_PAN),
                  v.clearSelection(),
                  E.addClass(i, "panning"),
                  i.addEventListener("mousedown", l),
                  document.addEventListener("mouseup", u),
                  i.addEventListener("mousemove", d);
              }),
              (a.setDefaultMode = function (e) {
                n = e;
              }),
              a
            );
          })();
          c.setSelectMode = function (e) {
            g
              ? (e == c.SELECT_SELECT
                  ? T.enableTextSelection()
                  : T.enablePanning(),
                c.fire("selectchange", { type: e }))
              : T.setDefaultMode(e);
          };
          var w,
            x = (function () {
              var e,
                t,
                n,
                o = {},
                u = c.ZOOM_AUTO,
                g = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4],
                f = [
                  c.ZOOM_AUTO,
                  c.ZOOM_FITPAGE,
                  c.ZOOM_FITHEIGHT,
                  c.ZOOM_FITWIDTH,
                  c.ZOOM_ACTUALSIZE,
                ],
                p = 0,
                m = 1;
              o.setup = function () {
                var e = document.createElement("style");
                e.setAttribute("type", "text/css"),
                  document.head.appendChild(e),
                  (t = e.sheet),
                  window.addEventListener("resize", function () {
                    v();
                  }),
                  v(n);
              };
              var v = function (n) {
                  b.stopLoading();
                  var o = !1,
                    s = !1;
                  (m = y(n)) >= g[g.length - 1]
                    ? ((m = g[g.length - 1]), (s = !0))
                    : m <= g[0] && ((m = g[0]), (o = !0));
                  var l = r.scrollTop / r.scrollHeight;
                  i.updateLayout();
                  for (var f = i.getVisiblePages(), T = 1; T <= d; T++)
                    -1 === f.indexOf(T) && b.hide(T);
                  e && t.deleteRule(e);
                  var w = (function (e, t, n, o, r) {
                    var i;
                    return (
                      "-webkit-transform: " +
                      (i = "translateX(0px) translateY(0px) scale(" + o + ")") +
                      ";\n-ms-transform: " +
                      i +
                      ";\ntransform: " +
                      i +
                      ";"
                    );
                  })(0, 0, 0, m);
                  e = t.insertRule(
                    ".page-inner { \n" + w + "\n}",
                    t.cssRules.length
                  );
                  for (var x = 0; x < d; x++)
                    (h[x + 1].style.width = Math.floor(a[x][0] * m) + "px"),
                      (h[x + 1].style.height = Math.floor(a[x][1] * m) + "px");
                  (r.scrollTop = r.scrollHeight * l),
                    ++p % 2 == 1 && v(),
                    c.fire("zoomchange", {
                      zoomType: u,
                      zoomValue: m,
                      isMinZoom: o,
                      isMaxZoom: s,
                    });
                },
                y = function (e) {
                  var t = i.getZoomBounds(),
                    n = (r.clientWidth - 2 * s) / t.width,
                    o = (r.clientHeight - 2 * l) / t.height,
                    a = parseFloat(e);
                  switch (
                    (isNaN(a) || ((m = a), (e = c.ZOOM_SPECIFIC)),
                    e || (e = u),
                    e)
                  ) {
                    case c.ZOOM_AUTO:
                      m = i.getAutoZoom(n, o);
                      break;
                    case c.ZOOM_FITWIDTH:
                      m = n;
                      break;
                    case c.ZOOM_FITHEIGHT:
                      m = o;
                      break;
                    case c.ZOOM_FITPAGE:
                      m = Math.min(n, o);
                      break;
                    case c.ZOOM_ACTUALSIZE:
                      m = 1;
                  }
                  return (u = e), m;
                };
              return (
                (o.updateZoom = v),
                (o.zoomIn = function () {
                  v(
                    (function () {
                      for (
                        var e, t = m, n = g[g.length - 1], o = 0;
                        o < g.length;
                        o++
                      )
                        if (g[o] > t) {
                          n = g[o];
                          break;
                        }
                      for (o = 0; o < f.length; o++) {
                        var r = y(f[o]);
                        if (r > t && r <= n) {
                          if (e && r === n) continue;
                          (e = f[o]), (n = r);
                        }
                      }
                      return e || n;
                    })()
                  );
                }),
                (o.zoomOut = function () {
                  v(
                    (function () {
                      for (
                        var e, t = m, n = g[0], o = g.length - 1;
                        o >= 0;
                        o--
                      )
                        if (g[o] < t) {
                          n = g[o];
                          break;
                        }
                      for (o = 0; o < f.length; o++) {
                        var r = y(f[o]);
                        if (r < t && r >= n) {
                          if (e && r === n) continue;
                          (e = f[o]), (n = r);
                        }
                      }
                      return e || n;
                    })()
                  );
                }),
                (o.getZoom = function () {
                  return m;
                }),
                (o.setDefault = function (e) {
                  n = e;
                }),
                o
              );
            })();
          (c.zoomIn = function () {
            x.zoomIn();
          }),
            (c.zoomOut = function () {
              x.zoomOut();
            }),
            (c.setZoom = function (e) {
              g ? x.updateZoom(e) : x.setDefault(e);
            }),
            (c.goToPage = function (e, t) {
              g ? e >= 1 && e <= d && i.goToPage(Number(e), t) : (u = e);
            }),
            (c.next = function () {
              i.next();
            }),
            (c.prev = function () {
              i.prev();
            }),
            (c.setLayout = function (e) {
              g ? y.setLayout(e) : y.setDefault(e);
            }),
            (c.updateLayout = function () {
              x.updateZoom();
            }),
            (w = {}),
            (c.on = function (e, t) {
              w[e] || (w[e] = []), -1 === w[e].indexOf(t) && w[e].push(t);
            }),
            (c.off = function (e, t) {
              if (w[e]) {
                var n = w[e].indexOf(t);
                -1 !== n && w[e].splice(n, 1);
              }
            }),
            (c.fire = function (e, t) {
              w[e] &&
                w[e].forEach(function (e) {
                  e(t);
                });
            });
          var E = {
            addClass: function (e, t) {
              var n = 0 !== e.className.length ? e.className.split(" ") : [];
              -1 === n.indexOf(t) && (n.push(t), (e.className = n.join(" ")));
            },
            removeClass: function () {
              for (
                var e = arguments[0],
                  t = 0 !== e.className.length ? e.className.split(" ") : [],
                  n = 1;
                n < arguments.length;
                n++
              ) {
                var o = t.indexOf(arguments[n]);
                -1 !== o && t.splice(o, 1);
              }
              e.className = t.join(" ");
            },
          };
          void 0 ===
            (n = function () {
              return c;
            }.apply(t, [])) || (e.exports = n),
            window && (window.IDRViewer = c);
        })();
      },
      167: () => {
        !(function () {
          "use strict";
          let e, t, n;
          e =
            "URLSearchParams" in window
              ? new URL(document.location).searchParams
              : (function () {
                  let e = {},
                    t = document.URL,
                    n = t.toString().indexOf("?");
                  return (
                    -1 != n &&
                      t
                        .substr(n + 1)
                        .split("&")
                        .forEach(function (t) {
                          let n = t.split("=");
                          e[n[0]] = n[1];
                        }),
                    {
                      get: function (t) {
                        return e[t];
                      },
                      set: function (t, n) {
                        e[t] = n;
                      },
                      toString: function () {
                        let t = [];
                        for (let n in e) t.push(n + "=" + e[n]);
                        return t.join("&");
                      },
                    }
                  );
                })();
          let o = function (e) {
              history.pushState &&
                (t === IDRViewer.LAYOUT_CONTINUOUS
                  ? (n && clearTimeout(n),
                    (n = setTimeout(function () {
                      r(e.page);
                    }, 1e3)))
                  : r(e.page));
            },
            r = function (t) {
              try {
                e.set("page", t),
                  history.pushState({ page: t }, null, "?" + e.toString());
              } catch (e) {}
            };
          IDRViewer.goToPage(parseInt(e.get("page")) || 1),
            history.pushState &&
              IDRViewer.on("ready", function (n) {
                t = n.layout;
                try {
                  e.set("page", n.page),
                    history.replaceState(
                      { page: n.page },
                      null,
                      "?" + e.toString()
                    );
                } catch (e) {}
                (window.onpopstate = function (e) {
                  IDRViewer.off("pagechange", o),
                    IDRViewer.goToPage(e.state.page),
                    IDRViewer.on("pagechange", o);
                }),
                  IDRViewer.on("pagechange", o),
                  IDRViewer.on("layoutchange", function (e) {
                    t = e.layout;
                  });
              });
        })();
      },
      452: () => {
        !(function () {
          "use strict";
          let e, t;
          const n = "file:" === location.protocol;
          let o,
            r,
            i = -1;
          n &&
            console.log(
              "Search functionality is not available when loading from the file:// protocol."
            ),
            IDRViewer.on("ready", function (e) {
              (t = e.url || ""), (r = e.page);
            }),
            IDRViewer.on("pagechange", (e) => {
              r = e.page;
            }),
            (IDRViewer.loadSearch = function (o, r) {
              if (e)
                o &&
                  setTimeout(function () {
                    o(!0);
                  }, 0);
              else {
                if (n) return void (o && o(!1));
                var i = new XMLHttpRequest();
                i.open("GET", t + "search.json", !0),
                  r &&
                    i.addEventListener("progress", function (e) {
                      e.lengthComputable &&
                        r(Math.floor((e.loaded / e.total) * 100));
                    }),
                  (i.onload = function () {
                    i.status >= 200 &&
                      i.status < 400 &&
                      ((e = JSON.parse(i.responseText)),
                      IDRViewer.fire("searchready", {})),
                      o && o(!!e);
                  }),
                  (i.onerror = function () {
                    o && o(!1);
                  }),
                  i.send();
              }
            }),
            (IDRViewer.search = function (t, n, r, a = !1) {
              if (!e)
                throw new Error(
                  "Search not loaded. loadSearch() must be called first."
                );
              if (((o = []), (i = -1), e && t)) {
                t = n ? t : t.toUpperCase();
                for (var s = 0; s < e.length; s++) {
                  var l = n ? e[s] : e[s].toUpperCase(),
                    c = -1,
                    u = 0;
                  do {
                    if ((c = l.indexOf(t, c + 1)) >= 0) {
                      var d = c >= 50 ? c - 50 : 0,
                        h =
                          c + t.length < e[s].length - 50
                            ? c + t.length + 50
                            : e[s].length,
                        g = { page: s + 1, index: u++ };
                      a
                        ? ((g.preSnippet = e[s].substring(d, c)),
                          (g.postSnippet = e[s].substring(c + t.length, h)),
                          (g.result = e[s].substring(c, c + t.length)))
                        : (g.snippet = s + 1 + " - " + e[s].substr(d, h - d)),
                        o.push(g);
                    }
                  } while (!r && -1 !== c);
                }
              }
              return (
                IDRViewer.fire("search", {
                  searchTerm: t,
                  results: o,
                  settings: {
                    matchCase: n,
                    limitOnePerPage: r,
                    decomposeSnippets: a,
                  },
                }),
                o
              );
            }),
            (IDRViewer.nextSearchResult = function () {
              const e =
                i >= 0 ? o[(i + 1) % o.length] : o.find((e) => e.page >= r);
              e
                ? IDRViewer.selectSearchResult(e.page, e.index)
                : console.warn("Failed to find next search result");
            }),
            (IDRViewer.prevSearchResult = function () {
              const e =
                i >= 0
                  ? o[i - 1 >= 0 ? i - 1 : o.length - 1]
                  : o.reduce((e, t) => (t.page <= r ? t : e));
              e
                ? IDRViewer.selectSearchResult(e.page, e.index)
                : console.warn("Failed to find previous search result");
            }),
            (IDRViewer.selectSearchResult = function (e, t) {
              if (!o)
                return void console.warn("There isn't currently a search");
              const n = o.findIndex((n) => n.page === e && n.index === t);
              -1 !== n
                ? ((i = n),
                  IDRViewer.goToPage(e),
                  IDRViewer.fire("searchresultselected", {
                    resultIndex: n,
                    result: o[n],
                  }))
                : console.warn("That isn't a valid search result");
            });
        })(),
          (function () {
            "use strict";
            let e,
              t,
              n,
              o = {},
              r = null,
              i = [];
            function a(e) {
              return parseInt(e.substring(4));
            }
            function s(n) {
              const r = e(n);
              let s = r.getTextElements();
              if (!s) return;
              if (
                (r.clearHighlights(),
                !t || !t.searchTerm || !o.hasOwnProperty(a(n.id)))
              )
                return;
              if (e === u && 0 === s[0].getComputedTextLength())
                return void (i.includes(n) || i.push(n));
              const l = JSON.parse(JSON.stringify(t));
              let c = 0,
                d = { beginning: 0, end: 0, elements: [] };
              l.searchTerm = r.processSearchTerm(l.searchTerm);
              for (const e of s) {
                const t =
                  void 0 !== e.dataset.mappings
                    ? JSON.parse(e.dataset.mappings)
                    : void 0;
                let n,
                  o = r.getRawText(e);
                const i = [];
                if (t) {
                  const e = [...o.matchAll(/&(?:gt|lt|amp);/gi)].reduce(
                    (e, t) => (
                      e.push({
                        index: t.index - e.reduce((e, t) => e + t.offset, 0),
                        offset: t[0].length - 1,
                      }),
                      e
                    ),
                    []
                  );
                  for (const n of t) {
                    const t =
                        n[0] +
                        i.reduce((e, t) => e + t.offset, 0) +
                        e
                          .filter((e) => e.index < n[0])
                          .reduce((e, t) => e + t.offset, 0),
                      r = n[1];
                    (o = o.substring(0, t) + r + o.substring(t + 1)),
                      i.push({ index: t, offset: r.length - 1 });
                  }
                }
                l.matchCase
                  ? (n = o)
                  : ((n = o.toUpperCase()),
                    (l.searchTerm = l.searchTerm.toUpperCase()),
                    n.length !== o.length &&
                      console.error("Failed to handle a ligature"));
                let a,
                  s = 0,
                  u = !1;
                for (; s < n.length; ) {
                  for (a = 0; s + a < n.length && c < l.searchTerm.length; )
                    "&" === n.charAt(s + a)
                      ? (u = !0)
                      : u && ";" === n.charAt(s + a) && (u = !1),
                      n.charAt(s + a) === l.searchTerm.charAt(c)
                        ? (a++, c++)
                        : ((a = 0),
                          (c = 0),
                          d.elements.length || s++,
                          (d = { beginning: 0, end: 0, elements: [] }));
                  if (a > 0)
                    if (u)
                      (d = { beginning: 0, end: 0, elements: [] }),
                        (c = 0),
                        s++;
                    else {
                      if (!d.elements.length) {
                        d.beginning = s;
                        for (const e of i) {
                          if (!(d.beginning > e.index)) break;
                          d.beginning < e.index + e.offset
                            ? (d.beginning -= d.beginning - e.index)
                            : (d.beginning -= e.offset);
                        }
                      }
                      if ((d.elements.push(e), c === l.searchTerm.length)) {
                        d.end = s + a;
                        for (const e of i) {
                          if (!(d.end > e.index)) break;
                          d.end < e.index + e.offset
                            ? (d.end -= d.end - e.index)
                            : (d.end -= e.offset);
                        }
                        r.storeDescriber(d),
                          (c = 0),
                          (d = { beginning: 0, end: 0, elements: [] });
                      }
                      s += a;
                    }
                }
              }
              r.highlightResults(), (o[a(n.id)].pageHandler = r);
            }
            function l() {
              if (Object.keys(o) && r) {
                const e = o[r.page];
                e && e.pageHandler.setMatchDescriptorSelected(r.index, !1);
              }
              r = null;
            }
            function c(e) {
              return Number(e).toString(16).padStart(6, "0");
            }
            IDRViewer.on("ready", (t) => {
              e = "html" === t.pageType ? d : u;
            }),
              IDRViewer.on("pageunload", (e) => {
                delete o[e.page], r && r.page === e.page && l();
              }),
              IDRViewer.on("searchready", () => {
                IDRViewer.on("pageload", function (e) {
                  o.hasOwnProperty(e.page) &&
                    (s(document.querySelector("#page" + e.page)),
                    r &&
                      r.page === e.page &&
                      o[e.page].pageHandler.setMatchDescriptorSelected(
                        r.index,
                        !0
                      ));
                }),
                  e === u &&
                    setInterval(function () {
                      if (i.length > 0) {
                        let e = i.shift();
                        e &&
                          (0 !==
                          e
                            .querySelector("object")
                            .contentDocument.querySelector("text")
                            .getComputedTextLength()
                            ? (s(e),
                              r &&
                                r.page === e.page &&
                                o[
                                  e.page
                                ].pageHandler.setMatchDescriptorSelected(
                                  r.index,
                                  !0
                                ))
                            : i.push(e));
                      }
                    }, 500);
              }),
              IDRViewer.on("search", (e) => {
                l(),
                  (o = e.results.reduce(
                    (e, t) => (
                      e.hasOwnProperty(t.page)
                        ? e[t.page].count++
                        : (e[t.page] = { count: 1, pageHandler: null }),
                      e
                    ),
                    {}
                  )),
                  clearTimeout(n),
                  (n = setTimeout(function () {
                    t = {
                      searchTerm: e.searchTerm,
                      matchCase: e.settings.matchCase,
                      limitOnePerPage: e.settings.limitOnePerPage,
                    };
                    let n = document.getElementsByClassName("page");
                    for (let e = 0; e < n.length; e++) {
                      let t = n[e];
                      t.innerHTML && s(t);
                    }
                  }, 300));
              }),
              IDRViewer.on("searchresultselected", (e) => {
                l(), (r = { page: e.result.page, index: e.result.index });
                const t = o[e.result.page];
                void 0 !== t
                  ? t.count <= e.result.index
                    ? console.error(
                        "There aren't that many results on that page"
                      )
                    : t.pageHandler &&
                      (t.pageHandler.setMatchDescriptorSelected(
                        e.result.index,
                        !0
                      ),
                      t.pageHandler.scrollIntoView(e.result.index))
                  : console.error("That page doesn't have any results on it");
              });
            let u = function (e) {
                let t = { searchResults: [] };
                function n(e, t, n, o, r, i) {
                  return {
                    x: e,
                    y: t,
                    width: n,
                    height: o,
                    transform: r,
                    refElement: i,
                  };
                }
                return (
                  (t.getTextElements = function () {
                    let t = e.querySelector("object").contentDocument;
                    if (
                      !t ||
                      ((t = t.querySelectorAll("text")), 0 !== t.length)
                    )
                      return t;
                  }),
                  (t.clearHighlights = function () {
                    let t = [
                      ...e
                        .querySelector("object")
                        .contentDocument.querySelectorAll(".highlight"),
                    ];
                    for (; t.length > 0; ) {
                      let e = t.pop();
                      e.parentNode.removeChild(e);
                    }
                  }),
                  (t.processSearchTerm = function (e) {
                    return e;
                  }),
                  (t.getRawText = function (e) {
                    return e.textContent;
                  }),
                  (t.storeDescriber = function (e) {
                    t.searchResults = t.searchResults.concat(
                      (function (e) {
                        const t = [];
                        if (1 === e.elements.length) {
                          let o = e.elements[0],
                            r = o.getExtentOfChar(e.beginning),
                            i = o.getExtentOfChar(e.end - 1);
                          t.push(
                            n(
                              r.x,
                              r.y,
                              i.x + i.width - r.x,
                              i.y + i.height - r.y,
                              o.getAttribute("transform"),
                              o
                            )
                          );
                        } else {
                          let o = e.elements[0],
                            r = o.getExtentOfChar(e.beginning),
                            i = o.getExtentOfChar(o.textContent.length - 1);
                          t.push(
                            n(
                              r.x,
                              r.y,
                              i.x + i.width - r.x,
                              i.y + i.height - r.y,
                              o.getAttribute("transform"),
                              o
                            )
                          );
                          for (let i = 1; i < e.elements.length - 1; i++)
                            (o = e.elements[i]),
                              (r = o.getBBox()),
                              t.push(
                                n(
                                  r.x,
                                  r.y,
                                  r.width,
                                  r.height,
                                  o.getAttribute("transform"),
                                  o
                                )
                              );
                          (o = e.elements[e.elements.length - 1]),
                            (r = o.getBBox()),
                            (i = o.getExtentOfChar(e.end - 1)),
                            t.push(
                              n(
                                r.x,
                                r.y,
                                i.x + i.width - r.x,
                                i.y + i.height - r.y,
                                o.getAttribute("transform"),
                                o
                              )
                            );
                        }
                        return t;
                      })(e)
                    );
                  }),
                  (t.highlightResults = function () {
                    for (let o = 0; o < t.searchResults.length; o++) {
                      const r = t.searchResults[o];
                      r.refElement.parentNode.insertBefore(
                        ((n = o),
                        (function (e, t, n, o, r, i) {
                          const a = document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "rect"
                          );
                          return (
                            a.setAttributeNS(null, "x", e),
                            a.setAttributeNS(null, "y", t),
                            a.setAttributeNS(null, "width", n),
                            a.setAttributeNS(null, "height", o),
                            a.setAttributeNS(null, "fill", "yellow"),
                            a.setAttributeNS(null, "class", "highlight"),
                            a.setAttributeNS(null, "data-index", c(i)),
                            r && a.setAttributeNS(null, "transform", r),
                            a
                          );
                        })((e = r).x, e.y, e.width, e.height, e.transform, n)),
                        r.refElement
                      );
                    }
                    var e, n;
                  }),
                  (t.setMatchDescriptorSelected = function (t, n) {
                    const o = e
                      .querySelector("object")
                      .contentDocument.querySelectorAll(
                        '[data-index="' + c(t) + '"].highlight'
                      );
                    for (const e of o)
                      n
                        ? (e.classList.add("selected"),
                          (e.style.fill = "orange"))
                        : (e.classList.remove("selected"), (e.style.fill = ""));
                  }),
                  (t.scrollIntoView = function (e) {
                    t.searchResults[e].refElement.scrollIntoView({
                      block: "nearest",
                      inline: "start",
                    });
                  }),
                  (t.getMatchesCount = function () {
                    return t.searchResults.length;
                  }),
                  t
                );
              },
              d = function (e) {
                let t = { textElements: void 0, searchResults: [] };
                function n(e, t) {
                  return (
                    '<span class="highlight" data-index="' +
                    c(t) +
                    '">' +
                    e +
                    "</span>"
                  );
                }
                function o(e, t) {
                  const n = e.find((e) => e.element === t);
                  n ? (n.length += 51) : e.push({ element: t, length: 51 });
                }
                return (
                  (t.getTextElements = function () {
                    if (
                      ((t.textElements = e.querySelector(".text-container")),
                      !t.textElements ||
                        ((t.textElements = t.textElements.children),
                        0 !== t.textElements.length))
                    )
                      return t.textElements;
                  }),
                  (t.clearHighlights = function () {
                    for (let e = 0; e < t.textElements.length; e++) {
                      const n = t.textElements[e];
                      n.innerHTML = n.innerHTML.replace(
                        /<span class="highlight(?: selected)?" data-index="[a-fA-F0-9]{6}">|<\/span>/gim,
                        ""
                      );
                    }
                  }),
                  (t.processSearchTerm = function (e) {
                    return e
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;");
                  }),
                  (t.getRawText = function (e) {
                    return e.innerHTML;
                  }),
                  (t.storeDescriber = function (e) {
                    t.searchResults.push(e);
                  }),
                  (t.highlightResults = function () {
                    const e = [];
                    for (let r = 0; r < t.searchResults.length; r++) {
                      let i = t.searchResults[r];
                      if (1 === i.elements.length) {
                        let t,
                          a,
                          s = i.elements[0],
                          l = s.innerHTML;
                        for (let n = 0; n < e.length; n++)
                          if (e[n].element === s) {
                            t = e[n];
                            break;
                          }
                        (a = t ? t.length : 0),
                          (s.innerHTML = l.substring(0, i.beginning + a));
                        let c = n(l.substring(i.beginning + a, i.end + a), r);
                        (s.innerHTML += c),
                          o(e, s),
                          (s.innerHTML += l.substring(i.end + a, l.length));
                      } else {
                        let t,
                          a,
                          s = i.elements[0],
                          l = s.innerHTML;
                        for (let n = 0; n < e.length; n++)
                          if (e[n].element === s) {
                            t = e[n];
                            break;
                          }
                        (a = t ? t.length : 0),
                          (s.innerHTML = l.substring(0, i.beginning + a));
                        let c = n(l.substring(i.beginning + a, l.length), r);
                        (s.innerHTML += c), o(e, s);
                        for (let t = 1; t < i.elements.length - 1; t++)
                          (s = i.elements[t]),
                            (l = s.innerHTML),
                            (s.innerHTML = ""),
                            (c = n(l, r)),
                            (s.innerHTML += c),
                            o(e, s);
                        (s = i.elements[i.elements.length - 1]),
                          (l = s.innerHTML),
                          (s.innerHTML = ""),
                          (c = n(l.substring(0, i.end), r)),
                          (s.innerHTML += c),
                          (s.innerHTML += l.substring(i.end, l.length)),
                          o(e, s);
                      }
                    }
                  }),
                  (t.setMatchDescriptorSelected = function (t, n) {
                    const o = e.querySelectorAll(
                      '[data-index="' + c(t) + '"].highlight'
                    );
                    for (const e of o)
                      n
                        ? e.classList.add("selected")
                        : e.classList.remove("selected");
                  }),
                  (t.scrollIntoView = function (e) {
                    t.searchResults[e].elements[0].scrollIntoView({
                      block: "nearest",
                      inline: "start",
                    });
                  }),
                  (t.getMatchesCount = function () {
                    return t.searchResults.length;
                  }),
                  t
                );
              };
          })();
      },
      685: () => {
        !(function () {
          "use strict";
          const e = (function () {
              const e = {
                  ja: {
                    "control.sidebar": "サイドバー",
                    "control.theme-toggle": "テーマ切換",
                    "control.prev": "前のページ",
                    "control.next": "次のページ",
                    "control.select": "選択",
                    "control.move": "パン",
                    "control.zoom-out": "縮小",
                    "control.zoom-in": "拡大",
                    "control.actual-size": "実際のサイズ",
                    "control.fit-width": "幅に合わせる",
                    "control.fit-height": "高さに合わせる",
                    "control.fit-page": "ページに合わせる",
                    "control.auto": "自動",
                    "control.fullscreen": "フルスクリーン",
                    "control.thumbnails": "サムネイル",
                    "control.bookmarks": "ブックマーク",
                    "control.presentation": "プレゼンテーション",
                    "control.magazine": "マガジン",
                    "control.continuous": "スクロール",
                    "control.search": "検索",
                    "control.page": "ページ",
                    "search.search": "検索",
                    "search.match-case": " 大文字・小文字を区別",
                    "search.limit-results-1": " 結果を1ページ１つに制限する",
                    "search.limit-results-500": "最初の500件が表示されます。",
                    "search.unavailable": "検索できません",
                    "search.loading": "ローディング",
                  },
                  fr: {
                    "control.sidebar": "Barre latérale",
                    "control.theme-toggle": "Basculer entre les thèmes",
                    "control.prev": "Page précédente",
                    "control.next": "Page suivante",
                    "control.select": "Sélectionner",
                    "control.move": "Déplacer",
                    "control.zoom-out": "Zoom arrière",
                    "control.zoom-in": "Zoom avant",
                    "control.actual-size": "Taille réelle",
                    "control.fit-width": "Pleine largeur",
                    "control.fit-height": "Pleine hauteur",
                    "control.fit-page": "Page entière",
                    "control.auto": "Automatique",
                    "control.fullscreen": "Plein écran",
                    "control.thumbnails": "Vignettes",
                    "control.bookmarks": "Signets",
                    "control.presentation": "Présentation",
                    "control.magazine": "Magazine",
                    "control.continuous": "En continu",
                    "control.search": "Recherche",
                    "control.page": "Page",
                    "search.search": "Rechercher",
                    "search.match-case": " Respecter la casse",
                    "search.limit-results-1":
                      " Limiter les résultats à 1 par page",
                    "search.limit-results-500":
                      "Limitée aux 500 premiers résultats",
                    "search.unavailable": "Recherche non accessible",
                    "search.loading": "Chargement en cours",
                  },
                  de: {
                    "control.sidebar": "Seitenleiste",
                    "control.theme-toggle": "Darstellung wechseln",
                    "control.prev": "Vorherige Seite",
                    "control.next": "Nächste Seite",
                    "control.select": "Auswählen",
                    "control.move": "Bewegen",
                    "control.zoom-out": "Zoom Out",
                    "control.zoom-in": "Zoom In",
                    "control.actual-size": "Tatsächliche Grösse",
                    "control.fit-width": "Breite füllend",
                    "control.fit-height": "Höhe füllend",
                    "control.fit-page": "Seite füllend",
                    "control.auto": "Automatisch",
                    "control.fullscreen": "Ganzer Bildschirm",
                    "control.thumbnails": "Mini-Ansichten",
                    "control.bookmarks": "Lesezeichen",
                    "control.presentation": "Präsentationsdarstellung",
                    "control.magazine": "Magazindarstellung",
                    "control.continuous": "Fortlaufende Darstellung",
                    "control.search": "Suchen",
                    "control.page": "Seite",
                    "search.search": "Suchen",
                    "search.match-case": "Gross-/Kleinschreibung beachten",
                    "search.limit-results-1":
                      "Auf 1 Resultat pro Seite begrenzen",
                    "search.limit-results-500":
                      "Auf die ersten 500 Resultate begrenzen.",
                    "search.unavailable": "Suche nicht verfügbar.",
                    "search.loading": "Lade",
                  },
                  hi: {
                    "control.sidebar": "साइडबार",
                    "control.theme-toggle": "विषय टॉगल",
                    "control.prev": "पिछला पृष्ठ",
                    "control.next": "अगला पृष्ठ",
                    "control.select": "चुनते हैं",
                    "control.move": "पान",
                    "control.zoom-out": "छोटा करें",
                    "control.zoom-in": "बड़ा करें",
                    "control.actual-size": "वास्तविक आकार",
                    "control.fit-width": "चौड़ाई पर फ़िट",
                    "control.fit-height": "ठीक ऊंचाई",
                    "control.fit-page": "फिट पेज",
                    "control.auto": "स्वचालित",
                    "control.fullscreen": "पूर्ण स्क्रीन",
                    "control.thumbnails": "थंबनेल",
                    "control.bookmarks": "बुकमार्क",
                    "control.presentation": "प्रदर्शन",
                    "control.magazine": "पत्रिका",
                    "control.continuous": "निरंतर",
                    "control.search": "खोज",
                    "control.page": "पृष्ठ",
                    "search.search": "खोज",
                    "search.match-case": "मिलान घटना",
                    "search.limit-results-1": "सीमा परिणाम 1 प्रति पृष्ठ",
                    "search.limit-results-500": "पहले 500 परिणामों तक सीमित है",
                    "search.unavailable": "उपलब्ध नहीं खोजें।",
                    "search.loading": "लोड हो रहा है",
                  },
                },
                t = (navigator.language || navigator.userLanguage).substr(0, 2),
                n = !!e[t] && e[t];
              return {
                getTranslation: function (e) {
                  return n ? n[e] : null;
                },
                updateElements: function () {
                  if (n) {
                    let e, o;
                    document.documentElement.setAttribute("lang", t);
                    const r = document.querySelectorAll("[data-lang-title]");
                    for (e = 0; e < r.length; e++)
                      (o = r[e]),
                        n[o.dataset.langTitle] &&
                          (o.title = n[o.dataset.langTitle]);
                    const i = document.querySelectorAll("[data-lang-text]");
                    for (e = 0; e < i.length; e++)
                      (o = i[e]),
                        n[o.dataset.langText] &&
                          (o.innerText = n[o.dataset.langText]);
                  }
                },
              };
            })(),
            t = function (e) {
              return document.getElementById(e);
            },
            n = function (e, t) {
              const n = 0 !== e.className.length ? e.className.split(" ") : [];
              -1 === n.indexOf(t) && (n.push(t), (e.className = n.join(" ")));
            },
            o = function (e, t) {
              const n = 0 !== e.className.length ? e.className.split(" ") : [],
                o = n.indexOf(t);
              -1 !== o && n.splice(o, 1), (e.className = n.join(" "));
            },
            r = function (e, t) {
              const n = 0 !== e.className.length ? e.className.split(" ") : [],
                o = n.indexOf(t);
              let r;
              return (
                -1 === o ? (n.push(t), (r = !0)) : (n.splice(o, 1), (r = !1)),
                (e.className = n.join(" ")),
                r
              );
            },
            i = (function () {
              const e = {},
                n = {};
              let o, i, a;
              return (
                IDRViewer.on("ready", function (r) {
                  t("btnSideToggle").addEventListener("click", e.toggleSidebar),
                    (o = t("sidebar"));
                  for (let e in n)
                    n[e].setup(r), e === i ? n[e].show() : n[e].hide();
                  a = i;
                }),
                (e.register = function (e, t, o) {
                  (n[e] = t), o && (i = e);
                }),
                (e.switchTo = function (e) {
                  a !== e && (n[a].hide(), (a = e), n[a].show());
                }),
                (e.openSidebar = function () {
                  -1 === o.className.indexOf("open") && e.toggleSidebar();
                }),
                (e.toggleSidebar = function () {
                  r(o, "open") && n[a].show();
                }),
                e
              );
            })();
          !(function () {
            let r, a, s, l, c, u, d, h, g, f;
            const p = function (e) {
                const t = IDRViewer.selectSearchResult(
                  parseInt(this.dataset.page),
                  parseInt(this.dataset.index)
                );
                t && (c.innerText = String(t)), e.preventDefault();
              },
              m = function (e) {
                return e
                  .replace(/&/g, "&amp;")
                  .replace(/>/g, "&gt;")
                  .replace(/</g, "&lt;");
              },
              v = function () {
                const t = document.getElementById("searchResults");
                t.innerText = "";
                const n = l.value,
                  o = g.checked,
                  r = f.checked,
                  i = IDRViewer.search(n, o, r, !0);
                var a;
                (u.innerText = String(i.length)),
                  (c.innerText = "0"),
                  (a = 0 === i.length),
                  (d.disabled = a),
                  (h.disabled = a);
                const s = document.createDocumentFragment();
                for (let e = 0; e < i.length && e < 500; e++) {
                  const t = i[e].page,
                    n = i[e].index,
                    o = document.createElement("a");
                  (o.href = "?page=" + t),
                    (o.innerHTML =
                      t +
                      " - " +
                      m(i[e].preSnippet) +
                      "<b>" +
                      m(i[e].result) +
                      "</b>" +
                      m(i[e].postSnippet)),
                    (o.className = "result"),
                    (o.dataset.page = t),
                    (o.dataset.index = n),
                    o.addEventListener("click", p),
                    s.appendChild(o);
                }
                if (i.length >= 500) {
                  const t = document.createElement("span");
                  (t.innerText =
                    e.getTranslation("search.limit-results-500") ||
                    "Limited to first 500 results."),
                    (t.className = "result"),
                    s.appendChild(t);
                }
                t.appendChild(s);
              };
            i.register("search", {
              setup: function () {
                (a = t("btnSearch")),
                  a.addEventListener("click", function () {
                    i.switchTo("search");
                  }),
                  (r = t("search-panel")),
                  (l = t("searchInput")),
                  (c = t("searchHighlightSelected")),
                  (u = t("searchHighlightTotal")),
                  (d = t("nextHighlight")),
                  (h = t("prevHighlight")),
                  (g = t("cbMatchCase")),
                  (f = t("cbLimitResults")),
                  (l.value = e.getTranslation("search.loading") || "Loading"),
                  (l.disabled = "disabled"),
                  l.addEventListener("input", v),
                  l.addEventListener("keydown", function (e) {
                    switch (e.key) {
                      case "Esc":
                      case "Escape":
                        "" !== l.value
                          ? ((l.value = ""), v())
                          : (l.blur(), i.toggleSidebar());
                        break;
                      case "Enter":
                        e.shiftKey
                          ? IDRViewer.prevSearchResult()
                          : IDRViewer.nextSearchResult();
                    }
                  }),
                  g.addEventListener("click", v),
                  f.addEventListener("click", v),
                  d.addEventListener("click", function () {
                    IDRViewer.nextSearchResult();
                  }),
                  h.addEventListener("click", function () {
                    IDRViewer.prevSearchResult();
                  }),
                  document.addEventListener("keydown", function (e) {
                    "f" === e.key &&
                      (e.ctrlKey || e.metaKey) &&
                      (i.openSidebar(),
                      i.switchTo("search"),
                      l.focus(),
                      l.select(),
                      e.preventDefault());
                  }),
                  IDRViewer.on("searchresultselected", function (e) {
                    c.innerText = e.resultIndex + 1;
                  });
              },
              show: function () {
                o(r, "hidden"), n(a, "disabled");
                s ||
                  ((s = !0),
                  IDRViewer.loadSearch(
                    function (t) {
                      t
                        ? ((l.value = ""), (l.disabled = ""), l.focus())
                        : (l.value =
                            e.getTranslation("search.unavailable") ||
                            "Search not available.");
                    },
                    function (t) {
                      l.value =
                        (e.getTranslation("search.loading") || "Loading") +
                        " (" +
                        t +
                        "%)";
                    }
                  )),
                  l.focus();
              },
              hide: function () {
                n(r, "hidden"), o(a, "disabled");
              },
            });
          })(),
            (function () {
              const r = [],
                a = [];
              let s,
                l,
                c,
                u,
                d,
                h,
                g,
                f,
                p = !0;
              const m = function () {
                  f || (f = setInterval(v, 250)),
                    g && clearTimeout(g),
                    (g = setTimeout(b, 500));
                },
                v = function () {
                  const e = s.scrollTop,
                    t = e + s.clientHeight;
                  for (let i = 0; i < u; i++)
                    r[i] ||
                      (a[i] + 160 > e && a[i] < t
                        ? n(s.children[i].firstChild, "spinning")
                        : o(s.children[i].firstChild, "spinning"));
                },
                b = function () {
                  f && (f = clearInterval(f)), (g = null);
                  for (let e = 0; e < u; e++)
                    if (!r[e]) {
                      const t = s.children[e];
                      if (t.offsetTop > s.scrollTop + s.clientHeight) break;
                      t.offsetTop + t.clientHeight > s.scrollTop &&
                        ((t.innerHTML =
                          '<img src="' +
                          h +
                          "thumbnails/" +
                          (e + 1) +
                          "." +
                          c +
                          '" />'),
                        (r[e] = !0));
                    }
                };
              IDRViewer.on("pagechange", function (e) {
                (d = e.page),
                  -1 === s.className.indexOf("hidden") && y(),
                  (p = !0);
              });
              const y = function () {
                const e = s.children[d - 1];
                if (-1 === e.className.indexOf("currentPageThumbnail")) {
                  for (let e = 0; e < u; e++)
                    o(s.children[e], "currentPageThumbnail");
                  n(e, "currentPageThumbnail"),
                    p &&
                      (s.scrollTop =
                        s.scrollTop +
                        e.getBoundingClientRect().top -
                        s.getBoundingClientRect().top);
                }
              };
              i.register(
                "thumbnails",
                {
                  setup: function (n) {
                    (l = t("btnThumbnails")),
                      l.addEventListener("click", function () {
                        i.switchTo("thumbnails");
                      }),
                      (s = t("thumbnails-panel")),
                      s.addEventListener("scroll", m),
                      (d = n.page),
                      (u = n.pagecount),
                      (c = n.thumbnailType),
                      (h = n.url || ""),
                      (function (t) {
                        const n = [];
                        for (let e = 0; e < t.length; e++) {
                          const o = Math.floor(t[e][1] * (160 / t[e][0]));
                          n[e] = t[e][0] > t[e][1] || o <= 200 ? o : 200;
                        }
                        const o = function (e) {
                          (p = !1),
                            IDRViewer.goToPage(this.dataset.page),
                            e.preventDefault();
                        };
                        for (let r = 1; r <= t.length; r++) {
                          const t = document.createElement("a");
                          (t.style.height = n[r - 1] + "px"),
                            (t.className = "thumbnail"),
                            (t.href = "?page=" + r),
                            (t.id = "thumb" + r),
                            (t.dataset.page = String(r)),
                            t.addEventListener("click", o),
                            t.setAttribute(
                              "title",
                              (e.getTranslation("control.page") || "Page") +
                                " " +
                                r
                            );
                          const i = Math.floor((n[r - 1] - 42) / 2);
                          (t.innerHTML =
                            '<div class="spinner" style="margin-top: ' +
                            i +
                            'px;"></div>'),
                            s.appendChild(t);
                        }
                        for (let e = 1; e <= t.length; e++)
                          a[e - 1] = s.children[e - 1].offsetTop;
                      })(n.bounds);
                    for (let e = 0; e < u; e++) r[e] = !1;
                  },
                  show: function () {
                    o(s, "hidden"),
                      n(l, "disabled"),
                      setTimeout(v, 250),
                      b(),
                      y();
                  },
                  hide: function () {
                    n(s, "hidden"), o(l, "disabled");
                  },
                },
                !0
              );
            })(),
            (function () {
              let e, r;
              const a = function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    2 !== e.detail
                      ? IDRViewer.goToPage(
                          parseInt(this.dataset.page),
                          this.dataset.zoom
                        )
                      : this.parentElement.classList.toggle("open");
                },
                s = function (e, t) {
                  const n = document.createElement("div");
                  n.classList.add("bookmark-container");
                  for (let e = 0; e < t.length; e++) {
                    const o = t[e],
                      r = document.createElement("div");
                    r.classList.add("bookmark-item");
                    const i = document.createElement("a");
                    if (
                      ((i.title = "Page " + o.page),
                      (i.innerText = o.title),
                      (i.dataset.page = o.page),
                      (i.dataset.zoom = o.zoom),
                      (i.href = "?page=" + i.dataset.page),
                      i.addEventListener("click", a),
                      r.appendChild(i),
                      n.appendChild(r),
                      void 0 !== o.children)
                    ) {
                      r.classList.add("parent");
                      const e = document.createElement("div");
                      e.classList.add("toggle"),
                        r.prepend(e),
                        e.addEventListener("click", function (e) {
                          e.preventDefault(),
                            e.stopPropagation(),
                            this.parentElement.classList.toggle("open");
                        }),
                        s(r, o.children);
                    }
                  }
                  e.appendChild(n);
                };
              i.register("bookmarks", {
                setup: function (o) {
                  (r = t("btnBookmarks")),
                    r.addEventListener("click", function () {
                      i.switchTo("bookmarks");
                    }),
                    (e = t("bookmarks-panel")),
                    o.bookmarks.length > 0 ? s(e, o.bookmarks) : n(r, "hidden");
                },
                show: function () {
                  o(e, "hidden"), n(r, "disabled");
                },
                hide: function () {
                  n(e, "hidden"), o(r, "disabled");
                },
              });
            })(),
            (function () {
              let e, r, i, a, s, l, c;
              const u = function () {
                  IDRViewer.goToPage(
                    parseInt(s.options[s.selectedIndex].value)
                  ),
                    this.blur();
                },
                d = function (t, n) {
                  let o = "/ " + n;
                  return e && (o = "(" + t + " / " + n + ")"), o;
                },
                h = function (e) {
                  if (
                    null == document.activeElement ||
                    "INPUT" !== document.activeElement.tagName
                  )
                    switch (e.keyCode) {
                      case 33:
                        IDRViewer.prev(), e.preventDefault();
                        break;
                      case 34:
                        IDRViewer.next(), e.preventDefault();
                        break;
                      case 37:
                        a ? IDRViewer.next() : IDRViewer.prev(),
                          e.preventDefault();
                        break;
                      case 39:
                        a ? IDRViewer.prev() : IDRViewer.next(),
                          e.preventDefault();
                        break;
                      case 36:
                        IDRViewer.goToPage(1), e.preventDefault();
                        break;
                      case 35:
                        IDRViewer.goToPage(i), e.preventDefault();
                    }
                },
                g = function (e) {
                  (r.innerText = d(e.page, e.pagecount)),
                    (s.selectedIndex = e.page - 1),
                    e.isFirstPage ? n(c, "disabled") : o(c, "disabled"),
                    e.isLastPage ? n(l, "disabled") : o(l, "disabled");
                };
              IDRViewer.on("ready", function (o) {
                (e = !!o.pageLabels.length),
                  (i = o.pagecount),
                  (a = o.isR2L),
                  (r = t("pgCount")),
                  (s = t("btnGo")),
                  (c = t("btnPrev")),
                  (l = t("btnNext")),
                  o.isFirstPage && n(c, "disabled"),
                  o.isLastPage && n(l, "disabled"),
                  s.addEventListener("change", u),
                  c.addEventListener("click", function (e) {
                    IDRViewer.prev(), e.preventDefault();
                  }),
                  l.addEventListener("click", function (e) {
                    IDRViewer.next(), e.preventDefault();
                  }),
                  o.isR2L &&
                    (function () {
                      l.parentNode.insertBefore(c, l),
                        c.parentNode.insertBefore(l, c.parentNode.firstChild);
                      const e = l.innerHTML;
                      (l.innerHTML = c.innerHTML), (c.innerHTML = e);
                    })(),
                  document.addEventListener("keydown", h),
                  (function (e, t, n) {
                    s.innerText = "";
                    for (let e = 1; e <= t; e++) {
                      const t = document.createElement("option");
                      (t.value = String(e)),
                        (t.innerText = n.length ? n[e - 1] : String(e)),
                        s.appendChild(t);
                    }
                    s.selectedIndex = e - 1;
                  })(o.page, o.pagecount, o.pageLabels),
                  (r.innerText = d(o.page, o.pagecount)),
                  IDRViewer.on("pagechange", g);
              });
            })(),
            (function () {
              let e, r, i;
              const a = function (t) {
                  (e.value = t.zoomType),
                    (e.options[0].innerText =
                      Math.floor(100 * t.zoomValue) + "%"),
                    t.isMinZoom ? n(i, "disabled") : o(i, "disabled"),
                    t.isMaxZoom ? n(r, "disabled") : o(r, "disabled");
                },
                s = function () {
                  const t = e.value;
                  t !== IDRViewer.ZOOM_SPECIFIC && IDRViewer.setZoom(t),
                    this.blur();
                };
              IDRViewer.on("ready", function () {
                (e = t("btnZoom")),
                  (r = t("btnZoomIn")),
                  (i = t("btnZoomOut")),
                  e.addEventListener("change", s),
                  r.addEventListener("click", function (e) {
                    IDRViewer.zoomIn(), e.preventDefault();
                  }),
                  i.addEventListener("click", function (e) {
                    IDRViewer.zoomOut(), e.preventDefault();
                  }),
                  document.addEventListener("keydown", function (e) {
                    (e.ctrlKey || e.metaKey) &&
                      ("0" === e.key
                        ? (IDRViewer.setZoom(IDRViewer.ZOOM_AUTO),
                          e.preventDefault())
                        : "-" === e.key
                        ? (IDRViewer.zoomOut(), e.preventDefault())
                        : ("+" !== e.key && "=" !== e.key) ||
                          (IDRViewer.zoomIn(), e.preventDefault()));
                  }),
                  document.addEventListener(
                    "wheel",
                    function (e) {
                      (e.ctrlKey || e.metaKey) &&
                        (e.deltaY > 0
                          ? (IDRViewer.zoomOut(), e.preventDefault())
                          : e.deltaY < 0 &&
                            (IDRViewer.zoomIn(), e.preventDefault()));
                    },
                    { passive: !1 }
                  ),
                  (e.value = IDRViewer.ZOOM_AUTO),
                  IDRViewer.on("zoomchange", a);
              });
            })(),
            (function () {
              let o;
              const r = function () {
                IDRViewer.setLayout(o.value), this.blur();
              };
              IDRViewer.on("ready", function (i) {
                (o = t("btnView")),
                  (function (t, i, a) {
                    if (a.length > 1 && t > 1) {
                      let t = document.createElement("option");
                      (t.innerText =
                        e.getTranslation("control.presentation") ||
                        "Presentation"),
                        (t.value = IDRViewer.LAYOUT_PRESENTATION),
                        o.appendChild(t),
                        -1 !== a.indexOf(IDRViewer.LAYOUT_MAGAZINE) &&
                          ((t = document.createElement("option")),
                          (t.innerText =
                            e.getTranslation("control.magazine") || "Magazine"),
                          (t.value = IDRViewer.LAYOUT_MAGAZINE),
                          o.appendChild(t)),
                        -1 !== a.indexOf(IDRViewer.LAYOUT_CONTINUOUS) &&
                          ((t = document.createElement("option")),
                          (t.innerText =
                            e.getTranslation("control.continuous") ||
                            "Continuous"),
                          (t.value = IDRViewer.LAYOUT_CONTINUOUS),
                          o.appendChild(t)),
                        o.addEventListener("change", r),
                        (o.value = i);
                    } else n(o, "hidden");
                  })(i.pagecount, i.layout, i.availableLayouts);
              });
            })(),
            (function () {
              let e, r;
              const i = function (t) {
                  switch (t) {
                    case IDRViewer.SELECT_PAN:
                      o(r, "disabled"), n(e, "disabled");
                      break;
                    case IDRViewer.SELECT_SELECT:
                      o(e, "disabled"), n(r, "disabled");
                  }
                },
                a = function (e) {
                  i(e.type);
                };
              IDRViewer.on("ready", function (n) {
                (e = t("btnMove")),
                  (r = t("btnSelect")),
                  e.addEventListener("click", function (e) {
                    IDRViewer.setSelectMode(IDRViewer.SELECT_PAN),
                      e.preventDefault();
                  }),
                  r.addEventListener("click", function (e) {
                    IDRViewer.setSelectMode(IDRViewer.SELECT_SELECT),
                      e.preventDefault();
                  }),
                  i(n.selectMode),
                  IDRViewer.on("selectchange", a);
              });
            })(),
            IDRViewer.on("ready", function (r) {
              e.updateElements(),
                (document.title = r.title ? r.title : r.fileName),
                t("btnThemeToggle").addEventListener("click", function () {
                  const e =
                    -1 !== document.body.className.indexOf("dark-theme");
                  o(document.body, "light-theme"),
                    o(document.body, "dark-theme"),
                    n(document.body, e ? "light-theme" : "dark-theme");
                });
              const i = t("btnFullScreen");
              IDRViewer.isFullscreenEnabled()
                ? i.addEventListener("click", function (e) {
                    IDRViewer.toggleFullScreen(), e.preventDefault();
                  })
                : n(i, "hidden"),
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                ) && n(document.body, "is-mobile");
            });
        })();
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var i = (t[o] = { exports: {} });
    return e[o](i, i.exports, n), i.exports;
  }
  n(800), n(334), n(167), n(876), n(452), n(685);
})();

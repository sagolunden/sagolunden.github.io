// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/jquery.stellar.min.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! Stellar.js v0.6.1 | Copyright 2013, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */
(function (e, t, n, r) {
  function d(t, n) {
    this.element = t, this.options = e.extend({}, s, n), this._defaults = s, this._name = i, this.init();
  }

  var i = "stellar",
      s = {
    scrollProperty: "scroll",
    positionProperty: "position",
    horizontalScrolling: !0,
    verticalScrolling: !0,
    horizontalOffset: 0,
    verticalOffset: 0,
    responsive: !1,
    parallaxBackgrounds: !0,
    parallaxElements: !0,
    hideDistantElements: !0,
    hideElement: function hideElement(e) {
      e.hide();
    },
    showElement: function showElement(e) {
      e.show();
    }
  },
      o = {
    scroll: {
      getLeft: function getLeft(e) {
        return e.scrollLeft();
      },
      setLeft: function setLeft(e, t) {
        e.scrollLeft(t);
      },
      getTop: function getTop(e) {
        return e.scrollTop();
      },
      setTop: function setTop(e, t) {
        e.scrollTop(t);
      }
    },
    position: {
      getLeft: function getLeft(e) {
        return parseInt(e.css("left"), 10) * -1;
      },
      getTop: function getTop(e) {
        return parseInt(e.css("top"), 10) * -1;
      }
    },
    margin: {
      getLeft: function getLeft(e) {
        return parseInt(e.css("margin-left"), 10) * -1;
      },
      getTop: function getTop(e) {
        return parseInt(e.css("margin-top"), 10) * -1;
      }
    },
    transform: {
      getLeft: function getLeft(e) {
        var t = getComputedStyle(e[0])[f];
        return t !== "none" ? parseInt(t.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0;
      },
      getTop: function getTop(e) {
        var t = getComputedStyle(e[0])[f];
        return t !== "none" ? parseInt(t.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0;
      }
    }
  },
      u = {
    position: {
      setLeft: function setLeft(e, t) {
        e.css("left", t);
      },
      setTop: function setTop(e, t) {
        e.css("top", t);
      }
    },
    transform: {
      setPosition: function setPosition(e, t, n, r, i) {
        e[0].style[f] = "translate3d(" + (t - n) + "px, " + (r - i) + "px, 0)";
      }
    }
  },
      a = function () {
    var t = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
        n = e("script")[0].style,
        r = "",
        i;

    for (i in n) {
      if (t.test(i)) {
        r = i.match(t)[0];
        break;
      }
    }

    return "WebkitOpacity" in n && (r = "Webkit"), "KhtmlOpacity" in n && (r = "Khtml"), function (e) {
      return r + (r.length > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e);
    };
  }(),
      f = a("transform"),
      l = e("<div />").css("background-position-x") !== r,
      c = l ? function (e, t, n) {
    e.css({
      "background-position-x": t,
      "background-position-y": n
    });
  } : function (e, t, n) {
    e.css("background-position", t + " " + n);
  },
      h = l ? function (e) {
    return [e.css("background-position-x"), e.css("background-position-y")];
  } : function (e) {
    return e.css("background-position").split(" ");
  },
      p = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function (e) {
    setTimeout(e, 1e3 / 60);
  };

  d.prototype = {
    init: function init() {
      this.options.name = i + "_" + Math.floor(Math.random() * 1e9), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({
        firstLoad: !0
      }), this.options.scrollProperty === "scroll" ? this._handleScrollEvent() : this._startAnimationLoop();
    },
    _defineElements: function _defineElements() {
      this.element === n.body && (this.element = t), this.$scrollElement = e(this.element), this.$element = this.element === t ? e("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== r ? e(this.options.viewportElement) : this.$scrollElement[0] === t || this.options.scrollProperty === "scroll" ? this.$scrollElement : this.$scrollElement.parent();
    },
    _defineGetters: function _defineGetters() {
      var e = this,
          t = o[e.options.scrollProperty];
      this._getScrollLeft = function () {
        return t.getLeft(e.$scrollElement);
      }, this._getScrollTop = function () {
        return t.getTop(e.$scrollElement);
      };
    },
    _defineSetters: function _defineSetters() {
      var t = this,
          n = o[t.options.scrollProperty],
          r = u[t.options.positionProperty],
          i = n.setLeft,
          s = n.setTop;
      this._setScrollLeft = typeof i == "function" ? function (e) {
        i(t.$scrollElement, e);
      } : e.noop, this._setScrollTop = typeof s == "function" ? function (e) {
        s(t.$scrollElement, e);
      } : e.noop, this._setPosition = r.setPosition || function (e, n, i, s, o) {
        t.options.horizontalScrolling && r.setLeft(e, n, i), t.options.verticalScrolling && r.setTop(e, s, o);
      };
    },
    _handleWindowLoadAndResize: function _handleWindowLoadAndResize() {
      var n = this,
          r = e(t);
      n.options.responsive && r.bind("load." + this.name, function () {
        n.refresh();
      }), r.bind("resize." + this.name, function () {
        n._detectViewport(), n.options.responsive && n.refresh();
      });
    },
    refresh: function refresh(n) {
      var r = this,
          i = r._getScrollLeft(),
          s = r._getScrollTop();

      (!n || !n.firstLoad) && this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), n && n.firstLoad && /WebKit/.test(navigator.userAgent) && e(t).load(function () {
        var e = r._getScrollLeft(),
            t = r._getScrollTop();

        r._setScrollLeft(e + 1), r._setScrollTop(t + 1), r._setScrollLeft(e), r._setScrollTop(t);
      }), this._setScrollLeft(i), this._setScrollTop(s);
    },
    _detectViewport: function _detectViewport() {
      var e = this.$viewportElement.offset(),
          t = e !== null && e !== r;
      this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = t ? e.top : 0, this.viewportOffsetLeft = t ? e.left : 0;
    },
    _findParticles: function _findParticles() {
      var t = this,
          n = this._getScrollLeft(),
          i = this._getScrollTop();

      if (this.particles !== r) for (var s = this.particles.length - 1; s >= 0; s--) {
        this.particles[s].$element.data("stellar-elementIsActive", r);
      }
      this.particles = [];
      if (!this.options.parallaxElements) return;
      this.$element.find("[data-stellar-ratio]").each(function (n) {
        var i = e(this),
            s,
            o,
            u,
            a,
            f,
            l,
            c,
            h,
            p,
            d = 0,
            v = 0,
            m = 0,
            g = 0;
        if (!i.data("stellar-elementIsActive")) i.data("stellar-elementIsActive", this);else if (i.data("stellar-elementIsActive") !== this) return;
        t.options.showElement(i), i.data("stellar-startingLeft") ? (i.css("left", i.data("stellar-startingLeft")), i.css("top", i.data("stellar-startingTop"))) : (i.data("stellar-startingLeft", i.css("left")), i.data("stellar-startingTop", i.css("top"))), u = i.position().left, a = i.position().top, f = i.css("margin-left") === "auto" ? 0 : parseInt(i.css("margin-left"), 10), l = i.css("margin-top") === "auto" ? 0 : parseInt(i.css("margin-top"), 10), h = i.offset().left - f, p = i.offset().top - l, i.parents().each(function () {
          var t = e(this);
          if (t.data("stellar-offset-parent") === !0) return d = m, v = g, c = t, !1;
          m += t.position().left, g += t.position().top;
        }), s = i.data("stellar-horizontal-offset") !== r ? i.data("stellar-horizontal-offset") : c !== r && c.data("stellar-horizontal-offset") !== r ? c.data("stellar-horizontal-offset") : t.horizontalOffset, o = i.data("stellar-vertical-offset") !== r ? i.data("stellar-vertical-offset") : c !== r && c.data("stellar-vertical-offset") !== r ? c.data("stellar-vertical-offset") : t.verticalOffset, t.particles.push({
          $element: i,
          $offsetParent: c,
          isFixed: i.css("position") === "fixed",
          horizontalOffset: s,
          verticalOffset: o,
          startingPositionLeft: u,
          startingPositionTop: a,
          startingOffsetLeft: h,
          startingOffsetTop: p,
          parentOffsetLeft: d,
          parentOffsetTop: v,
          stellarRatio: i.data("stellar-ratio") !== r ? i.data("stellar-ratio") : 1,
          width: i.outerWidth(!0),
          height: i.outerHeight(!0),
          isHidden: !1
        });
      });
    },
    _findBackgrounds: function _findBackgrounds() {
      var t = this,
          n = this._getScrollLeft(),
          i = this._getScrollTop(),
          s;

      this.backgrounds = [];
      if (!this.options.parallaxBackgrounds) return;
      s = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (s = s.add(this.$element)), s.each(function () {
        var s = e(this),
            o = h(s),
            u,
            a,
            f,
            l,
            p,
            d,
            v,
            m,
            g,
            y = 0,
            b = 0,
            w = 0,
            E = 0;
        if (!s.data("stellar-backgroundIsActive")) s.data("stellar-backgroundIsActive", this);else if (s.data("stellar-backgroundIsActive") !== this) return;
        s.data("stellar-backgroundStartingLeft") ? c(s, s.data("stellar-backgroundStartingLeft"), s.data("stellar-backgroundStartingTop")) : (s.data("stellar-backgroundStartingLeft", o[0]), s.data("stellar-backgroundStartingTop", o[1])), p = s.css("margin-left") === "auto" ? 0 : parseInt(s.css("margin-left"), 10), d = s.css("margin-top") === "auto" ? 0 : parseInt(s.css("margin-top"), 10), v = s.offset().left - p - n, m = s.offset().top - d - i, s.parents().each(function () {
          var t = e(this);
          if (t.data("stellar-offset-parent") === !0) return y = w, b = E, g = t, !1;
          w += t.position().left, E += t.position().top;
        }), u = s.data("stellar-horizontal-offset") !== r ? s.data("stellar-horizontal-offset") : g !== r && g.data("stellar-horizontal-offset") !== r ? g.data("stellar-horizontal-offset") : t.horizontalOffset, a = s.data("stellar-vertical-offset") !== r ? s.data("stellar-vertical-offset") : g !== r && g.data("stellar-vertical-offset") !== r ? g.data("stellar-vertical-offset") : t.verticalOffset, t.backgrounds.push({
          $element: s,
          $offsetParent: g,
          isFixed: s.css("background-attachment") === "fixed",
          horizontalOffset: u,
          verticalOffset: a,
          startingValueLeft: o[0],
          startingValueTop: o[1],
          startingBackgroundPositionLeft: isNaN(parseInt(o[0], 10)) ? 0 : parseInt(o[0], 10),
          startingBackgroundPositionTop: isNaN(parseInt(o[1], 10)) ? 0 : parseInt(o[1], 10),
          startingPositionLeft: s.position().left,
          startingPositionTop: s.position().top,
          startingOffsetLeft: v,
          startingOffsetTop: m,
          parentOffsetLeft: y,
          parentOffsetTop: b,
          stellarRatio: s.data("stellar-background-ratio") === r ? 1 : s.data("stellar-background-ratio")
        });
      });
    },
    _reset: function _reset() {
      var e, t, n, r, i;

      for (i = this.particles.length - 1; i >= 0; i--) {
        e = this.particles[i], t = e.$element.data("stellar-startingLeft"), n = e.$element.data("stellar-startingTop"), this._setPosition(e.$element, t, t, n, n), this.options.showElement(e.$element), e.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
      }

      for (i = this.backgrounds.length - 1; i >= 0; i--) {
        r = this.backgrounds[i], r.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), c(r.$element, r.startingValueLeft, r.startingValueTop);
      }
    },
    destroy: function destroy() {
      this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = e.noop, e(t).unbind("load." + this.name).unbind("resize." + this.name);
    },
    _setOffsets: function _setOffsets() {
      var n = this,
          r = e(t);
      r.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), typeof this.options.horizontalOffset == "function" ? (this.horizontalOffset = this.options.horizontalOffset(), r.bind("resize.horizontal-" + this.name, function () {
        n.horizontalOffset = n.options.horizontalOffset();
      })) : this.horizontalOffset = this.options.horizontalOffset, typeof this.options.verticalOffset == "function" ? (this.verticalOffset = this.options.verticalOffset(), r.bind("resize.vertical-" + this.name, function () {
        n.verticalOffset = n.options.verticalOffset();
      })) : this.verticalOffset = this.options.verticalOffset;
    },
    _repositionElements: function _repositionElements() {
      var e = this._getScrollLeft(),
          t = this._getScrollTop(),
          n,
          r,
          i,
          s,
          o,
          u,
          a,
          f = !0,
          l = !0,
          h,
          p,
          d,
          v,
          m;

      if (this.currentScrollLeft === e && this.currentScrollTop === t && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) return;
      this.currentScrollLeft = e, this.currentScrollTop = t, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight;

      for (m = this.particles.length - 1; m >= 0; m--) {
        i = this.particles[m], s = i.isFixed ? 1 : 0, this.options.horizontalScrolling ? (h = (e + i.horizontalOffset + this.viewportOffsetLeft + i.startingPositionLeft - i.startingOffsetLeft + i.parentOffsetLeft) * -(i.stellarRatio + s - 1) + i.startingPositionLeft, d = h - i.startingPositionLeft + i.startingOffsetLeft) : (h = i.startingPositionLeft, d = i.startingOffsetLeft), this.options.verticalScrolling ? (p = (t + i.verticalOffset + this.viewportOffsetTop + i.startingPositionTop - i.startingOffsetTop + i.parentOffsetTop) * -(i.stellarRatio + s - 1) + i.startingPositionTop, v = p - i.startingPositionTop + i.startingOffsetTop) : (p = i.startingPositionTop, v = i.startingOffsetTop), this.options.hideDistantElements && (l = !this.options.horizontalScrolling || d + i.width > (i.isFixed ? 0 : e) && d < (i.isFixed ? 0 : e) + this.viewportWidth + this.viewportOffsetLeft, f = !this.options.verticalScrolling || v + i.height > (i.isFixed ? 0 : t) && v < (i.isFixed ? 0 : t) + this.viewportHeight + this.viewportOffsetTop), l && f ? (i.isHidden && (this.options.showElement(i.$element), i.isHidden = !1), this._setPosition(i.$element, h, i.startingPositionLeft, p, i.startingPositionTop)) : i.isHidden || (this.options.hideElement(i.$element), i.isHidden = !0);
      }

      for (m = this.backgrounds.length - 1; m >= 0; m--) {
        o = this.backgrounds[m], s = o.isFixed ? 0 : 1, u = this.options.horizontalScrolling ? (e + o.horizontalOffset - this.viewportOffsetLeft - o.startingOffsetLeft + o.parentOffsetLeft - o.startingBackgroundPositionLeft) * (s - o.stellarRatio) + "px" : o.startingValueLeft, a = this.options.verticalScrolling ? (t + o.verticalOffset - this.viewportOffsetTop - o.startingOffsetTop + o.parentOffsetTop - o.startingBackgroundPositionTop) * (s - o.stellarRatio) + "px" : o.startingValueTop, c(o.$element, u, a);
      }
    },
    _handleScrollEvent: function _handleScrollEvent() {
      var e = this,
          t = !1,
          n = function n() {
        e._repositionElements(), t = !1;
      },
          r = function r() {
        t || (p(n), t = !0);
      };

      this.$scrollElement.bind("scroll." + this.name, r), r();
    },
    _startAnimationLoop: function _startAnimationLoop() {
      var e = this;
      this._animationLoop = function () {
        p(e._animationLoop), e._repositionElements();
      }, this._animationLoop();
    }
  }, e.fn[i] = function (t) {
    var n = arguments;
    if (t === r || _typeof(t) == "object") return this.each(function () {
      e.data(this, "plugin_" + i) || e.data(this, "plugin_" + i, new d(this, t));
    });
    if (typeof t == "string" && t[0] !== "_" && t !== "init") return this.each(function () {
      var r = e.data(this, "plugin_" + i);
      r instanceof d && typeof r[t] == "function" && r[t].apply(r, Array.prototype.slice.call(n, 1)), t === "destroy" && e.data(this, "plugin_" + i, null);
    });
  }, e[i] = function (n) {
    var r = e(t);
    return r.stellar.apply(r, Array.prototype.slice.call(arguments, 0));
  }, e[i].scrollProperty = o, e[i].positionProperty = u, t.Stellar = d;
})(jQuery, this, document);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37297" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/jquery.stellar.min.js"], null)
//# sourceMappingURL=/jquery.stellar.min.cada3298.js.map
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
})({"js/waypoints.min.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
jQuery Waypoints - v1.1.7
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function ($, k, m, i, d) {
  var e = $(i),
      g = "waypoint.reached",
      b = function b(o, n) {
    o.element.trigger(g, n);

    if (o.options.triggerOnce) {
      o.element[k]("destroy");
    }
  },
      h = function h(p, o) {
    if (!o) {
      return -1;
    }

    var n = o.waypoints.length - 1;

    while (n >= 0 && o.waypoints[n].element[0] !== p[0]) {
      n -= 1;
    }

    return n;
  },
      f = [],
      l = function l(n) {
    $.extend(this, {
      element: $(n),
      oldScroll: 0,
      waypoints: [],
      didScroll: false,
      didResize: false,
      doScroll: $.proxy(function () {
        var q = this.element.scrollTop(),
            p = q > this.oldScroll,
            s = this,
            r = $.grep(this.waypoints, function (u, t) {
          return p ? u.offset > s.oldScroll && u.offset <= q : u.offset <= s.oldScroll && u.offset > q;
        }),
            o = r.length;

        if (!this.oldScroll || !q) {
          $[m]("refresh");
        }

        this.oldScroll = q;

        if (!o) {
          return;
        }

        if (!p) {
          r.reverse();
        }

        $.each(r, function (u, t) {
          if (t.options.continuous || u === o - 1) {
            b(t, [p ? "down" : "up"]);
          }
        });
      }, this)
    });
    $(n).bind("scroll.waypoints", $.proxy(function () {
      if (!this.didScroll) {
        this.didScroll = true;
        i.setTimeout($.proxy(function () {
          this.doScroll();
          this.didScroll = false;
        }, this), $[m].settings.scrollThrottle);
      }
    }, this)).bind("resize.waypoints", $.proxy(function () {
      if (!this.didResize) {
        this.didResize = true;
        i.setTimeout($.proxy(function () {
          $[m]("refresh");
          this.didResize = false;
        }, this), $[m].settings.resizeThrottle);
      }
    }, this));
    e.load($.proxy(function () {
      this.doScroll();
    }, this));
  },
      j = function j(n) {
    var o = null;
    $.each(f, function (p, q) {
      if (q.element[0] === n) {
        o = q;
        return false;
      }
    });
    return o;
  },
      c = {
    init: function init(o, n) {
      this.each(function () {
        var u = $.fn[k].defaults.context,
            q,
            t = $(this);

        if (n && n.context) {
          u = n.context;
        }

        if (!$.isWindow(u)) {
          u = t.closest(u)[0];
        }

        q = j(u);

        if (!q) {
          q = new l(u);
          f.push(q);
        }

        var p = h(t, q),
            s = p < 0 ? $.fn[k].defaults : q.waypoints[p].options,
            r = $.extend({}, s, n);
        r.offset = r.offset === "bottom-in-view" ? function () {
          var v = $.isWindow(u) ? $[m]("viewportHeight") : $(u).height();
          return v - $(this).outerHeight();
        } : r.offset;

        if (p < 0) {
          q.waypoints.push({
            element: t,
            offset: null,
            options: r
          });
        } else {
          q.waypoints[p].options = r;
        }

        if (o) {
          t.bind(g, o);
        }

        if (n && n.handler) {
          t.bind(g, n.handler);
        }
      });
      $[m]("refresh");
      return this;
    },
    remove: function remove() {
      return this.each(function (o, p) {
        var n = $(p);
        $.each(f, function (r, s) {
          var q = h(n, s);

          if (q >= 0) {
            s.waypoints.splice(q, 1);

            if (!s.waypoints.length) {
              s.element.unbind("scroll.waypoints resize.waypoints");
              f.splice(r, 1);
            }
          }
        });
      });
    },
    destroy: function destroy() {
      return this.unbind(g)[k]("remove");
    }
  },
      a = {
    refresh: function refresh() {
      $.each(f, function (r, s) {
        var q = $.isWindow(s.element[0]),
            n = q ? 0 : s.element.offset().top,
            p = q ? $[m]("viewportHeight") : s.element.height(),
            o = q ? 0 : s.element.scrollTop();
        $.each(s.waypoints, function (u, x) {
          if (!x) {
            return;
          }

          var t = x.options.offset,
              w = x.offset;

          if (typeof x.options.offset === "function") {
            t = x.options.offset.apply(x.element);
          } else {
            if (typeof x.options.offset === "string") {
              var v = parseFloat(x.options.offset);
              t = x.options.offset.indexOf("%") ? Math.ceil(p * (v / 100)) : v;
            }
          }

          x.offset = x.element.offset().top - n + o - t;

          if (x.options.onlyOnScroll) {
            return;
          }

          if (w !== null && s.oldScroll > w && s.oldScroll <= x.offset) {
            b(x, ["up"]);
          } else {
            if (w !== null && s.oldScroll < w && s.oldScroll >= x.offset) {
              b(x, ["down"]);
            } else {
              if (!w && s.element.scrollTop() > x.offset) {
                b(x, ["down"]);
              }
            }
          }
        });
        s.waypoints.sort(function (u, t) {
          return u.offset - t.offset;
        });
      });
    },
    viewportHeight: function viewportHeight() {
      return i.innerHeight ? i.innerHeight : e.height();
    },
    aggregate: function aggregate() {
      var n = $();
      $.each(f, function (o, p) {
        $.each(p.waypoints, function (q, r) {
          n = n.add(r.element);
        });
      });
      return n;
    }
  };

  $.fn[k] = function (n) {
    if (c[n]) {
      return c[n].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof n === "function" || !n) {
        return c.init.apply(this, arguments);
      } else {
        if (_typeof(n) === "object") {
          return c.init.apply(this, [null, n]);
        } else {
          $.error("Method " + n + " does not exist on jQuery " + k);
        }
      }
    }
  };

  $.fn[k].defaults = {
    continuous: true,
    offset: 0,
    triggerOnce: false,
    context: i
  };

  $[m] = function (n) {
    if (a[n]) {
      return a[n].apply(this);
    } else {
      return a.aggregate();
    }
  };

  $[m].settings = {
    resizeThrottle: 200,
    scrollThrottle: 100
  };
  e.load(function () {
    $[m]("refresh");
  });
})(jQuery, "waypoint", "waypoints", window);
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/waypoints.min.js"], null)
//# sourceMappingURL=/waypoints.min.f7f7b191.js.map
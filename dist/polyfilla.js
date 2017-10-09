/*!
 * Polyfilla.js v1.0.0
 * (c) 2017 Litson Zhang
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Polyfilla = factory());
}(this, (function () {

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var WINDOW = window;
var DOCUMENT = document;
var HEADER = DOCUMENT.head;

var POLYFILLS = {
    promise: {
        state: 1,
        url: 'https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.min.js',

        condition: function condition() {
            return WINDOW.Promise;
        }
    },
    fetch: {
        state: 1,
        url: 'https://cdn.bootcss.com/fetch/2.0.3/fetch.min.js',

        condition: function condition() {
            return WINDOW.fetch;
        }
    }
};

var isExist = function isExist($pf) {
    return $pf && $pf.state;
};

var isPolyfillReady = function isPolyfillReady($pf) {

    if (!isExist($pf) || $pf.state === 0) {
        return true;
    }

    return $pf.condition && $pf.condition();
};

var getPolyfill = function getPolyfill(name) {
    return POLYFILLS[name];
};

var setPolyfillReadyStatus = function setPolyfillReadyStatus($pf) {
    return $pf.state = 0;
};

var loadScript = function loadScript(url, done) {
    var node = DOCUMENT.createElement('script');

    node.onload = node.onerror = node.onabort = function () {
        done && done();

        HEADER.removeChild(node);
        node = node.onload = node.onerror = node.onabort = null;
    };

    HEADER.insertBefore(node, HEADER.firstChild);
    node.src = url;
};

var nextTick = function nextTick(fn) {
    return WINDOW.setTimeout(fn, 0);
};

var config = function config(name, _config) {
    if (typeof name === 'string') {
        var oldConf = POLYFILLS[name] || {};
        POLYFILLS[name] = _extends({}, oldConf, _config);
    } else {
        POLYFILLS = _extends({}, POLYFILLS, name);
    }
};

var PolyfillA = function PolyfillA(polyfills, done) {
    var copyFromPolyfills = polyfills.slice(0);

    function checkIsBoundary() {
        copyFromPolyfills.splice(0, 1);
        !copyFromPolyfills.length && done && done();
    }

    return nextTick(function () {
        return polyfills.forEach(function (item) {
            var $polyfill = getPolyfill(item);

            if (!isPolyfillReady($polyfill)) {
                return loadScript($polyfill.url, function () {
                    setPolyfillReadyStatus($polyfill);
                    checkIsBoundary();
                });
            }

            checkIsBoundary();
        });
    });
};

PolyfillA.config = config;

return PolyfillA;

})));

/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.1
/* ----------------------------------------------- */
import { pJSLoader } from './pjsloader';

'use strict';

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function (destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};

      Object.deepExtend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})();

/* ---------- particles.js functions - start ------------ */

window.particlesJS = function(tag_id, params) {
  pJSLoader.load(tag_id, params);
};

window.particlesJS.load = function(tag_id, path_config_json, callback) {
  pJSLoader.loadJSON(tag_id, path_config_json, callback);
}

window.pJSDom = function () {
  return pJSLoader.pJSDom();
}
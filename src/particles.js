/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.1
/* ----------------------------------------------- */
'use strict';

import { pJS } from "./pjs";
import { isInArray, clamp, hexToRgb } from './pjsutils';

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

window.pJSDom = [];

window.particlesJS = function (tag_id, params) {
  /* no string id? so it's object params, and set the id with default id */
  if (typeof (tag_id) != 'string') {
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if (!tag_id) {
    tag_id = 'particles-js';
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
    pJS_canvas_class = 'particles-js-canvas-el',
    exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if (exist_canvas.length) {
    while (exist_canvas.length > 0) {
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if (canvas != null) {
    let pjs = new pJS(tag_id, params);
    let found = false;

    for (let idx = 0; idx < pJSDom.length; idx++) {

      if (pJSDom[idx].canvas.tag_id == tag_id) {
        found = true;
        pJSDom[idx] = pJS;
      }
    }

    if (!found) {
      pJSDom.push(pjs);
    }
    return pjs;
  }

};

window.particlesJS.load = function (tag_id, path_config_json, callback) {

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if (callback) callback();
      } else {
        console.error('Error pJS - XMLHttpRequest status: ' + xhr.status);
        console.error('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};
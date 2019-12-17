import { pJS } from './pjs';

'use strict';

var pJSDom = [];

export class pJSLoader {
  static pJSDom() {
    if (!pJSDom) {
        pJSLoader.pJSDomSet([]);
    }

    return pJSDom;
  }

  static pJSDomSet(value) {
    pJSDom = value;
  }

  static load(tag_id, params) {
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

      for (let idx = 0; idx < pJSLoader.pJSDom().length; idx++) {

        if (pJSLoader.pJSDom()[idx].canvas.tag_id == tag_id) {
          found = true;
          pJSLoader.pJSDom()[idx] = pJS;
        }
      }

      if (!found) {
        pJSLoader.pJSDom().push(pjs);
      }
      return pjs;
    }
  }

  static loadJSON(tag_id, path_config_json, callback) {
    /* load json config */
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path_config_json);
    xhr.onreadystatechange = function (data) {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var params = JSON.parse(data.currentTarget.response);
          pJSLoader.load(tag_id, params);
          if (callback) callback();
        } else {
          console.error('Error pJS - XMLHttpRequest status: ' + xhr.status);
          console.error('Error pJS - File config not found');
        }
      }
    };
    xhr.send();
  }
}
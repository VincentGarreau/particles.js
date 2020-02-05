import { pJSContainer } from './pjscontainer';

'use strict';

var pJSDom: pJSContainer[] = [];

export class pJSLoader {
  static pJSDom() {
    if (!pJSDom) {
      pJSLoader.pJSDomSet([]);
    }

    return pJSDom;
  }

  static pJSDomSet(value: any[]) {
    pJSDom = value;
  }

  static load(tag_id: string, params: any) {
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
    let pJS_tag = document.getElementById(tag_id);
    let pJS_canvas_class = 'particles-js-canvas-el';

    if (pJS_tag) {
      let exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

      /* remove canvas if exists into the pJS target tag */
      if (exist_canvas.length) {
        while (exist_canvas.length > 0) {
          pJS_tag.removeChild(exist_canvas[0]);
        }
      }
    }

    /* create canvas element */
    let canvas_el = document.createElement('canvas');

    canvas_el.className = pJS_canvas_class;

    /* set size canvas */
    canvas_el.style.width = "100%";
    canvas_el.style.height = "100%";

    /* append canvas */
    let canvas = document.getElementById(tag_id)?.appendChild(canvas_el);

    /* launch particle.js */
    if (canvas != null) {
      let pjs = new pJSContainer(tag_id, params);
      let found = false;

      for (let idx = 0; idx < pJSLoader.pJSDom().length; idx++) {

        if (pJSLoader.pJSDom()[idx].pJS.canvas.tag_id == tag_id) {
          found = true;
          pJSLoader.pJSDom()[idx] = pjs;
        }
      }

      if (!found) {
        pJSLoader.pJSDom().push(pjs);
      }
      return pjs;
    }
  }

  static async loadJSON(tag_id: string, path_config_json: string, callback: () => void) {
    /* load json config */
    let response = await fetch(path_config_json);

    if (response.ok) {
      let params = await response.json();

      pJSLoader.load(tag_id, params);

      if (callback)
        callback();
    } else {
      console.error('Error pJS - fetch status: ' + response.status);
      console.error('Error pJS - File config not found');
    }
  };
};
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/pjsutils.js

/* ---------- global functions - vendors ------------ */

function hexToRgb(hex) {
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
;
function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}
;
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
function deepExtend(destination, source) {
  for (let property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      Object.deepExtend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }

  return destination;
}
// CONCATENATED MODULE: ./src/pjsinteract.js

'use strict';

class pjsinteract_pJSInteract {
  constructor(pJS) {
    this.pJS = pJS;
  }
  /* ---------- pJS functions - particles interaction ------------ */


  linkParticles(p1, p2) {
    let pJS = this.pJS;
    let options = pJS.options;
    let dx = p1.x + p1.offsetX - (p2.x + p2.offsetX);
    let dy = p1.y + p1.offsetY - (p2.y + p2.offsetY);
    let dist = Math.sqrt(dx * dx + dy * dy);
    /* draw a line between p1 and p2 if the distance between them is under the config distance */

    if (dist <= options.particles.line_linked.distance) {
      let opacity_line = options.particles.line_linked.opacity - dist / (1 / options.particles.line_linked.opacity) / options.particles.line_linked.distance;

      if (opacity_line > 0) {
        /* style */
        options.particles.line_linked.color_rgb = options.particles.line_linked.color_rgb || hexToRgb(options.particles.line_linked.color);
        let color_line = options.particles.line_linked.color_rgb;
        pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
        pJS.canvas.ctx.lineWidth = options.particles.line_linked.width; //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

        /* path */

        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x + p1.offsetX, p1.y + p1.offsetY);
        pJS.canvas.ctx.lineTo(p2.x + p2.offsetX, p2.y + p2.offsetY);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();
      }
    }
  }

  attractParticles(p1, p2) {
    let pJS = this.pJS;
    let options = pJS.options;
    /* condensed particles */

    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= options.particles.line_linked.distance) {
      let ax = dx / (options.particles.move.attract.rotateX * 1000),
          ay = dy / (options.particles.move.attract.rotateY * 1000);
      p1.vx -= ax;
      p1.vy -= ay;
      p2.vx += ax;
      p2.vy += ay;
    }
  }

  bounceParticles(p1, p2) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let dist_p = p1.radius + p2.radius;

    if (dist <= dist_p) {
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;
      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }
  }

}
// CONCATENATED MODULE: ./src/pjsparticle.js

'use strict';

class pjsparticle_pJSParticle {
  /* --------- pJS functions - particles ----------- */
  constructor(pJS, color, opacity, position) {
    this.pJS = pJS;
    let options = pJS.options;
    /* size */

    this.radius = (options.particles.size.random ? Math.random() : 1) * options.particles.size.value;

    if (options.particles.size.anim.enable) {
      this.size_status = false;
      this.vs = options.particles.size.anim.speed / 100;

      if (!options.particles.size.anim.sync) {
        this.vs = this.vs * Math.random();
      }
    }
    /* position */


    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;
    /* check position  - into the canvas */

    if (this.x > pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius;else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    if (this.y > pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius;else if (this.y < this.radius * 2) this.y = this.y + this.radius;
    /* parallax */

    this.offsetX = 0;
    this.offsetY = 0;
    /* check position - avoid overlap */

    if (options.particles.move.bounce) {
      pJS.fn.vendors.checkOverlap(this, position);
    }
    /* color */


    this.color = {};

    if (typeof color.value == 'object') {
      if (color.value instanceof Array) {
        let color_selected = color.value[Math.floor(Math.random() * options.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      } else {
        if (color.value.r != undefined && color.value.g != undefined && color.value.b != undefined) {
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          };
        }

        if (color.value.h != undefined && color.value.s != undefined && color.value.l != undefined) {
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          };
        }
      }
    } else if (color.value == 'random') {
      this.color.rgb = {
        r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        b: Math.floor(Math.random() * (255 - 0 + 1)) + 0
      };
    } else if (typeof color.value == 'string') {
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }
    /* opacity */


    this.opacity = (options.particles.opacity.random ? Math.random() : 1) * options.particles.opacity.value;

    if (options.particles.opacity.anim.enable) {
      this.opacity_status = false;
      this.vo = options.particles.opacity.anim.speed / 100;

      if (!options.particles.opacity.anim.sync) {
        this.vo = this.vo * Math.random();
      }
    }
    /* animation - velocity for speed */


    let velbase = {};

    switch (options.particles.move.direction) {
      case 'top':
        velbase = {
          x: 0,
          y: -1
        };
        break;

      case 'top-right':
        velbase = {
          x: 0.5,
          y: -0.5
        };
        break;

      case 'right':
        velbase = {
          x: 1,
          y: -0
        };
        break;

      case 'bottom-right':
        velbase = {
          x: 0.5,
          y: 0.5
        };
        break;

      case 'bottom':
        velbase = {
          x: 0,
          y: 1
        };
        break;

      case 'bottom-left':
        velbase = {
          x: -0.5,
          y: 1
        };
        break;

      case 'left':
        velbase = {
          x: -1,
          y: 0
        };
        break;

      case 'top-left':
        velbase = {
          x: -0.5,
          y: -0.5
        };
        break;

      default:
        velbase = {
          x: 0,
          y: 0
        };
        break;
    }

    if (options.particles.move.straight) {
      this.vx = velbase.x;
      this.vy = velbase.y;

      if (options.particles.move.random) {
        this.vx = this.vx * Math.random();
        this.vy = this.vy * Math.random();
      }
    } else {
      this.vx = velbase.x + Math.random() - 0.5;
      this.vy = velbase.y + Math.random() - 0.5;
    } // let theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);


    this.vx_i = this.vx;
    this.vy_i = this.vy;
    /* if shape is image */

    let shape_type = options.particles.shape.type;

    if (typeof shape_type == 'object') {
      if (shape_type instanceof Array) {
        let shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    } else {
      this.shape = shape_type;
    }

    if (this.shape == 'image') {
      let sh = options.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      };
      if (!this.img.ratio) this.img.ratio = 1;

      if (pJS.img_type == 'svg' && pJS.source_svg != undefined) {
        pJS.fn.vendors.createSvgImg(this);

        if (pJS.pushing) {
          this.img.loaded = false;
        }
      }
    }
  }

  draw() {
    let p = this;
    let pJS = this.pJS;
    let options = pJS.options;
    let radius;
    let opacity;
    let color_value;

    if (p.radius_bubble != undefined) {
      radius = p.radius_bubble;
    } else {
      radius = p.radius;
    }

    if (p.opacity_bubble != undefined) {
      opacity = p.opacity_bubble;
    } else {
      opacity = p.opacity;
    }

    if (p.color.rgb) {
      color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + opacity + ')';
    } else {
      color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + opacity + ')';
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();
    let p_x = p.x + p.offsetX;
    let p_y = p.y + p.offsetY;

    switch (p.shape) {
      case 'circle':
        pJS.canvas.ctx.arc(p_x, p_y, radius, 0, Math.PI * 2, false);
        break;

      case 'edge':
        pJS.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
        break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2);
        break;

      case 'polygon':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius / (options.particles.shape.polygon.nb_sides / 3.5), // startX
        p.y - radius / (2.66 / 3.5), // startY
        radius * 2.66 / (options.particles.shape.polygon.nb_sides / 3), // sideLength
        options.particles.shape.polygon.nb_sides, // sideCountNumerator
        1 // sideCountDenominator
        );
        break;

      case 'star':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius * 2 / (options.particles.shape.polygon.nb_sides / 4), // startX
        p.y - radius / (2 * 2.66 / 3.5), // startY
        radius * 2 * 2.66 / (options.particles.shape.polygon.nb_sides / 3), // sideLength
        options.particles.shape.polygon.nb_sides, // sideCountNumerator
        2 // sideCountDenominator
        );
        break;

      case 'image':
        function draw() {
          pJS.canvas.ctx.drawImage(img_obj, p.x - radius, p.y - radius, radius * 2, radius * 2 / p.img.ratio);
        }

        let img_obj;

        if (pJS.img_type == 'svg') {
          img_obj = p.img.obj;
        } else {
          img_obj = pJS.img_obj;
        }

        if (img_obj) {
          draw();
        }

        break;
    }

    pJS.canvas.ctx.closePath();

    if (options.particles.shape.stroke.width > 0) {
      pJS.canvas.ctx.strokeStyle = options.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = options.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }

    pJS.canvas.ctx.fill();
  }

}
// CONCATENATED MODULE: ./src/pjsmodes.js


'use strict';

class pjsmodes_pJSModes {
  constructor(pJS) {
    this.pJS = pJS;
  }
  /* ---------- pJS functions - modes events ------------ */


  pushParticles(nb, pos) {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.pushing = true;

    for (let i = 0; i < nb; i++) {
      pJS.particles.array.push(new pjsparticle_pJSParticle(pJS, options.particles.color, options.particles.opacity.value, {
        'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
        'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
      }));

      if (i == nb - 1) {
        if (!options.particles.move.enable) {
          pJS.fn.particles.draw();
        }

        pJS.pushing = false;
      }
    }
  }

  removeParticles(nb) {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.particles.array.splice(0, nb);

    if (!options.particles.move.enable) {
      pJS.fn.particles.draw();
    }
  }

  bubbleParticle(p) {
    let pJS = this.pJS;
    let options = pJS.options;
    /* on hover event */

    if (options.interactivity.events.onhover.enable && isInArray('bubble', options.interactivity.events.onhover.mode)) {
      let dx_mouse = p.x + p.offsetX - pJS.interactivity.mouse.pos_x;
      let dy_mouse = p.y + p.offsetY - pJS.interactivity.mouse.pos_y;
      let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
      let ratio = 1 - dist_mouse / options.interactivity.modes.bubble.distance;

      function init() {
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }
      /* mousemove - check ratio */


      if (dist_mouse <= options.interactivity.modes.bubble.distance) {
        if (ratio >= 0 && pJS.interactivity.status == 'mousemove') {
          /* size */
          if (options.interactivity.modes.bubble.size != options.particles.size.value) {
            if (options.interactivity.modes.bubble.size > options.particles.size.value) {
              let size = p.radius + options.interactivity.modes.bubble.size * ratio;

              if (size >= 0) {
                p.radius_bubble = size;
              }
            } else {
              let dif = p.radius - options.interactivity.modes.bubble.size;
              let size = p.radius - dif * ratio;

              if (size > 0) {
                p.radius_bubble = size;
              } else {
                p.radius_bubble = 0;
              }
            }
          }
          /* opacity */


          if (options.interactivity.modes.bubble.opacity != options.particles.opacity.value) {
            if (options.interactivity.modes.bubble.opacity > options.particles.opacity.value) {
              let opacity = options.interactivity.modes.bubble.opacity * ratio;

              if (opacity > p.opacity && opacity <= options.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity;
              }
            } else {
              let opacity = p.opacity - (options.particles.opacity.value - options.interactivity.modes.bubble.opacity) * ratio;

              if (opacity < p.opacity && opacity >= options.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity;
              }
            }
          }
        }
      } else {
        init();
      }
      /* mouseleave */


      if (pJS.interactivity.status == 'mouseleave') {
        init();
      }
    }
    /* on click event */
    else if (options.interactivity.events.onclick.enable && isInArray('bubble', options.interactivity.events.onclick.mode)) {
        if (pJS.bubble_clicking) {
          let dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x;
          let dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y;
          let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
          let time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000;

          if (time_spent > options.interactivity.modes.bubble.duration) {
            pJS.bubble_duration_end = true;
          }

          if (time_spent > options.interactivity.modes.bubble.duration * 2) {
            pJS.bubble_clicking = false;
            pJS.bubble_duration_end = false;
          }
        }

        function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {
          if (bubble_param != particles_param) {
            if (!pJS.bubble_duration_end) {
              if (dist_mouse <= options.interactivity.modes.bubble.distance) {
                let obj;
                if (p_obj_bubble != undefined) obj = p_obj_bubble;else obj = p_obj;

                if (obj != bubble_param) {
                  let value = p_obj - time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration;
                  if (id == 'size') p.radius_bubble = value;
                  if (id == 'opacity') p.opacity_bubble = value;
                }
              } else {
                if (id == 'size') p.radius_bubble = undefined;
                if (id == 'opacity') p.opacity_bubble = undefined;
              }
            } else {
              if (p_obj_bubble != undefined) {
                let value_tmp = p_obj - time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration,
                    dif = bubble_param - value_tmp;
                let value = bubble_param + dif;
                if (id == 'size') p.radius_bubble = value;
                if (id == 'opacity') p.opacity_bubble = value;
              }
            }
          }
        }

        if (pJS.bubble_clicking) {
          /* size */
          process(options.interactivity.modes.bubble.size, options.particles.size.value, p.radius_bubble, p.radius, 'size');
          /* opacity */

          process(options.interactivity.modes.bubble.opacity, options.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
        }
      }
  }

  repulseParticle(p) {
    let pJS = this.pJS;
    let options = pJS.options;

    if (options.interactivity.events.onhover.enable && isInArray('repulse', options.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {
      let dx_mouse = p.x - pJS.interactivity.mouse.pos_x;
      let dy_mouse = p.y - pJS.interactivity.mouse.pos_y;
      let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
      let normVec = {
        x: dx_mouse / dist_mouse,
        y: dy_mouse / dist_mouse
      },
          repulseRadius = options.interactivity.modes.repulse.distance,
          velocity = 100,
          repulseFactor = clamp(1 / repulseRadius * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);
      let pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      };

      if (options.particles.move.out_mode == 'bounce') {
        if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
        if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
      } else {
        p.x = pos.x;
        p.y = pos.y;
      }
    } else if (options.interactivity.events.onclick.enable && isInArray('repulse', options.interactivity.events.onclick.mode)) {
      if (!pJS.repulse_finish) {
        pJS.repulse_count++;

        if (pJS.repulse_count == pJS.particles.array.length) {
          pJS.repulse_finish = true;
        }
      }

      if (pJS.repulse_clicking) {
        let repulseRadius = Math.pow(options.interactivity.modes.repulse.distance / 6, 3);
        let dx = pJS.interactivity.mouse.click_pos_x - p.x,
            dy = pJS.interactivity.mouse.click_pos_y - p.y,
            d = dx * dx + dy * dy;
        let force = -repulseRadius / d * 1;

        function process() {
          let f = Math.atan2(dy, dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if (options.particles.move.out_mode == 'bounce') {
            let pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            };
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }
        } // default


        if (d <= repulseRadius) {
          process();
        } // bang - slow motion mode
        // if(!pJS.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }

      } else {
        if (pJS.repulse_clicking == false) {
          p.vx = p.vx_i;
          p.vy = p.vy_i;
        }
      }
    }
  }

  grabParticle(p) {
    let pJS = this.pJS;
    let options = pJS.options;

    if (options.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove') {
      let dx_mouse = p.x - pJS.interactivity.mouse.pos_x;
      let dy_mouse = p.y - pJS.interactivity.mouse.pos_y;
      let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
      /* draw a line between the cursor and the particle if the distance between them is under the config distance */

      if (dist_mouse <= options.interactivity.modes.grab.distance) {
        let opacity_line = options.interactivity.modes.grab.line_linked.opacity - dist_mouse / (1 / options.interactivity.modes.grab.line_linked.opacity) / options.interactivity.modes.grab.distance;

        if (opacity_line > 0) {
          /* style */
          options.particles.line_linked.color_rgb = options.particles.line_linked.color_rgb || hexToRgb(options.particles.line_linked.color);
          let color_line = options.particles.line_linked.color_rgb;
          pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
          pJS.canvas.ctx.lineWidth = options.particles.line_linked.width; //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

          /* path */

          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x + p.offsetX, p.y + p.offsetY);
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();
        }
      }
    }
  }

}
// CONCATENATED MODULE: ./src/pjsvendors.js


'use strict';

class pjsvendors_pJSVendors {
  constructor(pJS) {
    this.pJS = pJS;
  }
  /* ---------- pJS functions - vendors ------------ */


  eventsListeners() {
    let pJS = this.pJS;
    let options = pJS.options;
    /* events target element */

    if (options.interactivity.detect_on == 'window') {
      pJS.interactivity.el = window;
    } else {
      pJS.interactivity.el = pJS.canvas.el;
    }
    /* detect mouse pos - on hover / click event */


    if (options.interactivity.events.onhover.enable || options.interactivity.events.onclick.enable) {
      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function (e) {
        let pos_x;
        let pos_y;

        if (pJS.interactivity.el == window) {
          pos_x = e.clientX;
          pos_y = e.clientY;
        } else {
          pos_x = e.offsetX || e.clientX;
          pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if (pJS.retina) {
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';
      });
      /* el on onmouseleave */

      pJS.interactivity.el.addEventListener('mouseleave', function (e) {
        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = 'mouseleave';
      });
    }
    /* on click event */


    if (options.interactivity.events.onclick.enable) {
      pJS.interactivity.el.addEventListener('click', function () {
        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if (options.interactivity.events.onclick.enable) {
          switch (options.interactivity.events.onclick.mode) {
            case 'push':
              if (options.particles.move.enable) {
                pJS.fn.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
              } else {
                if (options.interactivity.modes.push.particles_nb == 1) {
                  pJS.fn.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                } else if (options.interactivity.modes.push.particles_nb > 1) {
                  pJS.fn.modes.pushParticles(options.interactivity.modes.push.particles_nb);
                }
              }

              break;

            case 'remove':
              pJS.fn.modes.removeParticles(options.interactivity.modes.remove.particles_nb);
              break;

            case 'bubble':
              pJS.bubble_clicking = true;
              break;

            case 'repulse':
              pJS.repulse_clicking = true;
              pJS.repulse_count = 0;
              pJS.repulse_finish = false;
              setTimeout(function () {
                pJS.repulse_clicking = false;
              }, options.interactivity.modes.repulse.duration * 1000);
              break;
          }
        }
      });
    }
  }

  densityAutoParticles() {
    let pJS = this.pJS;
    let options = pJS.options;

    if (options.particles.number.density.enable) {
      /* calc area */
      let area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;

      if (pJS.retina) {
        area = area / (pJS.canvas.pxratio * 2);
      }
      /* calc number of particles based on density area */


      let nb_particles = area * options.particles.number.value / options.particles.number.density.value_area;
      /* add or remove X particles */

      let missing_particles = pJS.particles.array.length - nb_particles;
      if (missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));else pJS.fn.modes.removeParticles(missing_particles);
    }
  }

  checkOverlap(p1, position) {
    let pJS = this.pJS;
    let options = pJS.options;

    for (let i = 0; i < pJS.particles.array.length; i++) {
      let p2 = pJS.particles.array[i];
      let dx = p1.x - p2.x;
      let dy = p1.y - p2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= p1.radius + p2.radius) {
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  }

  createSvgImg(p) {
    let pJS = this.pJS;
    let options = pJS.options;
    /* set color to svg element */

    let svgXml = pJS.source_svg;
    let rgbHex = /#([0-9A-F]{3,6})/gi;
    let coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
      let color_value;

      if (p.color.rgb) {
        color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + p.opacity + ')';
      } else {
        color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + p.opacity + ')';
      }

      return color_value;
    });
    /* prepare to create img with colored svg */

    let svg = new Blob([coloredSvgXml], {
      type: 'image/svg+xml;charset=utf-8'
    }),
        DOMURL = window.URL || window.webkitURL || window,
        url = DOMURL.createObjectURL(svg);
    /* create particle img obj */

    let img = new Image();
    img.addEventListener('load', function () {
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.count_svg++;
    });
    img.src = url;
  }

  destroypJS() {
    let pJS = this.pJS;
    let options = pJS.options;
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pjsloader_pJSLoader.pJSDomSet(null);
  }

  drawShape(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
    let pJS = this.pJS;
    let options = pJS.options; // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/

    let sideCount = sideCountNumerator * sideCountDenominator;
    let decimalSides = sideCountNumerator / sideCountDenominator;
    let interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
    let interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0, 0);

    for (let i = 0; i < sideCount; i++) {
      c.lineTo(sideLength, 0);
      c.translate(sideLength, 0);
      c.rotate(interiorAngle);
    } //c.stroke();


    c.fill();
    c.restore();
  }

  exportImg() {
    let pJS = this.pJS;
    let options = pJS.options;
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
  }

  async loadImg(type) {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.img_error = undefined;

    if (options.particles.shape.image.src != '') {
      if (type == 'svg') {
        let response = await fetch(options.particles.shape.image.src);

        if (response.ok) {
          pJS.source_svg = await response.blob();
          pJS.fn.vendors.checkBeforeDraw();
        } else {
          console.error('Error pJS - Image not found');
          pJS.img_error = true;
        }
      } else {
        let img = new Image();
        img.addEventListener('load', function () {
          pJS.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = options.particles.shape.image.src;
      }
    } else {
      console.error('Error pJS - No image.src');
      pJS.img_error = true;
    }
  }

  draw() {
    let pJS = this.pJS;
    let options = pJS.options;

    if (options.particles.shape.type == 'image') {
      if (pJS.img_type == 'svg') {
        if (pJS.count_svg >= options.particles.number.value) {
          pJS.fn.particles.draw();
          if (!options.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(function () {
            pJS.fn.vendors.draw();
          });
        } else {
          if (!pJS.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(function () {
            pJS.fn.vendors.draw();
          });
        }
      } else {
        if (pJS.img_obj != undefined) {
          pJS.fn.particles.draw();
          if (!options.particles.move.enable) cancelRequestAnimFrame(function () {
            pJS.fn.drawAnimFrame();
          });else pJS.fn.drawAnimFrame = requestAnimFrame(function () {
            pJS.fn.vendors.draw();
          });
        } else {
          if (!pJS.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(function () {
            pJS.fn.vendors.draw();
          });
        }
      }
    } else {
      pJS.fn.particles.draw();
      if (!options.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(function () {
        pJS.fn.vendors.draw();
      });
    }
  }

  checkBeforeDraw() {
    let pJS = this.pJS;
    let options = pJS.options; // if shape is image

    if (options.particles.shape.type == 'image') {
      if (pJS.img_type == 'svg' && pJS.source_svg == undefined) {
        pJS.checkAnimFrame = requestAnimFrame(function () {
          check();
        });
      } else {
        cancelRequestAnimFrame(pJS.checkAnimFrame);

        if (!pJS.img_error) {
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }
      }
    } else {
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }
  }

  init() {
    let pJS = this.pJS;
    let options = pJS.options;
    /* init canvas + particles */

    pJS.fn.retina.init();
    pJS.fn.canvas.init();
    pJS.fn.canvas.size();
    pJS.fn.canvas.paint();
    pJS.fn.particles.create();
    pJS.fn.vendors.densityAutoParticles();
  }

  async start() {
    let pJS = this.pJS;
    let options = pJS.options;

    if (isInArray('image', options.particles.shape.type)) {
      pJS.img_type = options.particles.shape.image.src.substr(options.particles.shape.image.src.length - 3);
      await pJS.fn.vendors.loadImg(pJS.img_type);
    } else {
      pJS.fn.vendors.checkBeforeDraw();
    }
  }

}
// CONCATENATED MODULE: ./src/pjsretina.js


class pJSRetina {
  constructor(pJS) {
    this.pJS = pJS;
  }

  init() {
    let pJS = this.pJS;
    let options = pJS.options;

    if (options.retina_detect && window.devicePixelRatio > 1) {
      pJS.canvas.pxratio = window.devicePixelRatio;
      pJS.retina = true;
    } else {
      pJS.canvas.pxratio = 1;
      pJS.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
    options.particles.size.value = options.particles.size.value * pJS.canvas.pxratio;
    options.particles.size.anim.speed = options.particles.size.anim.speed * pJS.canvas.pxratio;
    options.particles.move.speed = options.particles.move.speed * pJS.canvas.pxratio;
    options.particles.line_linked.distance = options.particles.line_linked.distance * pJS.canvas.pxratio;
    options.interactivity.modes.grab.distance = options.interactivity.modes.grab.distance * pJS.canvas.pxratio;
    options.interactivity.modes.bubble.distance = options.interactivity.modes.bubble.distance * pJS.canvas.pxratio;
    options.particles.line_linked.width = options.particles.line_linked.width * pJS.canvas.pxratio;
    options.interactivity.modes.bubble.size = options.interactivity.modes.bubble.size * pJS.canvas.pxratio;
    options.interactivity.modes.repulse.distance = options.interactivity.modes.repulse.distance * pJS.canvas.pxratio;
  }

}
// CONCATENATED MODULE: ./src/pjscanvas.js


class pJSCanvas {
  constructor(pJS) {
    this.pJS = pJS;
  }
  /* ---------- pJS functions - canvas ------------ */


  init() {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  }

  size() {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if (pJS && options.interactivity.events.resize) {
      window.addEventListener('resize', function () {
        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;
        /* resize canvas */

        if (pJS.retina) {
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;
        /* repaint canvas on anim disabled */

        if (!options.particles.move.enable) {
          pJS.fn.particles.empty();
          pJS.fn.particles.create();
          pJS.fn.particles.draw();
          pJS.fn.vendors.densityAutoParticles();
        }
        /* density particles enabled */


        pJS.fn.vendors.densityAutoParticles();
      });
    }
  }

  paint() {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  }

  clear() {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  }

}
// CONCATENATED MODULE: ./src/pjsparticles.js


'use strict';

class pjsparticles_pJSParticles {
  constructor(pJS) {
    this.pJS = pJS;
  }
  /* --------- pJS functions - particles ----------- */


  create() {
    let pJS = this.pJS;
    let options = pJS.options;

    for (let i = 0; i < options.particles.number.value; i++) {
      pJS.particles.array.push(new pjsparticle_pJSParticle(pJS, options.particles.color, options.particles.opacity.value));
    }
  }

  update() {
    let pJS = this.pJS;
    let options = pJS.options;

    for (let i = 0; i < pJS.particles.array.length; i++) {
      /* the particle */
      let p = pJS.particles.array[i]; // let d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // let f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     let t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */

      if (options.particles.move.enable) {
        let ms = options.particles.move.speed / 2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }
      /* parallax */


      if (pJS.interactivity.mouse.pos_x && options.interactivity.events.onhover.parallax.enable) {
        /* smaller is the particle, longer is the offset distance */
        let tmp_x = (pJS.interactivity.mouse.pos_x - window.innerWidth / 2) * (p.radius / options.interactivity.events.onhover.parallax.force);
        p.offsetX += (tmp_x - p.offsetX) / options.interactivity.events.onhover.parallax.smooth; // Easing equation

        let tmp_y = (pJS.interactivity.mouse.pos_y - window.innerHeight / 2) * (p.radius / options.interactivity.events.onhover.parallax.force);
        p.offsetY += (tmp_y - p.offsetY) / options.interactivity.events.onhover.parallax.smooth; // Easing equation
      }
      /* change opacity status */


      if (options.particles.opacity.anim.enable) {
        if (p.opacity_status == true) {
          if (p.opacity >= options.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        } else {
          if (p.opacity <= options.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }

        if (p.opacity < 0) p.opacity = 0;
      }
      /* change size */


      if (options.particles.size.anim.enable) {
        if (p.size_status == true) {
          if (p.radius >= options.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        } else {
          if (p.radius <= options.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }

        if (p.radius < 0) p.radius = 0;
      }
      /* change particle position if it is out of canvas */


      let new_pos;

      if (options.particles.move.out_mode == 'bounce') {
        new_pos = {
          x_left: p.radius,
          x_right: pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        };
      } else {
        new_pos = {
          x_left: -p.radius - p.offsetX,
          x_right: pJS.canvas.w + p.radius + p.offsetX,
          y_top: -p.radius - p.offsetY,
          y_bottom: pJS.canvas.h + p.radius - p.offsetY
        };
      }

      if (p.x - p.radius > pJS.canvas.w - p.offsetX) {
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      } else if (p.x + p.radius < 0 - p.offsetX) {
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }

      if (p.y - p.radius > pJS.canvas.h - p.offsetY) {
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      } else if (p.y + p.radius < 0 - p.offsetY) {
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }
      /* out of canvas modes */


      switch (options.particles.move.out_mode) {
        case 'bounce':
          if (p.x + p.offsetX + p.radius > pJS.canvas.w) p.vx = -p.vx;else if (p.x + p.offsetX - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.offsetY + p.radius > pJS.canvas.h) p.vy = -p.vy;else if (p.y + p.offsetY - p.radius < 0) p.vy = -p.vy;
          break;
      }
      /* events */


      if (isInArray('grab', options.interactivity.events.onhover.mode)) {
        pJS.fn.modes.grabParticle(p);
      }

      if (isInArray('bubble', options.interactivity.events.onhover.mode) || isInArray('bubble', options.interactivity.events.onclick.mode)) {
        pJS.fn.modes.bubbleParticle(p);
      }

      if (isInArray('repulse', options.interactivity.events.onhover.mode) || isInArray('repulse', options.interactivity.events.onclick.mode)) {
        pJS.fn.modes.repulseParticle(p);
      }
      /* interaction auto between particles */


      if (options.particles.line_linked.enable || options.particles.move.attract.enable) {
        for (let j = i + 1; j < pJS.particles.array.length; j++) {
          let p2 = pJS.particles.array[j];
          /* link particles */

          if (options.particles.line_linked.enable) {
            pJS.fn.interact.linkParticles(p, p2);
          }
          /* attract particles */


          if (options.particles.move.attract.enable) {
            pJS.fn.interact.attractParticles(p, p2);
          }
          /* bounce particles */


          if (options.particles.move.bounce) {
            pJS.fn.interact.bounceParticles(p, p2);
          }
        }
      }
    }
  }

  draw() {
    let pJS = this.pJS;
    let options = pJS.options;
    /* clear canvas */

    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
    /* update each particles param */

    pJS.fn.particles.update();
    /* draw each particle */

    for (let i = 0; i < pJS.particles.array.length; i++) {
      let p = pJS.particles.array[i];
      p.draw();
    }
  }

  empty() {
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.particles.array = [];
  }

  async refresh() {
    let pJS = this.pJS;
    let options = pJS.options;
    /* init all */

    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.source_svg = undefined;
    pJS.img_obj = undefined;
    pJS.count_svg = 0;
    pJS.fn.particles.empty();
    pJS.fn.canvas.clear();
    /* restart */

    await pJS.fn.vendors.start();
  }

}
// CONCATENATED MODULE: ./src/pjsfunctions.js






'use strict';

class pjsfunctions_pJSFunctions {
  constructor(pJS) {
    this.pJS = pJS;
    this.interact = new pjsinteract_pJSInteract(pJS);
    this.modes = new pjsmodes_pJSModes(pJS);
    this.vendors = new pjsvendors_pJSVendors(pJS);
    this.retina = new pJSRetina(pJS);
    this.canvas = new pJSCanvas(pJS);
    this.particles = new pjsparticles_pJSParticles(pJS);
  }

}
// CONCATENATED MODULE: ./src/pjs.js

'use strict';

class pjs_pJS {
  constructor(tag_id, params) {
    let canvas_el = document.querySelector('#' + tag_id + ' > .particles-js-canvas-el');
    /* particles.js variables with default values */

    this.pJS = {
      canvas: {
        el: canvas_el,
        w: canvas_el.offsetWidth,
        h: canvas_el.offsetHeight
      },
      particles: {
        array: []
      },
      interactivity: {
        mouse: {}
      },
      options: {
        particles: {
          number: {
            value: 400,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#fff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#ff0000'
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: '',
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 1,
            random: false,
            anim: {
              enable: false,
              speed: 2,
              opacity_min: 0,
              sync: false
            }
          },
          size: {
            value: 20,
            random: false,
            anim: {
              enable: false,
              speed: 20,
              size_min: 0,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 100,
            color: '#fff',
            opacity: 1,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 3000,
              rotateY: 3000
            }
          },
          array: []
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab',
              parallax: {
                enable: true,
                force: 2,
                smooth: 10
              }
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 100,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 200,
              size: 80,
              duration: 0.4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: false
      }
    };
    let pJS = this.pJS;
    let options = pJS.options;
    pJS.fn = new pjsfunctions_pJSFunctions(pJS);
    /* params settings */

    if (params) {
      Object.deepExtend(pJS, params);
      Object.deepExtend(options, params);
    }
    /* ---------- pJS - start ------------ */


    pJS.fn.vendors.eventsListeners(); //TODO: Start è async

    pJS.fn.vendors.start();
  }

}
// CONCATENATED MODULE: ./src/pjsloader.js

'use strict';

var pJSDom = [];
class pjsloader_pJSLoader {
  static pJSDom() {
    if (!pJSDom) {
      pjsloader_pJSLoader.pJSDomSet([]);
    }

    return pJSDom;
  }

  static pJSDomSet(value) {
    pJSDom = value;
  }

  static load(tag_id, params) {
    /* no string id? so it's object params, and set the id with default id */
    if (typeof tag_id != 'string') {
      params = tag_id;
      tag_id = 'particles-js';
    }
    /* no id? set the id to default id */


    if (!tag_id) {
      tag_id = 'particles-js';
    }
    /* pJS elements */


    let pJS_tag = document.getElementById(tag_id),
        pJS_canvas_class = 'particles-js-canvas-el',
        exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);
    /* remove canvas if exists into the pJS target tag */

    if (exist_canvas.length) {
      while (exist_canvas.length > 0) {
        pJS_tag.removeChild(exist_canvas[0]);
      }
    }
    /* create canvas element */


    let canvas_el = document.createElement('canvas');
    canvas_el.className = pJS_canvas_class;
    /* set size canvas */

    canvas_el.style.width = "100%";
    canvas_el.style.height = "100%";
    /* append canvas */

    let canvas = document.getElementById(tag_id).appendChild(canvas_el);
    /* launch particle.js */

    if (canvas != null) {
      let pjs = new pjs_pJS(tag_id, params);
      let found = false;

      for (let idx = 0; idx < pjsloader_pJSLoader.pJSDom().length; idx++) {
        if (pjsloader_pJSLoader.pJSDom()[idx].canvas.tag_id == tag_id) {
          found = true;
          pjsloader_pJSLoader.pJSDom()[idx] = pjs_pJS;
        }
      }

      if (!found) {
        pjsloader_pJSLoader.pJSDom().push(pjs);
      }

      return pjs;
    }
  }

  static async loadJSON(tag_id, path_config_json, callback) {
    /* load json config */
    let response = await fetch(path_config_json);

    if (response.ok) {
      let params = await response.json();
      pjsloader_pJSLoader.load(tag_id, params);
      if (callback) callback();
    } else {
      console.error('Error pJS - fetch status: ' + response.status);
      console.error('Error pJS - File config not found');
    }
  }

}
;
// CONCATENATED MODULE: ./src/particles.js
/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.1
/* ----------------------------------------------- */

'use strict';
/* ---------- global functions - vendors ------------ */


Object.deepExtend = function (destination, source) {
  for (let property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      Object.deepExtend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }

  return destination;
};

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

window.cancelRequestAnimFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
}();
/* ---------- particles.js functions - start ------------ */


window.particlesJS = function (tag_id, params) {
  pjsloader_pJSLoader.load(tag_id, params);
};

window.particlesJS.load = async function (tag_id, path_config_json, callback) {
  await pjsloader_pJSLoader.loadJSON(tag_id, path_config_json, callback);
};

window.pJSDom = function () {
  return pjsloader_pJSLoader.pJSDom();
};

/***/ })
/******/ ]);
//# sourceMappingURL=particles.js.map
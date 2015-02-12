/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v1.0.4
/* ----------------------------------------------- */

function launchParticlesJS(tag_id, params) {

  var canvas_el = document.querySelector('#' + tag_id + ' > canvas');

  /* particles.js variables with default values */
  pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      color: params.particles.color || '#fff',
      shape: params.particles.shape || 'circle',
      opacity: params.particles.opacity || 1,
      size: params.particles.size || 2.5,
      size_random: params.particles.size_random || true,
      nb: params.particles.nb || 200,
      line_linked: {
        enable_auto: params.particles.line_linked.enable_auto || true,
        distance: params.particles.line_linked.distance || 100,
        color: params.particles.line_linked.color || '#fff',
        opacity: params.particles.line_linked.opacity || 1,
        width: params.particles.line_linked.width || 1,
        condensed_mode: {
          enable: params.particles.line_linked.condensed_mode.enable || true,
          rotateX: params.particles.line_linked.condensed_mode.rotateX || 65000,
          rotateY: params.particles.line_linked.condensed_mode.rotateY || 65000
        }
      },
      anim: {
        enable: params.particles.anim.enable || true,
        speed: params.particles.anim.speed || 1
      },
      array: []
    },
    interactivity: {
      enable: params.interactivity.enable || true,
      mouse: {
        distance: params.interactivity.mouse.distance || 100
      },
      detect_on: params.interactivity.detect_on || 'canvas',
      mode: params.interactivity.mode || 'grab',
      line_linked: {
        opacity: params.interactivity.line_linked.opacity || 1
      },
      events: {
        onclick: {
          enable: params.interactivity.events.enable || true,
          mode: params.interactivity.events.mode || 'push',
          nb: params.interactivity.events.nb || 4
        }
      }
    },
    retina_detect: params.retina_detect || false,
    fn: {
      vendors: {
        interactivity: {}
      }
    }
  };

  /* convert hex colors to rgb */
  pJS.particles.color_rgb                  = hexToRgb(pJS.particles.color);
  pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  /* detect retina */
  if (pJS.retina_detect && window.devicePixelRatio > 1) {
    pJS.retina                         = true;
    pJS.canvas.pxratio                 = window.devicePixelRatio
    pJS.canvas.w                       = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h                       = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
    pJS.particles.anim.speed           = pJS.particles.anim.speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.particles.line_linked.distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width    = pJS.particles.line_linked.width * pJS.canvas.pxratio;
    pJS.interactivity.mouse.distance   = pJS.interactivity.mouse.distance * pJS.canvas.pxratio;
  }


  /* ---------- CANVAS functions ------------ */

  pJS.fn.canvasInit = function() {
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function() {
    pJS.canvas.el.width  = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    window.onresize = function() {
      if (pJS) {
        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;

        /* resize canvas */
        if (pJS.retina) {
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width  = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;

        /* repaint canvas */
        pJS.fn.canvasPaint();
        if (!pJS.particles.anim.enable) {
          pJS.fn.particlesRemove();
          pJS.fn.canvasRemove();
          launchParticles();
        }
      }
    }
  };

  pJS.fn.canvasPaint = function() {
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasRemove = function() {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  }


  /* --------- PARTICLES functions ----------- */

  pJS.fn.particle = function(color, opacity, position) {

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* size */
    this.radius = (pJS.particles.size_random ? Math.random() : 1) * pJS.particles.size;
    if (pJS.retina) this.radius *= pJS.canvas.pxratio;

    /* color */
    this.color = color;

    /* opacity */
    this.opacity = opacity;

    /* animation - velocity for speed */
    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    /* draw function */
    this.draw = function() {
      pJS.canvas.ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.opacity + ')';
      pJS.canvas.ctx.beginPath();

      switch (pJS.particles.shape) {
        case 'circle':
          pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        break;

        case 'edge':
          pJS.canvas.ctx.rect(this.x, this.y, this.radius*2, this.radius*2);
        break;

        case 'triangle':
          pJS.canvas.ctx.moveTo(this.x, this.y - this.radius);
          pJS.canvas.ctx.lineTo(this.x + this.radius, this.y + this.radius);
          pJS.canvas.ctx.lineTo(this.x - this.radius, this.y + this.radius);
          pJS.canvas.ctx.closePath();
        break;
      }
    }
  };

  pJS.fn.particle.prototype.draw = function() {
    pJS.canvas.ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.opacity+')';
    pJS.canvas.ctx.beginPath();

    switch(pJS.particles.shape){
      case 'circle':
        pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      break;

      case 'edge':
        pJS.canvas.ctx.rect(this.x, this.y, this.radius*2, this.radius*2);
      break;

      case 'triangle':
        pJS.canvas.ctx.moveTo(this.x,this.y-this.radius);
        pJS.canvas.ctx.lineTo(this.x+this.radius,this.y+this.radius);
        pJS.canvas.ctx.lineTo(this.x-this.radius,this.y+this.radius);
        pJS.canvas.ctx.closePath();
      break;
    }

    pJS.canvas.ctx.fill();
  };

  pJS.fn.particlesCreate = function() {
    for (var i = 0; i < pJS.particles.nb; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity));
    }
  };

  pJS.fn.particlesAnimate = function() {
    for (var i = 0; i < pJS.particles.array.length; i++) {
      /* the particle */
      var p = pJS.particles.array[i];

      /* move the particle */
      p.x += p.vx * (pJS.particles.anim.speed / 2);
      p.y += p.vy * (pJS.particles.anim.speed / 2);

      /* change particle position if it is out of canvas */
      if (p.x - p.radius > pJS.canvas.w) p.x = p.radius;
      else if (p.x + p.radius < 0) p.x = pJS.canvas.w + p.radius;
      if (p.y - p.radius > pJS.canvas.h) p.y = p.radius;
      else if (p.y + p.radius < 0) p.y = pJS.canvas.h + p.radius;

      /* Check distance between each particle and mouse position */
      for (var j = i + 1; j < pJS.particles.array.length; j++) {
        var p2 = pJS.particles.array[j];

        /* link particles if enable */
        if (pJS.particles.line_linked.enable_auto) {
          pJS.fn.vendors.distanceParticles(p,p2);
        }

        /* set interactivity if enable */
        if (pJS.interactivity.enable) {

          /* interactivity mode */
          switch (pJS.interactivity.mode) {
            case 'grab':
              pJS.fn.vendors.interactivity.grabParticles(p,p2);
            break;
          }

        }
      }
    }
  };

  pJS.fn.particlesDraw = function() {
    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* move particles */
    pJS.fn.particlesAnimate();

    /* draw each particle */
    for (var i = 0; i < pJS.particles.array.length; i++) {
      var p = pJS.particles.array[i];
      p.draw('rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + p.opacity + ')');
    }

  };

  pJS.fn.particlesRemove = function() {
    pJS.particles.array = [];
  };


  /* ---------- VENDORS functions ------------ */

  pJS.fn.vendors.distanceParticles = function(p1, p2) {

    var dx   = p1.x - p2.x,
        dy   = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* Check distance between particle and mouse mos */
    if (dist <= pJS.particles.line_linked.distance) {

      /* draw the line */
      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + (pJS.particles.line_linked.opacity-dist / pJS.particles.line_linked.distance) + ')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(p2.x, p2.y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();

      /* condensed particles */
      if (pJS.particles.line_linked.condensed_mode.enable) {
        var dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            ax = dx / (pJS.particles.line_linked.condensed_mode.rotateX * 1000),
            ay = dy / (pJS.particles.line_linked.condensed_mode.rotateY * 1000);
        p2.vx += ax;
        p2.vy += ay;
      }

    }
  };

  pJS.fn.vendors.interactivity.listeners = function() {

    /* init el */
    if (pJS.interactivity.detect_on == 'window') {
      var detect_el = window;
    } else {
      var detect_el = pJS.canvas.el;
    }

    /* el on mousemove */
    detect_el.onmousemove = function(e) {

      if (detect_el == window) {
        var pos_x = e.clientX,
            pos_y = e.clientY;
      }
      else {
        var pos_x = e.offsetX || e.clientX,
            pos_y = e.offsetY || e.clientY;
      }

      if (pJS) {

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if (pJS.retina) {
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';
      }

    };

    /* el on onmouseleave */
    detect_el.onmouseleave = function(e) {

      if (pJS) {
        pJS.interactivity.mouse.pos_x = 0;
        pJS.interactivity.mouse.pos_y = 0;
        pJS.interactivity.status      = 'mouseleave';
      }

    };

    /* el on onclick */
    if (pJS.interactivity.events.onclick.enable) {
      switch (pJS.interactivity.events.onclick.mode) {
        case 'push':
          detect_el.onclick = function(e) {
            if (pJS) {
              for (var i = 0; i < pJS.interactivity.events.onclick.nb; i++) {
                pJS.particles.array.push(
                  new pJS.fn.particle(
                    pJS.particles.color_rgb,
                    pJS.particles.opacity,
                    {
                      'x': pJS.interactivity.mouse.pos_x,
                      'y': pJS.interactivity.mouse.pos_y
                    }
                  )
                )
              }
            }
          }
        break;

        case 'remove':
          detect_el.onclick = function(e) {
            pJS.particles.array.splice(0, pJS.interactivity.events.onclick.nb);
          }
        break;
      }
    }
  };


  pJS.fn.vendors.interactivity.grabParticles = function(p1, p2) {
    var dx   = p1.x - p2.x,
        dy   = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    var dx_mouse   = p1.x - pJS.interactivity.mouse.pos_x,
        dy_mouse   = p1.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

    /* Check distance between 2 particles + Check distance between 1 particle and mouse position */
    if (dist <= pJS.particles.line_linked.distance && dist_mouse <= pJS.interactivity.mouse.distance && pJS.interactivity.status == 'mousemove') {
      /* Draw the line */
      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + (pJS.interactivity.line_linked.opacity - dist_mouse / pJS.interactivity.mouse.distance) + ')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();
    }
  };

  pJS.fn.vendors.destroy = function() {
    cancelAnimationFrame(pJS.fn.requestAnimFrame);
    canvas_el.remove();
    delete pJS;
  };


  /* --------- LAUNCH ----------- */

  function launchParticles() {
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.particlesDraw();
  };


  function launchAnimation() {
    pJS.fn.particlesDraw();
    pJS.fn.requestAnimFrame = requestAnimFrame(launchAnimation);
  };


  launchParticles();

  if (pJS.particles.anim.enable) {
    launchAnimation();
  }

  if (pJS.interactivity.enable) {
    pJS.fn.vendors.interactivity.listeners();
  }

};

/* --- VENDORS --- */

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame  ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex) {
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};


/* --- LAUNCH --- */

window.particlesJS = function(tag_id, params) {

  /* no string id? so it's object params, and set the id with default id */
  if (typeof(tag_id) != 'string') {
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if (!tag_id) {
    tag_id = 'particles-js';
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');

  /* set size canvas */
  canvas_el.style.width  = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if (canvas != null) {
    launchParticlesJS(tag_id, params);
  }

};

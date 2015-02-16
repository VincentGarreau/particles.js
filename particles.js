/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v1.1.0
/* ----------------------------------------------- */

function launchParticlesJS(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > canvas');

  /* particles.js variables with default values */
  pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      color: '#fff',
      color_random: false,
      shape: 'circle', // "circle", "edge" or "triangle"
      opacity: {
        opacity: 1,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: 2.5,
      size_random: true,
      nb: 200,
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1,
        condensed_mode: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      anim: {
        enable: true,
        speed: 2
      },
      array: []
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 100
      },
      detect_on: 'canvas',
      mode: 'grab',
      line_linked: {
        opacity: 1
      },
      events: {
        onclick: {
          enable: true,
          mode: 'push',
          nb: 4
        },
        onresize: {
          enable: true,
          mode: 'out', // "out" or "bounce"
          density_auto: false,
          density_area: 800 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
        }
      }
    },
    retina_detect: false,
    fn: {
      vendors:{
        interactivity: {}
      }
    }
  };

  /* params settings */
  if(params){
    if(params.particles){
      var paramsForParticles = params.particles;
      if(paramsForParticles.color) pJS.particles.color = paramsForParticles.color;
      if(paramsForParticles.color_random) pJS.particles.color_random = paramsForParticles.color_random;
      if(paramsForParticles.shape) pJS.particles.shape = paramsForParticles.shape;
      if(paramsForParticles.opacity) {
        var paramsForOpacity = paramsForParticles.opacity;
        if(typeof paramsForOpacity == 'object') pJS.particles.opacity.opacity = paramsForOpacity.opacity;
        else pJS.particles.opacity.opacity = paramsForOpacity;
        if(paramsForOpacity.anim){
          var paramsForOpacityAnim = paramsForOpacity.anim;
          if(paramsForOpacityAnim.enable == false || paramsForOpacityAnim.enable) pJS.particles.opacity.anim.enable = paramsForOpacityAnim.enable;
          if(paramsForOpacityAnim.speed) pJS.particles.opacity.anim.speed = paramsForOpacityAnim.speed;
          if(paramsForOpacityAnim.opacity_min) pJS.particles.opacity.anim.opacity_min = paramsForOpacityAnim.opacity_min;
          if(paramsForOpacityAnim.sync == false || paramsForOpacityAnim.sync) pJS.particles.opacity.anim.sync = paramsForOpacityAnim.sync;
        }
      }
      if(paramsForParticles.size) pJS.particles.size = paramsForParticles.size;
      if(paramsForParticles.size_random == false) pJS.particles.size_random = paramsForParticles.size_random;
      if(paramsForParticles.nb) pJS.particles.nb = paramsForParticles.nb;
      if(paramsForParticles.line_linked){
        var paramsForLineLinked = paramsForParticles.line_linked;
        if(paramsForLineLinked.enable_auto == false) pJS.particles.line_linked.enable_auto = paramsForLineLinked.enable_auto;
        if(paramsForLineLinked.distance) pJS.particles.line_linked.distance = paramsForLineLinked.distance;
        if(paramsForLineLinked.color) pJS.particles.line_linked.color = paramsForLineLinked.color;
        if(paramsForLineLinked.opacity) pJS.particles.line_linked.opacity = paramsForLineLinked.opacity;
        if(paramsForLineLinked.width) pJS.particles.line_linked.width = paramsForLineLinked.width;
        if(paramsForLineLinked.condensed_mode){
          var paramsForCondensedMode = paramsForLineLinked.condensed_mode;
          if(paramsForCondensedMode.enable == false) pJS.particles.line_linked.condensed_mode.enable = paramsForCondensedMode.enable;
          if(paramsForCondensedMode.rotateX) pJS.particles.line_linked.condensed_mode.rotateX = paramsForCondensedMode.rotateX;
          if(paramsForCondensedMode.rotateY) pJS.particles.line_linked.condensed_mode.rotateY = paramsForCondensedMode.rotateY;
        }
      }
      if(paramsForParticles.anim){
        var paramsForAnim = paramsForParticles.anim;
        if(paramsForAnim.enable == false) pJS.particles.anim.enable = paramsForAnim.enable;
        if(paramsForAnim.speed) pJS.particles.anim.speed = paramsForAnim.speed;
      }
    }
    if(params.interactivity){
      var paramsForInteractivity = params.interactivity;
      if(paramsForInteractivity.enable == false) pJS.interactivity.enable = paramsForInteractivity.enable;
      if(paramsForInteractivity.mouse){
        if(paramsForInteractivity.mouse.distance) pJS.interactivity.mouse.distance = paramsForInteractivity.mouse.distance;
      }
      if(paramsForInteractivity.detect_on) pJS.interactivity.detect_on = paramsForInteractivity.detect_on;
      if(paramsForInteractivity.mode == false || paramsForInteractivity.mode) pJS.interactivity.mode = paramsForInteractivity.mode;
      if(paramsForInteractivity.line_linked){
        if(paramsForInteractivity.line_linked.opacity) pJS.interactivity.line_linked.opacity = paramsForInteractivity.line_linked.opacity;
      }
      if(paramsForInteractivity.events){
        var paramsForEvents = paramsForInteractivity.events;
        if(paramsForEvents.onclick){
          var paramsForOnclick = paramsForEvents.onclick;
          if(paramsForOnclick.enable == false) pJS.interactivity.events.onclick.enable = false;
          if(paramsForOnclick.mode != 'push') pJS.interactivity.events.onclick.mode = paramsForOnclick.mode;
          if(paramsForOnclick.nb) pJS.interactivity.events.onclick.nb = paramsForOnclick.nb;
        }
        if(paramsForEvents.onresize){
          var paramsForOnresize = paramsForEvents.onresize;
          if(paramsForOnresize.enable == false) pJS.interactivity.events.onresize.enable = false;
          if(paramsForOnresize.mode) pJS.interactivity.events.onresize.mode = paramsForOnresize.mode;
          if(paramsForOnresize.density_auto == false || paramsForOnresize.density_auto) pJS.interactivity.events.onresize.density_auto = paramsForOnresize.density_auto;
          if(paramsForOnresize.density_area) pJS.interactivity.events.onresize.density_area = paramsForOnresize.density_area;
        }
      }
    }
    pJS.retina_detect = params.retina_detect;
  }

  /* convert hex colors to rgb */
  pJS.particles.color_rgb = hexToRgb(pJS.particles.color);
  pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  /* detect retina */
  if(pJS.retina_detect && window.devicePixelRatio > 1){
    pJS.retina = true;
  
    pJS.canvas.pxratio = window.devicePixelRatio
    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
    pJS.particles.anim.speed = pJS.particles.anim.speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.particles.line_linked.distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.particles.line_linked.width * pJS.canvas.pxratio;
    pJS.interactivity.mouse.distance = pJS.interactivity.mouse.distance * pJS.canvas.pxratio;
  }


  /* ---------- CANVAS functions ------------ */

  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    window.addEventListener('resize', function(){

      if(pJS && pJS.interactivity.events.onresize.enable){

        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;

        /* resize canvas */
        if(pJS.retina){
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;

        /* repaint canvas */
        pJS.fn.canvasPaint();
        if(!pJS.particles.anim.enable){
          pJS.fn.particlesRemove();
          pJS.fn.canvasRemove();
          launchParticles();
        }

        /* density particles enabled */
        pJS.fn.densityAuto();

      }

    });

  };

  pJS.fn.densityAuto = function(){
    if(pJS.interactivity.events.onresize.density_auto){

      /* calc area */
      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
      if(pJS.retina){
        area = area/(pJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * pJS.particles.nb / pJS.interactivity.events.onresize.density_area;

      /* show nb_particles (add or remove X particles) */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if(missing_particles < 0){
        pJS.fn.vendors.interactivity.pushParticles(Math.abs(missing_particles));
      }else{
        pJS.fn.vendors.interactivity.removeParticles(missing_particles);
      }
      
    }
  };

  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasRemove = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  }


  /* --------- PARTICLES functions ----------- */

  pJS.fn.particle = function(color, opacity, position){

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* size */
    this.radius = (pJS.particles.size_random ? Math.random() : 1) * pJS.particles.size;
    if (pJS.retina) this.radius *= pJS.canvas.pxratio;

    /* color */
    if(pJS.particles.color_random){
      this.color = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }else{
      this.color = color;
    }

    /* opacity */
    this.opacity = opacity;
    if(pJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if(!pJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

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

  pJS.fn.particlesCreate = function(){
    for(var i = 0; i < pJS.particles.nb; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity.opacity));
    }
  };

  pJS.fn.particlesAnimate = function(){
    for(var i = 0; i < pJS.particles.array.length; i++){
      /* the particle */
      var p = pJS.particles.array[i];

      /* move the particle */
      p.x += p.vx * (pJS.particles.anim.speed/2);
      p.y += p.vy * (pJS.particles.anim.speed/2);

      /* change opacity status */
      if(pJS.particles.opacity.anim.enable) {
        if(p.opacity_status == true) {
          if(p.opacity >= pJS.particles.opacity.opacity) p.opacity_status = false;
          p.opacity += p.vo;
        }else {
          if(p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
      }

      /* change particle position if it is out of canvas */
      switch(pJS.interactivity.events.onresize.mode){
        case 'bounce':
          if (p.x - p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x + p.radius < 0) p.vx = -p.vx;
          if (p.y - p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y + p.radius < 0) p.vy = -p.vy;
        break;

        case 'out':
          if(p.x - p.radius > pJS.canvas.w) p.x = p.radius;
          else if(p.x + p.radius < 0) p.x = pJS.canvas.w + p.radius;
          if(p.y - p.radius > pJS.canvas.h) p.y = p.radius;
          else if(p.y + p.radius < 0) p.y = pJS.canvas.h + p.radius;
        break;        
      }


      /* Check distance between each particle and mouse position */
      for(var j = i + 1; j < pJS.particles.array.length; j++){
        var p2 = pJS.particles.array[j];

        /* link particles if enable */
        if(pJS.particles.line_linked.enable_auto){
          pJS.fn.vendors.distanceParticles(p,p2);
        }

        /* set interactivity if enable */
        if(pJS.interactivity.enable){

          /* interactivity mode */
          switch(pJS.interactivity.mode){
            case 'grab':
              pJS.fn.vendors.interactivity.grabParticles(p,p2);
            break;
          }

        }


      }
    }
  };

  pJS.fn.particlesDraw = function(){
    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* move particles */
    pJS.fn.particlesAnimate();

    /* draw each particle */
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p = pJS.particles.array[i];
      p.draw('rgba('+p.color.r+','+p.color.g+','+p.color.b+','+p.opacity+')');
    }

  };

  pJS.fn.particlesRemove = function(){
    pJS.particles.array = [];
  };


  /* ---------- VENDORS functions ------------ */

  pJS.fn.vendors.distanceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* Check distance between particle and mouse mos */
    if(dist <= pJS.particles.line_linked.distance) {

      /* draw the line */
      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (pJS.particles.line_linked.opacity-dist/pJS.particles.line_linked.distance) +')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(p2.x, p2.y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();

      /* condensed particles */
      if(pJS.particles.line_linked.condensed_mode.enable){
        var dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            ax = dx/(pJS.particles.line_linked.condensed_mode.rotateX*1000),
            ay = dy/(pJS.particles.line_linked.condensed_mode.rotateY*1000);
        p2.vx += ax;
        p2.vy += ay;
      }

    }

  };

  pJS.fn.vendors.interactivity.listeners = function(){

    /* init el */
    if(pJS.interactivity.detect_on == 'window'){
      var detect_el = window;
    }else{
      var detect_el = pJS.canvas.el;
    }

    /* el on mousemove */
    detect_el.onmousemove = function(e){

      if(detect_el == window){
        var pos_x = e.clientX,
            pos_y = e.clientY;
      }
      else{
        var pos_x = e.offsetX||e.clientX,
            pos_y = e.offsetY||e.clientY;
      }

      if(pJS){

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if(pJS.retina){
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';
      }

    };

    /* el on onmouseleave */
    detect_el.onmouseleave = function(e){

      if(pJS){
        pJS.interactivity.mouse.pos_x = 0;
        pJS.interactivity.mouse.pos_y = 0;
        pJS.interactivity.status = 'mouseleave';
      }

    };

    /* el on onclick */
    if(pJS.interactivity.events.onclick.enable){
      switch(pJS.interactivity.events.onclick.mode){
        case 'push':
          detect_el.onclick = function(e){
            pJS.fn.vendors.interactivity.pushParticles(pJS.interactivity.events.onclick.nb, pJS.interactivity.mouse);
          }
        break;

        case 'remove':
          detect_el.onclick = function(e){
            pJS.fn.vendors.interactivity.removeParticles(pJS.interactivity.events.onclick.nb);
          }
        break;
      }
    }
  };

  pJS.fn.vendors.interactivity.pushParticles = function(nb, pos){
    if(pJS){
      for(var i = 0; i < nb; i++){
        pJS.particles.array.push(
          new pJS.fn.particle(
            pJS.particles.color_rgb,
            pJS.particles.opacity.opacity,
            {
              'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
              'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
            }
          )
        )
      }
    }
  };

  pJS.fn.vendors.interactivity.removeParticles = function(nb){
    if(pJS){
      pJS.particles.array.splice(0, nb);
    }
  };


  pJS.fn.vendors.interactivity.grabParticles = function(p1, p2){
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    var dx_mouse = p1.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p1.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

    /* Check distance between 2 particles + Check distance between 1 particle and mouse position */
    if(dist <= pJS.particles.line_linked.distance && dist_mouse <= pJS.interactivity.mouse.distance && pJS.interactivity.status == 'mousemove'){
      /* Draw the line */
      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (pJS.interactivity.line_linked.opacity-dist_mouse/pJS.interactivity.mouse.distance) +')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();
    }
  };

  pJS.fn.vendors.destroy = function(){
    cancelAnimationFrame(pJS.fn.requestAnimFrame);
    canvas_el.remove();
    pJS = null;
  };


  /* --------- LAUNCH ----------- */

  function launchParticles(){
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.particlesDraw();
    pJS.fn.densityAuto();
  };


  function launchAnimation(){
    pJS.fn.particlesDraw();
    pJS.fn.requestAnimFrame = requestAnimFrame(launchAnimation);
  };


  launchParticles();

  if(pJS.particles.anim.enable){
    launchAnimation();
  }

  if(pJS.interactivity.enable){
    pJS.fn.vendors.interactivity.listeners();
  }


};

/* --- VENDORS --- */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
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

function hexToRgb(hex){
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

window.particlesJS = function(tag_id, params){

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    launchParticlesJS(tag_id, params);
  }

};
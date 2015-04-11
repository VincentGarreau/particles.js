/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v1.1.1
/* ----------------------------------------------- */

function launchParticlesJS(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > canvas');

  /* particles.js variables with default values */
  window.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      color: '#fff',
      color_random: false,
      shape: {
        type: 'circle', // "circle", "edge", "triangle", "polygon", "star" or "image"
        nb_sides: 5, // 5+
        img_src: 'http://f.cl.ly/items/3s2O2E0c3L3x2Q3J1y1Q/github.svg',
        img_width: 100,
        img_height: 100
      },
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

  Object.deepExtend = function(destination, source) {
    for (var property in source) {
      if (source[property] && source[property].constructor &&
       source[property].constructor === Object) {
        destination[property] = destination[property] || {};
        arguments.callee(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  };

  /* params settings */
  if(params){
    Object.deepExtend(pJS, params);
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
    if(pJS.particles.color_random === true){
      this.color = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
     else if( pJS.particles.color_random instanceof Array){
      this.color = pJS.particles.color_random[Math.floor(Math.random() * pJS.particles.color_random.length)];
        this.color = hexToRgb(this.color);
    }
    else{
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

    /* if shape is image */
    if(pJS.particles.shape.type == 'image'){
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.img_src,
        ratio: sh.img_width / sh.img_height,
        type: sh.img_src.substr(sh.img_src.length - 3)
      }
      if(!this.img.ratio) this.img.ratio = 1;
    }

  };

  pJS.fn.particle.prototype.draw = function() {

    pJS.canvas.ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.opacity+')';
    pJS.canvas.ctx.beginPath();

    switch(pJS.particles.shape.type){

      case 'circle':
        pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      break;

      case 'edge':
        pJS.canvas.ctx.rect(this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
      break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, this.x-this.radius, this.y+this.radius / 1.66, this.radius*2, 3, 2);
      break;

      case 'polygon':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          this.x - this.radius / (pJS.particles.shape.nb_sides/3.5), // startX
          this.y - this.radius / (2.66/3.5), // startY
          this.radius*2.66 / (pJS.particles.shape.nb_sides/3), // sideLength
          pJS.particles.shape.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
      break;

      case 'star':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          this.x - this.radius*2 / (pJS.particles.shape.nb_sides/4), // startX
          this.y - this.radius / (2*2.66/3.5), // startY
          this.radius*2*2.66 / (pJS.particles.shape.nb_sides/3), // sideLength
          pJS.particles.shape.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
      break;

      case 'image':

        var t = this;

        if(t.img.obj){
          drawImg();
        }else{
          createImgObj(t.img.type);
        }

        function drawImg(){
          pJS.canvas.ctx.drawImage(
            t.img.obj,
            t.x-t.radius,
            t.y-t.radius,
            t.radius*2,
            t.radius*2 / t.img.ratio
          );
        }

        function createImgObj(img_type){

          // SVG

          if(img_type == 'svg'){

            var xhr = new XMLHttpRequest();
            xhr.open('GET', t.img.src);
            xhr.onreadystatechange = function (data) {

              var svgXml = data.currentTarget.response,
                  rgbHex = /#([0-9A-F]{3,6})/gi,
                  coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
                    return 'rgb(' + t.color.r + ','
                                  + t.color.g + ','
                                  + t.color.b + ')';
                  });

              var svg = new Blob([coloredSvgXml], {type: 'image/svg+xml;charset=utf-8'}),
                  DOMURL = window.URL || window.webkitURL || window,
                  url = DOMURL.createObjectURL(svg);

              var img = new Image();
              img.onload = function (){
                t.img.obj = img;
                DOMURL.revokeObjectURL(url);
              }
              img.src = url;

            }
            xhr.send();

          }

          // PNG

          else if(img_type == 'png'){
            var img = new Image();
            img.onload = function(){
              t.img.obj = img;
            }
            img.src = t.img.src;
          }

        }

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
      if(p.x - p.radius > pJS.canvas.w) p.x = p.radius;
      else if(p.x + p.radius < 0) p.x = pJS.canvas.w + p.radius;
      if(p.y - p.radius > pJS.canvas.h) p.y = p.radius;
      else if(p.y + p.radius < 0) p.y = pJS.canvas.h + p.radius;

      switch(pJS.interactivity.events.onresize.mode){
        case 'bounce':
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
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

  // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
  pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator){
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0,0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength,0);
      c.translate(sideLength,0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();
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
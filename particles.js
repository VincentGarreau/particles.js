/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com 
/* Github : https://github.com/VincentGarreau/particles.js
/* ----------------------------------------------- */

function launchParticlesJS(the_id, params){

	/* particles.js variables */
	pJS = {
		canvas: {
			el: document.querySelector('#'+the_id+' > canvas'),
			w: document.querySelector('#'+the_id+' > canvas').offsetWidth,
			h: document.querySelector('#'+the_id+' > canvas').offsetHeight,
			color_hex_bg: '#111',
			opacity: 1
		},
		particles: {
			color_hex: '#fff',
			opacity: 1,
			size: 2.5,
			size_random: true,
			nb: 200,
			array: [],
			anim: {
			    speed: 1
			}
		},
		retina_detect: true,
		interactivity: {},
		fn: {}
	};

	/* params settings */
	if(params){
		pJS.canvas.color_hex_bg = params.canvas.color_hex_bg;
		pJS.canvas.opacity = params.canvas.opacity;
		pJS.particles.color_hex = params.particles.color_hex;
		pJS.particles.opacity = params.particles.opacity;
		pJS.particles.size = params.particles.size;
		pJS.particles.size_random = params.particles.size_random;
		pJS.particles.nb = params.particles.nb;
		pJS.particles.anim.speed = params.particles.anim.speed;
		pJS.retina_detect = params.retina_detect;
	}

	/* convert hex colors to rgb */
	pJS.canvas.color_rgb_bg = hexToRgb(pJS.canvas.color_hex_bg);
	pJS.particles.color_rgb = hexToRgb(pJS.particles.color_hex);

	/* detect retina */
	if(pJS.retina_detect){
		if(window.devicePixelRatio > 1){
			pJS.retina = true;
			pJS.canvas.w = pJS.canvas.el.offsetWidth*2;
			pJS.canvas.h = pJS.canvas.el.offsetHeight*2;
			pJS.particles.anim.speed = pJS.particles.anim.speed*2; 
		}
	};


	/* ---------- CANVAS functions ------------ */
	 
	pJS.fn.canvasInit = function(){
		pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
	};

	pJS.fn.canvasSize = function(){
		pJS.canvas.el.width = pJS.canvas.w;
		pJS.canvas.el.height = pJS.canvas.h;

		window.onresize = function(){
			/* resize canvas */
			if(pJS.retina){
				pJS.canvas.w = pJS.canvas.el.offsetWidth*2;
				pJS.canvas.h = pJS.canvas.el.offsetHeight*2;
			}else{
				pJS.canvas.w = pJS.canvas.el.offsetWidth;
				pJS.canvas.h = pJS.canvas.el.offsetHeight;
			}
			pJS.canvas.el.width = pJS.canvas.w;
			pJS.canvas.el.height = pJS.canvas.h;

			/* repaint canvas */
			pJS.fn.canvasPaint();
		}
	};

	pJS.fn.canvasPaint = function(){
		pJS.canvas.ctx.fillStyle = 'rgba('+pJS.canvas.color_rgb_bg.r+','+pJS.canvas.color_rgb_bg.g+','+pJS.canvas.color_rgb_bg.b+','+pJS.canvas.opacity+')';
		pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
	};


	/* --------- PARTICLES functions ----------- */


	pJS.fn.particle = function(color, opacity){

		/* position */
		this.x = Math.random() * pJS.canvas.w;
		this.y = Math.random() * pJS.canvas.h;

		/* size */
		if(pJS.retina){
			if(pJS.particles.size_random){
				this.radius = Math.random() * pJS.particles.size * 2;	
			}else{
				this.radius = pJS.particles.size * 2;	
			}
		}else{
			if(pJS.particles.size_random){
				this.radius = Math.random() * pJS.particles.size * 1;	
			}else{
				this.radius = pJS.particles.size * 1;	
			}
		}
		
		/* color */
		this.color = color;

		/* opacity */
		this.opacity = opacity;

		/* animation - velocity for speed */
		this.vx = -.5 + Math.random() * 1;
		this.vy = -.5 + Math.random() * 1;

		/* draw function */
		this.draw = function(){
			pJS.canvas.ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.opacity+')';
			pJS.canvas.ctx.beginPath();
			pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			pJS.canvas.ctx.fill();
		}

	};


	pJS.fn.particlesCreate = function(){
		for(var i = 0; i < pJS.particles.nb; i++) {
			pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity));
		}
	};

	pJS.fn.particlesAnimate = function(){
		for(var i = 0; i < pJS.particles.array.length; i++){
			/* the particle */
			var p = pJS.particles.array[i];

			/* move the particle */
			p.x += p.vx * pJS.particles.anim.speed;
			p.y += p.vy * pJS.particles.anim.speed;

			/* change particle position if it is out of window */
			if(p.x + p.radius > pJS.canvas.w) p.x = p.radius;
			else if(p.x - p.radius < 0) p.x = pJS.canvas.w - p.radius;
			if(p.y + p.radius > pJS.canvas.h) p.y = p.radius;
			else if(p.y - p.radius < 0) p.y = pJS.canvas.h - p.radius;
		}
	};

	pJS.fn.particlesDraw = function(){
		/* repaint canvas */
		pJS.fn.canvasPaint();

		/* draw each particle */
		for(var i = 0; i < pJS.particles.array.length; i++){
			var p = pJS.particles.array[i];
			p.draw('rgba('+p.color.r+','+p.color.g+','+p.color.b+','+p.opacity+')');
		}

		/* move particles */
		pJS.fn.particlesAnimate();
	};


	/* --------- LAUNCH ----------- */

	function launchParticles(){
		pJS.fn.canvasInit();
		pJS.fn.canvasSize();
		pJS.fn.canvasPaint();
		pJS.fn.particlesCreate();
		pJS.fn.particlesDraw();
	};

	launchParticles();


	function launchAnimation(){
		pJS.fn.particlesDraw();
		requestAnimFrame(launchAnimation);
	};

	launchAnimation();


};

/* --- VENDORS --- */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function(callback){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

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

window.particlesJS = function(the_id, params){
	if(!the_id){ the_id = 'particles-js'; }
	
	/* create canvas element */
	var canvas_el = document.createElement('canvas');
	/* set size canvas */
	canvas_el.style.width = "100%";
	canvas_el.style.height = "100%";
	/* append canvas */
	var canvas = document.getElementById(the_id).appendChild(canvas_el);

	/* launch particle.js */
	if(canvas != null){
		launchParticlesJS(the_id, params);
	}
};
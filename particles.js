/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com 
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

function launchParticlesJS(tag_id, params){

	/* particles.js variables with default values */
	pJS = {
		canvas: {
			el: document.querySelector('#'+tag_id+' > canvas'),
			w: document.querySelector('#'+tag_id+' > canvas').offsetWidth,
			h: document.querySelector('#'+tag_id+' > canvas').offsetHeight
		},
		particles: {
			color: '#fff',
			shape: 'circle',
			opacity: 1,
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
					enable: true,
					rotateX: 65000,
					rotateY: 65000
				}
			},
			anim: {
				enable: true,
			    speed: 1
			},
			array: []
		},
		interactivity: {
			enable: true,
			mouse: {
				distance: 100
			},
			detect_on: 'canvas',
			mode: 'grab'
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
			if(params.particles.color) pJS.particles.color = params.particles.color;
			if(params.particles.shape) pJS.particles.shape = params.particles.shape;
			if(params.particles.opacity) pJS.particles.opacity = params.particles.opacity;
			if(params.particles.size) pJS.particles.size = params.particles.size;
			if(params.particles.size_random == false) pJS.particles.size_random = params.particles.size_random;
			if(params.particles.nb) pJS.particles.nb = params.particles.nb;
			if(params.particles.line_linked){
				if(params.particles.line_linked.enable_auto == false) pJS.particles.line_linked.enable_auto = params.particles.line_linked.enable_auto;
				if(params.particles.line_linked.distance) pJS.particles.line_linked.distance = params.particles.line_linked.distance;
				if(params.particles.line_linked.color) pJS.particles.line_linked.color = params.particles.line_linked.color;
				if(params.particles.line_linked.opacity) pJS.particles.line_linked.opacity = params.particles.line_linked.opacity;
				if(params.particles.line_linked.width) pJS.particles.line_linked.width = params.particles.line_linked.width;
				if(params.particles.line_linked.condensed_mode){
					if(params.particles.line_linked.condensed_mode.enable == false) pJS.particles.line_linked.condensed_mode.enable = params.particles.line_linked.condensed_mode.enable;
					//if(params.particles.line_linked.condensed_mode.acceleration == false) pJS.particles.line_linked.condensed_mode.acceleration = params.particles.line_linked.condensed_mode.acceleration;
					if(params.particles.line_linked.condensed_mode.rotateX) pJS.particles.line_linked.condensed_mode.rotateX = params.particles.line_linked.condensed_mode.rotateX;
					if(params.particles.line_linked.condensed_mode.rotateY) pJS.particles.line_linked.condensed_mode.rotateY = params.particles.line_linked.condensed_mode.rotateY;
				}
			}
			if(params.particles.anim){
				if(params.particles.anim.enable == false) pJS.particles.anim.enable = params.particles.anim.enable;
				if(params.particles.anim.speed) pJS.particles.anim.speed = params.particles.anim.speed;
			}
		}
		if(params.interactivity){
			if(params.interactivity.enable == false) pJS.interactivity.enable = params.interactivity.enable;
			if(params.interactivity.mouse){
				if(params.interactivity.mouse.distance) pJS.interactivity.mouse.distance = params.interactivity.mouse.distance;
			}
			if(params.interactivity.mode) pJS.interactivity.mode = params.interactivity.mode;
			if(params.interactivity.detect_on) pJS.interactivity.detect_on = params.interactivity.detect_on;
		}
		pJS.retina_detect = params.retina_detect;
	}

	/* convert hex colors to rgb */
	pJS.particles.color_rgb = hexToRgb(pJS.particles.color);
	pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

	/* detect retina */
	if(pJS.retina_detect){
		if(window.devicePixelRatio > 1){
			pJS.retina = true;
			pJS.canvas.w = pJS.canvas.el.offsetWidth*2;
			pJS.canvas.h = pJS.canvas.el.offsetHeight*2;
			pJS.particles.anim.speed = pJS.particles.anim.speed*2; 
			pJS.particles.line_linked.distance = pJS.particles.line_linked.distance*2;
			pJS.particles.line_linked.width = pJS.particles.line_linked.width*2;
			pJS.interactivity.mouse.distance = pJS.interactivity.mouse.distance*2; 
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
			if(!pJS.particles.anim.enable){
				pJS.fn.particlesRemove();
				pJS.fn.canvasRemove();
				launchParticles();
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
		this.vx = -.5 + Math.random();
		this.vy = -.5 + Math.random();

		/* draw function */
		this.draw = function(){
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
					pJS.canvas.ctx.moveTo(this.x,this.y);
					pJS.canvas.ctx.lineTo(this.x+this.radius,this.y+this.radius*2);
					pJS.canvas.ctx.lineTo(this.x-this.radius,this.y+this.radius*2);
					pJS.canvas.ctx.closePath();
				break;
			}
			
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
			p.x += p.vx * (pJS.particles.anim.speed/2);
			p.y += p.vy * (pJS.particles.anim.speed/2);

			/* change particle position if it is out of canvas */
			if(p.x - p.radius > pJS.canvas.w) p.x = p.radius;
			else if(p.x + p.radius < 0) p.x = pJS.canvas.w + p.radius;
			if(p.y - p.radius > pJS.canvas.h) p.y = p.radius;
			else if(p.y + p.radius < 0) p.y = pJS.canvas.h + p.radius;

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
	}


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
				var dx = p1.x - p2.x;
					dy = p1.y - p2.y;
				var ax = dx/(pJS.particles.line_linked.condensed_mode.rotateX*1000),
					ay = dy/(pJS.particles.line_linked.condensed_mode.rotateY*1000);
				// p1.vx -= ax;
				// p1.vy -= ay;
				p2.vx += ax;
				p2.vy += ay; 
			}

		}
	}

	pJS.fn.vendors.interactivity.listeners = function(){
		if(pJS.interactivity.detect_on == 'window'){
			var detect_el = window
		}else{
			var detect_el = pJS.canvas.el
		}
			
		detect_el.onmousemove = function(e){
			if(pJS.retina){
				pJS.interactivity.mouse.pos_x = e.pageX*2;
				pJS.interactivity.mouse.pos_y = e.pageY*2;
			}else{
				pJS.interactivity.mouse.pos_x = e.pageX;
				pJS.interactivity.mouse.pos_y = e.pageY;
			}
			pJS.interactivity.status = 'mousemove';
		}
		detect_el.onmouseleave = function(e){
			pJS.interactivity.mouse.pos_x = 0;
			pJS.interactivity.mouse.pos_y = 0;
			pJS.interactivity.status = 'mouseleave';
		}
	}

	pJS.fn.vendors.interactivity.grabParticles = function(p1, p2){
		var dx = p1.x - p2.x,
			dy = p1.y - p2.y,
			dist = Math.sqrt(dx*dx + dy*dy);

		var dx_mouse = p1.x - pJS.interactivity.mouse.pos_x,
			dy_mouse = p1.y - pJS.interactivity.mouse.pos_y,
			dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

		/* Check distace between 2 particles + Check distance between 1 particle and mouse position */
		if(dist <= pJS.particles.line_linked.distance && dist_mouse <= pJS.interactivity.mouse.distance && pJS.interactivity.status == 'mousemove'){
			/* Draw the line */
			var color_line = pJS.particles.line_linked.color_rgb_line;
			pJS.canvas.ctx.beginPath();
			pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (pJS.particles.line_linked.opacity-dist_mouse/pJS.interactivity.mouse.distance) +')';
			pJS.canvas.ctx.moveTo(p1.x, p1.y);
			pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
			pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
			pJS.canvas.ctx.stroke();
			pJS.canvas.ctx.closePath();
		}
	}


	/* --------- LAUNCH ----------- */

	function launchParticles(){
		pJS.fn.canvasInit();
		pJS.fn.canvasSize();
		pJS.fn.canvasPaint();
		pJS.fn.particlesCreate();
		pJS.fn.particlesDraw();
	};


	function launchAnimation(){
		pJS.fn.particlesDraw();
		requestAnimFrame(launchAnimation);
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
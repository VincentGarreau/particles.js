## particles.js

### A lightweight JavaScript library for creating particles.

Load particles.js and configure the particles:

**index.html**
```html
<div id="particles-js"></div>

<script src="particles.js"></script>
```

**app.js**
```javascript
/* particlesJS('dom-id', params);
/* @dom-id : set the html tag id [string, optional, default value : particles-js]
/* @params: set the params [object, optional, default values : check particles.js] */

particlesJS('particles-js', {
  particles: {
    color: '#fff',
    shape: 'circle', // "circle", "edge" or "triangle"
    opacity: .5,
    size: 2,
    size_random: true,
    nb: 100,
    line_linked: {
      enable_auto: true,
      distance: 100,
      color: '#fff',
      opacity: 1,
      width: 1,
      condensed_mode: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    },
    anim: {
      enable: true,
      speed: 2
    }
  },
  interactivity: {
    enable: true,
    mouse: {
      distance: 250
    },
    detect_on: 'canvas', // "canvas" or "window"
    mode: 'grab',
    line_linked: {
    	opacity: .5
    },
    events: {
    	onclick: {
    		push_particles: {
    			enable: true,
    			nb: 4
    		}
    	}
    }
  },
  /* Retina Display Support */
  retina_detect: true
});
```

### ***Live Demo***
<a href="http://codepen.io/VincentGarreau/pen/pnlso" target="_blank">CodePen demo</a>

<a href="http://htmlpreview.github.io/?https://github.com/VincentGarreau/particles.js/blob/master/demo/index.html" target="_blank">GitHub demo</a>

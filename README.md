## particles.js

### A lightweight JavaScript library for creating particles.

-------------------------------

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

/* config dom id (optional) + config particles params */
particlesJS('particles-js', {
  particles: {
    color: '#fff',
    color_random: false,
    shape: 'circle', // "circle", "edge" or "triangle"
    opacity: {
      opacity: 1,
      anim: {
        enable: true,
        speed: 1.5,
        opacity_min: 0,
        sync: false
      }
    },
    size: 4,
    size_random: true,
    nb: 150,
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
      speed: 1
    }
  },
  interactivity: {
    enable: true,
    mouse: {
      distance: 300
    },
    detect_on: 'canvas', // "canvas" or "window"
    mode: 'grab',
    line_linked: {
      opacity: .5
    },
    events: {
      onclick: {
        enable: true,
        mode: 'push', // "push" or "remove"
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
  /* Retina Display Support */
  retina_detect: true
});
```
-------------------------------
### ***Live Demo***
<a href="http://codepen.io/VincentGarreau/pen/pnlso" target="_blank">CodePen demo</a>

<a href="http://htmlpreview.github.io/?https://github.com/VincentGarreau/particles.js/blob/master/demo/index.html" target="_blank">GitHub demo</a>

-------------------------------

##### ***Install with Bower***
```
bower install particles.js --save
```

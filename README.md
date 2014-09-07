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
	    shape: 'circle', // 'circle', 'edge' or 'rectangle' 
		opacity: 1,
		size: 2.5,
		size_random: true,
		nb: 200,
		line_linked: {
			enable: true,
			distance: 200,
			color: '#fff',
			opacity: 1,
			width: 0.5,
			condensed_mode: {
				enable: false,
				rotateX: 100,
				rotateY: 100
			}
		},
		anim: {
			enable: true,
			speed: 1
		}
	},
	// Retina Display Support
	retina_detect: false
});
```

### ***Live Demo***
<a href="http://codepen.io/VincentGarreau/pen/pnlso" target="_blank">CodePen demo</a>

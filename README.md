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
	canvas: {
		color_hex_bg: '#15414e',
		opacity: 1
	},
	particles: {
	    color_hex: '#fff',
		opacity: 1,
		size: 2.5,
		size_random: true,
		nb: 200,
		anim: {
			speed: 2
		}
	},
	// Retina Display Support
	retina_detect: true
});
```

### ***Live Demo***
<a href="http://codepen.io/VincentGarreau/pen/pnlso" target="_blank">CodePen demo</a>

'use strict';

export class pJSRetina {
    constructor(pJS) {
        this.pJS = pJS;
    }

    init() {
        let pJS = this.pJS;
        let options = pJS.options;

        if (options.retina_detect && window.devicePixelRatio > 1) {
            pJS.canvas.pxratio = window.devicePixelRatio;
            pJS.retina = true;
        }
        else {
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
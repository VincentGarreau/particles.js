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
            pJS.tmp.retina = true;
        }
        else {
            pJS.canvas.pxratio = 1;
            pJS.tmp.retina = false;
        }

        pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
        pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
        options.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
        options.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
        options.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
        options.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
        options.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
        options.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
        options.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
        options.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
        options.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;
    }
}
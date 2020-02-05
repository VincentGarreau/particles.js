'use strict';

export class pJSCanvas {
    constructor(pJS) {
        this.pJS = pJS;
    }

    /* ---------- pJS functions - canvas ------------ */
    init() {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
    }

    size() {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;
        if (pJS && options.interactivity.events.resize) {
            window.addEventListener('resize', () => {
                pJS.canvas.w = pJS.canvas.el.offsetWidth;
                pJS.canvas.h = pJS.canvas.el.offsetHeight;
                /* resize canvas */
                if (pJS.retina) {
                    pJS.canvas.w *= pJS.canvas.pxratio;
                    pJS.canvas.h *= pJS.canvas.pxratio;
                }
                pJS.canvas.el.width = pJS.canvas.w;
                pJS.canvas.el.height = pJS.canvas.h;
                /* repaint canvas on anim disabled */
                if (!options.particles.move.enable) {
                    pJS.fn.particles.empty();
                    pJS.fn.particles.create();
                    pJS.fn.particles.draw();
                    pJS.fn.vendors.densityAutoParticles();
                }
                /* density particles enabled */
                pJS.fn.vendors.densityAutoParticles();
            });
        }
    }

    paint() {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
    }

    clear() {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
    }
}
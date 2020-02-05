import { pJSParticle } from './pjsparticle';
import { pJSUtils } from './pjsutils';

'use strict';

export class pJSParticles {
    pJS: any;

    constructor(pJS: any) {
        this.pJS = pJS;
    }

    /* --------- pJS functions - particles ----------- */
    create() {
        let pJS = this.pJS;
        let options = pJS.options;

        for (let i = 0; i < options.particles.number.value; i++) {
            pJS.particles.array.push(new pJSParticle(pJS, options.particles.color, options.particles.opacity.value));
        }
    }

    update() {
        let pJS = this.pJS;
        let options = pJS.options;

        for (let i = 0; i < pJS.particles.array.length; i++) {
            /* the particle */
            let p = pJS.particles.array[i];
            // let d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }
            /* move the particle */
            if (options.particles.move.enable) {
                let ms = options.particles.move.speed / 2;
                p.x += p.vx * ms;
                p.y += p.vy * ms;
            }
            /* parallax */
            if (pJS.interactivity.mouse.pos_x && options.interactivity.events.onhover.parallax.enable) {
                /* smaller is the particle, longer is the offset distance */
                let tmp_x = (pJS.interactivity.mouse.pos_x - (window.innerWidth / 2)) * (p.radius / options.interactivity.events.onhover.parallax.force);

                p.offsetX += (tmp_x - p.offsetX) / options.interactivity.events.onhover.parallax.smooth; // Easing equation

                let tmp_y = (pJS.interactivity.mouse.pos_y - (window.innerHeight / 2)) * (p.radius / options.interactivity.events.onhover.parallax.force);

                p.offsetY += (tmp_y - p.offsetY) / options.interactivity.events.onhover.parallax.smooth; // Easing equation
            }
            /* change opacity status */
            if (options.particles.opacity.anim.enable) {
                if (p.opacity_status == true) {
                    if (p.opacity >= options.particles.opacity.value)
                        p.opacity_status = false;
                    p.opacity += p.vo;
                }
                else {
                    if (p.opacity <= options.particles.opacity.anim.opacity_min)
                        p.opacity_status = true;
                    p.opacity -= p.vo;
                }
                if (p.opacity < 0)
                    p.opacity = 0;
            }
            /* change size */
            if (options.particles.size.anim.enable) {
                if (p.size_status == true) {
                    if (p.radius >= options.particles.size.value)
                        p.size_status = false;
                    p.radius += p.vs;
                }
                else {
                    if (p.radius <= options.particles.size.anim.size_min)
                        p.size_status = true;
                    p.radius -= p.vs;
                }
                if (p.radius < 0)
                    p.radius = 0;
            }
            /* change particle position if it is out of canvas */
            let new_pos;

            if (options.particles.move.out_mode == 'bounce') {
                new_pos = {
                    x_left: p.radius,
                    x_right: pJS.canvas.w,
                    y_top: p.radius,
                    y_bottom: pJS.canvas.h
                };
            }
            else {
                new_pos = {
                    x_left: -p.radius - p.offsetX,
                    x_right: pJS.canvas.w + p.radius + p.offsetX,
                    y_top: -p.radius - p.offsetY,
                    y_bottom: pJS.canvas.h + p.radius - p.offsetY
                };
            }
            if ((p.x) - p.radius > pJS.canvas.w - p.offsetX) {
                p.x = new_pos.x_left;
                p.y = Math.random() * pJS.canvas.h;
            }
            else if ((p.x) + p.radius < 0 - p.offsetX) {
                p.x = new_pos.x_right;
                p.y = Math.random() * pJS.canvas.h;
            }
            if ((p.y) - p.radius > pJS.canvas.h - p.offsetY) {
                p.y = new_pos.y_top;
                p.x = Math.random() * pJS.canvas.w;
            }
            else if ((p.y) + p.radius < 0 - p.offsetY) {
                p.y = new_pos.y_bottom;
                p.x = Math.random() * pJS.canvas.w;
            }
            /* out of canvas modes */
            switch (options.particles.move.out_mode) {
                case 'bounce':
                    if ((p.x + p.offsetX) + p.radius > pJS.canvas.w)
                        p.vx = -p.vx;
                    else if ((p.x + p.offsetX) - p.radius < 0)
                        p.vx = -p.vx;
                    if ((p.y + p.offsetY) + p.radius > pJS.canvas.h)
                        p.vy = -p.vy;
                    else if ((p.y + p.offsetY) - p.radius < 0)
                        p.vy = -p.vy;
                    break;
            }
            /* events */
            if (pJSUtils.isInArray('grab', options.interactivity.events.onhover.mode)) {
                pJS.fn.modes.grabParticle(p);
            }
            if (pJSUtils.isInArray('bubble', options.interactivity.events.onhover.mode) || pJSUtils.isInArray('bubble', options.interactivity.events.onclick.mode)) {
                pJS.fn.modes.bubbleParticle(p);
            }
            if (pJSUtils.isInArray('repulse', options.interactivity.events.onhover.mode) || pJSUtils.isInArray('repulse', options.interactivity.events.onclick.mode)) {
                pJS.fn.modes.repulseParticle(p);
            }
            /* interaction auto between particles */
            if (options.particles.line_linked.enable || options.particles.move.attract.enable) {
                for (let j = i + 1; j < pJS.particles.array.length; j++) {
                    let p2 = pJS.particles.array[j];
                    /* link particles */
                    if (options.particles.line_linked.enable) {
                        pJS.fn.interact.linkParticles(p, p2);
                    }
                    /* attract particles */
                    if (options.particles.move.attract.enable) {
                        pJS.fn.interact.attractParticles(p, p2);
                    }
                    /* bounce particles */
                    if (options.particles.move.bounce) {
                        pJS.fn.interact.bounceParticles(p, p2);
                    }
                }
            }
        }
    }

    draw() {
        let pJS = this.pJS;
        let options = pJS.options;

        /* clear canvas */
        pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
        /* update each particles param */
        pJS.fn.particles.update();
        /* draw each particle */
        for (let i = 0; i < pJS.particles.array.length; i++) {
            let p = pJS.particles.array[i];
            p.draw();
        }
    }

    empty() {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.particles.array = [];
    }

    async refresh() {
        let pJS = this.pJS;
        let options = pJS.options;

        /* init all */
        window["cancelRequestAnimFrame"](pJS.fn.checkAnimFrame);
        window["cancelRequestAnimFrame"](pJS.fn.drawAnimFrame);
        pJS.source_svg = undefined;
        pJS.img_obj = undefined;
        pJS.count_svg = 0;
        pJS.fn.particles.empty();
        pJS.fn.canvas.clear();
        /* restart */
        await pJS.fn.vendors.start();
    }
}
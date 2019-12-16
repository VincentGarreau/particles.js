'use strict';

import { pJSParticle } from './pjsparticle';

export class pJSParticles {
    constructor(pJS) {
        this.pJS = pJS;
    }

    /* --------- pJS functions - particles ----------- */
    create() {
        var pJS = this.pJS;

        for (var i = 0; i < pJS.particles.number.value; i++) {
            pJS.particles.array.push(new pJSParticle(pJS.particles.color, pJS.particles.opacity.value));
        }
    }

    update() {
        var pJS = this.pJS;

        for (var i = 0; i < pJS.particles.array.length; i++) {
            /* the particle */
            var p = pJS.particles.array[i];
            // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
            // var f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     var t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }
            /* move the particle */
            if (pJS.particles.move.enable) {
                var ms = pJS.particles.move.speed / 2;
                p.x += p.vx * ms;
                p.y += p.vy * ms;
            }
            /* parallax */
            if (pJS.interactivity.mouse.pos_x && pJS.interactivity.events.onhover.parallax.enable) {
                /* smaller is the particle, longer is the offset distance */
                var tmp_x = (pJS.interactivity.mouse.pos_x - (window.innerWidth / 2)) * (p.radius / pJS.interactivity.events.onhover.parallax.force);
                p.offsetX += (tmp_x - p.offsetX) / pJS.interactivity.events.onhover.parallax.smooth; // Easing equation
                var tmp_y = (pJS.interactivity.mouse.pos_y - (window.innerHeight / 2)) * (p.radius / pJS.interactivity.events.onhover.parallax.force);
                p.offsetY += (tmp_y - p.offsetY) / pJS.interactivity.events.onhover.parallax.smooth; // Easing equation
            }
            /* change opacity status */
            if (pJS.particles.opacity.anim.enable) {
                if (p.opacity_status == true) {
                    if (p.opacity >= pJS.particles.opacity.value)
                        p.opacity_status = false;
                    p.opacity += p.vo;
                }
                else {
                    if (p.opacity <= pJS.particles.opacity.anim.opacity_min)
                        p.opacity_status = true;
                    p.opacity -= p.vo;
                }
                if (p.opacity < 0)
                    p.opacity = 0;
            }
            /* change size */
            if (pJS.particles.size.anim.enable) {
                if (p.size_status == true) {
                    if (p.radius >= pJS.particles.size.value)
                        p.size_status = false;
                    p.radius += p.vs;
                }
                else {
                    if (p.radius <= pJS.particles.size.anim.size_min)
                        p.size_status = true;
                    p.radius -= p.vs;
                }
                if (p.radius < 0)
                    p.radius = 0;
            }
            /* change particle position if it is out of canvas */
            if (pJS.particles.move.out_mode == 'bounce') {
                var new_pos = {
                    x_left: p.radius,
                    x_right: pJS.canvas.w,
                    y_top: p.radius,
                    y_bottom: pJS.canvas.h
                };
            }
            else {
                var new_pos = {
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
            switch (pJS.particles.move.out_mode) {
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
            if (isInArray('grab', pJS.interactivity.events.onhover.mode)) {
                pJS.fn.modes.grabParticle(p);
            }
            if (isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
                pJS.fn.modes.bubbleParticle(p);
            }
            if (isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
                pJS.fn.modes.repulseParticle(p);
            }
            /* interaction auto between particles */
            if (pJS.particles.line_linked.enable || pJS.particles.move.attract.enable) {
                for (var j = i + 1; j < pJS.particles.array.length; j++) {
                    var p2 = pJS.particles.array[j];
                    /* link particles */
                    if (pJS.particles.line_linked.enable) {
                        pJS.fn.interact.linkParticles(p, p2);
                    }
                    /* attract particles */
                    if (pJS.particles.move.attract.enable) {
                        pJS.fn.interact.attractParticles(p, p2);
                    }
                    /* bounce particles */
                    if (pJS.particles.move.bounce) {
                        pJS.fn.interact.bounceParticles(p, p2);
                    }
                }
            }
        }
    }

    draw() {
        var pJS = this.pJS;

        /* clear canvas */
        pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
        /* update each particles param */
        pJS.fn.particles.update();
        /* draw each particle */
        for (var i = 0; i < pJS.particles.array.length; i++) {
            var p = pJS.particles.array[i];
            p.draw();
        }
    }

    empty() {
        var pJS = this.pJS;

        pJS.particles.array = [];
    }

    refresh() {
        var pJS = this.pJS;

        /* init all */
        cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
        cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
        pJS.tmp.source_svg = undefined;
        pJS.tmp.img_obj = undefined;
        pJS.tmp.count_svg = 0;
        pJS.fn.particles.empty();
        pJS.fn.canvas.clear();
        /* restart */
        pJS.fn.vendors.start();
    }
}
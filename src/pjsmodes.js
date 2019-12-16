'use strict';

import { isInArray, clamp } from './pjsutils';
import { pJSParticle } from './pjsparticle';

export class pJSModes {
    constructor(pJS) {
        this.pJS = pJS;
    }

    /* ---------- pJS functions - modes events ------------ */
    pushParticles(nb, pos) {
        let pJS = this.pJS;

        pJS.tmp.pushing = true;
        for (var i = 0; i < nb; i++) {
            pJS.particles.array.push(new pJSParticle(pJS, pJS.particles.color, pJS.particles.opacity.value, {
                'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
                'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
            }));
            if (i == nb - 1) {
                if (!pJS.particles.move.enable) {
                    pJS.fn.particles.draw();
                }
                pJS.tmp.pushing = false;
            }
        }
    }

    removeParticles(nb) {
        let pJS = this.pJS;

        pJS.particles.array.splice(0, nb);
        if (!pJS.particles.move.enable) {
            pJS.fn.particles.draw();
        }
    }

    bubbleParticle(p) {
        let pJS = this.pJS;

        /* on hover event */
        if (pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)) {
            var dx_mouse = (p.x + p.offsetX) - pJS.interactivity.mouse.pos_x, dy_mouse = (p.y + p.offsetY) - pJS.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse), ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;
            function init() {
                p.opacity_bubble = p.opacity;
                p.radius_bubble = p.radius;
            }
            /* mousemove - check ratio */
            if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
                if (ratio >= 0 && pJS.interactivity.status == 'mousemove') {
                    /* size */
                    if (pJS.interactivity.modes.bubble.size != pJS.particles.size.value) {
                        if (pJS.interactivity.modes.bubble.size > pJS.particles.size.value) {
                            var size = p.radius + (pJS.interactivity.modes.bubble.size * ratio);
                            if (size >= 0) {
                                p.radius_bubble = size;
                            }
                        }
                        else {
                            var dif = p.radius - pJS.interactivity.modes.bubble.size, size = p.radius - (dif * ratio);
                            if (size > 0) {
                                p.radius_bubble = size;
                            }
                            else {
                                p.radius_bubble = 0;
                            }
                        }
                    }
                    /* opacity */
                    if (pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value) {
                        if (pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value) {
                            var opacity = pJS.interactivity.modes.bubble.opacity * ratio;
                            if (opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity) {
                                p.opacity_bubble = opacity;
                            }
                        }
                        else {
                            var opacity = p.opacity - (pJS.particles.opacity.value - pJS.interactivity.modes.bubble.opacity) * ratio;
                            if (opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity) {
                                p.opacity_bubble = opacity;
                            }
                        }
                    }
                }
            }
            else {
                init();
            }
            /* mouseleave */
            if (pJS.interactivity.status == 'mouseleave') {
                init();
            }
        }
        /* on click event */
        else if (pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
            if (pJS.tmp.bubble_clicking) {
                var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x, dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse), time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000;
                if (time_spent > pJS.interactivity.modes.bubble.duration) {
                    pJS.tmp.bubble_duration_end = true;
                }
                if (time_spent > pJS.interactivity.modes.bubble.duration * 2) {
                    pJS.tmp.bubble_clicking = false;
                    pJS.tmp.bubble_duration_end = false;
                }
            }
            function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {
                if (bubble_param != particles_param) {
                    if (!pJS.tmp.bubble_duration_end) {
                        if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
                            if (p_obj_bubble != undefined)
                                var obj = p_obj_bubble;
                            else
                                var obj = p_obj;
                            if (obj != bubble_param) {
                                var value = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration);
                                if (id == 'size')
                                    p.radius_bubble = value;
                                if (id == 'opacity')
                                    p.opacity_bubble = value;
                            }
                        }
                        else {
                            if (id == 'size')
                                p.radius_bubble = undefined;
                            if (id == 'opacity')
                                p.opacity_bubble = undefined;
                        }
                    }
                    else {
                        if (p_obj_bubble != undefined) {
                            var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration), dif = bubble_param - value_tmp;
                            value = bubble_param + dif;
                            if (id == 'size')
                                p.radius_bubble = value;
                            if (id == 'opacity')
                                p.opacity_bubble = value;
                        }
                    }
                }
            }
            if (pJS.tmp.bubble_clicking) {
                /* size */
                process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
                /* opacity */
                process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
            }
        }
    }

    repulseParticle(p) {
        let pJS = this.pJS;

        if (pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {
            var dx_mouse = p.x - pJS.interactivity.mouse.pos_x, dy_mouse = p.y - pJS.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            var normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse }, repulseRadius = pJS.interactivity.modes.repulse.distance, velocity = 100, repulseFactor = clamp((1 / repulseRadius) * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);
            var pos = {
                x: p.x + normVec.x * repulseFactor,
                y: p.y + normVec.y * repulseFactor
            };
            if (pJS.particles.move.out_mode == 'bounce') {
                if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w)
                    p.x = pos.x;
                if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h)
                    p.y = pos.y;
            }
            else {
                p.x = pos.x;
                p.y = pos.y;
            }
        }
        else if (pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
            if (!pJS.tmp.repulse_finish) {
                pJS.tmp.repulse_count++;
                if (pJS.tmp.repulse_count == pJS.particles.array.length) {
                    pJS.tmp.repulse_finish = true;
                }
            }
            if (pJS.tmp.repulse_clicking) {
                var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance / 6, 3);
                var dx = pJS.interactivity.mouse.click_pos_x - p.x, dy = pJS.interactivity.mouse.click_pos_y - p.y, d = dx * dx + dy * dy;
                var force = -repulseRadius / d * 1;
                function process() {
                    var f = Math.atan2(dy, dx);
                    p.vx = force * Math.cos(f);
                    p.vy = force * Math.sin(f);
                    if (pJS.particles.move.out_mode == 'bounce') {
                        var pos = {
                            x: p.x + p.vx,
                            y: p.y + p.vy
                        };
                        if (pos.x + p.radius > pJS.canvas.w)
                            p.vx = -p.vx;
                        else if (pos.x - p.radius < 0)
                            p.vx = -p.vx;
                        if (pos.y + p.radius > pJS.canvas.h)
                            p.vy = -p.vy;
                        else if (pos.y - p.radius < 0)
                            p.vy = -p.vy;
                    }
                }
                // default
                if (d <= repulseRadius) {
                    process();
                }
                // bang - slow motion mode
                // if(!pJS.tmp.repulse_finish){
                //   if(d <= repulseRadius){
                //     process();
                //   }
                // }else{
                //   process();
                // }
            }
            else {
                if (pJS.tmp.repulse_clicking == false) {
                    p.vx = p.vx_i;
                    p.vy = p.vy_i;
                }
            }
        }
    }

    grabParticle(p) {
        let pJS = this.pJS;

        if (pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove') {
            var dx_mouse = p.x - pJS.interactivity.mouse.pos_x, dy_mouse = p.y - pJS.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            /* draw a line between the cursor and the particle if the distance between them is under the config distance */
            if (dist_mouse <= pJS.interactivity.modes.grab.distance) {
                var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1 / pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;
                if (opacity_line > 0) {
                    /* style */
                    var color_line = pJS.particles.line_linked.color_rgb_line;
                    pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
                    pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
                    //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
                    /* path */
                    pJS.canvas.ctx.beginPath();
                    pJS.canvas.ctx.moveTo(p.x + p.offsetX, p.y + p.offsetY);
                    pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
                    pJS.canvas.ctx.stroke();
                    pJS.canvas.ctx.closePath();
                }
            }
        }
    }
}
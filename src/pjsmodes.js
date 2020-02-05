import { isInArray, hexToRgb, clamp } from './pjsutils';
import { pJSParticle } from './pjsparticle';

'use strict';

export class pJSModes {
    constructor(pJS) {
        this.pJS = pJS;
    }

    /* ---------- pJS functions - modes events ------------ */
    pushParticles(nb, pos) {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.pushing = true;
        for (let i = 0; i < nb; i++) {
            pJS.particles.array.push(new pJSParticle(pJS, options.particles.color, options.particles.opacity.value, {
                'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
                'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
            }));
            if (i == nb - 1) {
                if (!options.particles.move.enable) {
                    pJS.fn.particles.draw();
                }
                pJS.pushing = false;
            }
        }
    }

    removeParticles(nb) {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.particles.array.splice(0, nb);
        if (!options.particles.move.enable) {
            pJS.fn.particles.draw();
        }
    }

    bubbleParticle(p) {
        let pJS = this.pJS;
        let options = pJS.options;

        /* on hover event */
        if (options.interactivity.events.onhover.enable && isInArray('bubble', options.interactivity.events.onhover.mode)) {
            let dx_mouse = (p.x + p.offsetX) - pJS.interactivity.mouse.pos_x;
            let dy_mouse = (p.y + p.offsetY) - pJS.interactivity.mouse.pos_y;
            let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            let ratio = 1 - dist_mouse / options.interactivity.modes.bubble.distance;

            function init() {
                p.opacity_bubble = p.opacity;
                p.radius_bubble = p.radius;
            }
            /* mousemove - check ratio */
            if (dist_mouse <= options.interactivity.modes.bubble.distance) {
                if (ratio >= 0 && pJS.interactivity.status == 'mousemove') {
                    /* size */
                    if (options.interactivity.modes.bubble.size != options.particles.size.value) {
                        if (options.interactivity.modes.bubble.size > options.particles.size.value) {
                            let size = p.radius + (options.interactivity.modes.bubble.size * ratio);
                            if (size >= 0) {
                                p.radius_bubble = size;
                            }
                        }
                        else {
                            let dif = p.radius - options.interactivity.modes.bubble.size;
                            let size = p.radius - (dif * ratio);
                            
                            if (size > 0) {
                                p.radius_bubble = size;
                            }
                            else {
                                p.radius_bubble = 0;
                            }
                        }
                    }
                    /* opacity */
                    if (options.interactivity.modes.bubble.opacity != options.particles.opacity.value) {
                        if (options.interactivity.modes.bubble.opacity > options.particles.opacity.value) {
                            let opacity = options.interactivity.modes.bubble.opacity * ratio;
                            if (opacity > p.opacity && opacity <= options.interactivity.modes.bubble.opacity) {
                                p.opacity_bubble = opacity;
                            }
                        }
                        else {
                            let opacity = p.opacity - (options.particles.opacity.value - options.interactivity.modes.bubble.opacity) * ratio;
                            if (opacity < p.opacity && opacity >= options.interactivity.modes.bubble.opacity) {
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
        else if (options.interactivity.events.onclick.enable && isInArray('bubble', options.interactivity.events.onclick.mode)) {
            if (pJS.bubble_clicking) {
                let dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x;
                let dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y;
                let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
                let time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000;

                if (time_spent > options.interactivity.modes.bubble.duration) {
                    pJS.bubble_duration_end = true;
                }
                if (time_spent > options.interactivity.modes.bubble.duration * 2) {
                    pJS.bubble_clicking = false;
                    pJS.bubble_duration_end = false;
                }
            }
            function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {
                if (bubble_param != particles_param) {
                    if (!pJS.bubble_duration_end) {
                        if (dist_mouse <= options.interactivity.modes.bubble.distance) {
                            let obj;

                            if (p_obj_bubble != undefined)
                                obj = p_obj_bubble;
                            else
                                obj = p_obj;
                            if (obj != bubble_param) {
                                let value = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration);

                                if (id == 'size')
                                    p.radius_bubble = value;
                                if (id == 'opacity')
                                    p.opacity_bubble = value;
                            }
                        } else {
                            if (id == 'size')
                                p.radius_bubble = undefined;
                            if (id == 'opacity')
                                p.opacity_bubble = undefined;
                        }
                    }
                    else {
                        if (p_obj_bubble != undefined) {
                            let value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration), dif = bubble_param - value_tmp;
                            let value = bubble_param + dif;

                            if (id == 'size')
                                p.radius_bubble = value;
                            if (id == 'opacity')
                                p.opacity_bubble = value;
                        }
                    }
                }
            }
            if (pJS.bubble_clicking) {
                /* size */
                process(options.interactivity.modes.bubble.size, options.particles.size.value, p.radius_bubble, p.radius, 'size');
                /* opacity */
                process(options.interactivity.modes.bubble.opacity, options.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
            }
        }
    }

    repulseParticle(p) {
        let pJS = this.pJS;
        let options = pJS.options;

        if (options.interactivity.events.onhover.enable && isInArray('repulse', options.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {
            let dx_mouse = p.x - pJS.interactivity.mouse.pos_x;
            let dy_mouse = p.y - pJS.interactivity.mouse.pos_y;
            let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            let normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse }, repulseRadius = options.interactivity.modes.repulse.distance, velocity = 100, repulseFactor = clamp((1 / repulseRadius) * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);
            let pos = {
                x: p.x + normVec.x * repulseFactor,
                y: p.y + normVec.y * repulseFactor
            };

            if (options.particles.move.out_mode == 'bounce') {
                if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w)
                    p.x = pos.x;
                if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h)
                    p.y = pos.y;
            } else {
                p.x = pos.x;
                p.y = pos.y;
            }
        }
        else if (options.interactivity.events.onclick.enable && isInArray('repulse', options.interactivity.events.onclick.mode)) {
            if (!pJS.repulse_finish) {
                pJS.repulse_count++;
                if (pJS.repulse_count == pJS.particles.array.length) {
                    pJS.repulse_finish = true;
                }
            }
            if (pJS.repulse_clicking) {
                let repulseRadius = Math.pow(options.interactivity.modes.repulse.distance / 6, 3);
                let dx = pJS.interactivity.mouse.click_pos_x - p.x, dy = pJS.interactivity.mouse.click_pos_y - p.y, d = dx * dx + dy * dy;
                let force = -repulseRadius / d * 1;

                function process() {
                    let f = Math.atan2(dy, dx);
                    p.vx = force * Math.cos(f);
                    p.vy = force * Math.sin(f);
                    if (options.particles.move.out_mode == 'bounce') {
                        let pos = {
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
                // if(!pJS.repulse_finish){
                //   if(d <= repulseRadius){
                //     process();
                //   }
                // }else{
                //   process();
                // }
            } else {
                if (pJS.repulse_clicking == false) {
                    p.vx = p.vx_i;
                    p.vy = p.vy_i;
                }
            }
        }
    }

    grabParticle(p) {
        let pJS = this.pJS;
        let options = pJS.options;

        if (options.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove') {
            let dx_mouse = p.x - pJS.interactivity.mouse.pos_x;
            let dy_mouse = p.y - pJS.interactivity.mouse.pos_y;
            let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            /* draw a line between the cursor and the particle if the distance between them is under the config distance */
            if (dist_mouse <= options.interactivity.modes.grab.distance) {
                let opacity_line = options.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1 / options.interactivity.modes.grab.line_linked.opacity)) / options.interactivity.modes.grab.distance;

                if (opacity_line > 0) {
                    /* style */
                    options.particles.line_linked.color_rgb = options.particles.line_linked.color_rgb || hexToRgb(options.particles.line_linked.color);

                    let color_line = options.particles.line_linked.color_rgb;
                    
                    pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
                    pJS.canvas.ctx.lineWidth = options.particles.line_linked.width;
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
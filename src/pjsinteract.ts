import { pJSUtils } from './pjsutils';
import { pJS, pJSOptions } from './pjsinterfaces'; 

'use strict';

export class pJSInteract {
    pJS: pJS;

    constructor(pJS: pJS) {
        this.pJS = pJS;
    }

    /* ---------- pJS functions - particles interaction ------------ */
    linkParticles(p1: any, p2: any) {
        let pJS = this.pJS;
        let options = pJS.options;

        let dx = (p1.x + p1.offsetX) - (p2.x + p2.offsetX);
        let dy = (p1.y + p1.offsetY) - (p2.y + p2.offsetY);
        let dist = Math.sqrt(dx * dx + dy * dy);

        /* draw a line between p1 and p2 if the distance between them is under the config distance */
        if (dist <= options.particles.line_linked.distance) {
            let opacity_line = options.particles.line_linked.opacity - (dist / (1 / options.particles.line_linked.opacity)) / options.particles.line_linked.distance;
            if (opacity_line > 0) {
                /* style */
                options.particles.line_linked.color_rgb = options.particles.line_linked.color_rgb || pJSUtils.hexToRgb(options.particles.line_linked.color);

                let color_line = options.particles.line_linked.color_rgb;

                if (color_line) {
                    pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
                }

                pJS.canvas.ctx.lineWidth = options.particles.line_linked.width;
                //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
                /* path */
                pJS.canvas.ctx.beginPath();
                pJS.canvas.ctx.moveTo((p1.x + p1.offsetX), (p1.y + p1.offsetY));
                pJS.canvas.ctx.lineTo((p2.x + p2.offsetX), (p2.y + p2.offsetY));
                pJS.canvas.ctx.stroke();
                pJS.canvas.ctx.closePath();
            }
        }
    }

    attractParticles(p1: any, p2: any) {
        let pJS = this.pJS;
        let options = pJS.options;

        /* condensed particles */
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= options.particles.line_linked.distance) {
            let ax = dx / (options.particles.move.attract.rotateX * 1000), ay = dy / (options.particles.move.attract.rotateY * 1000);
            
            p1.vx -= ax;
            p1.vy -= ay;
            p2.vx += ax;
            p2.vy += ay;
        }
    }

    bounceParticles(p1: any, p2: any) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let dist_p = p1.radius + p2.radius;

        if (dist <= dist_p) {
            p1.vx = -p1.vx;
            p1.vy = -p1.vy;
            p2.vx = -p2.vx;
            p2.vy = -p2.vy;
        }
    }
}
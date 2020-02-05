import { pJSUtils } from './pjsutils';

'use strict';

export class pJSParticle {
    pJS: any;
    radius: number;
    size_status?: boolean;
    vs?: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    color: any;
    opacity: number;
    opacity_status?: boolean;
    vo?: number;
    vx: number;
    vy: number;
    vx_i: number;
    vy_i: number;
    shape?: string;
    img: any;
    radius_bubble?: number;
    opacity_bubble?: number;

    /* --------- pJS functions - particles ----------- */
    constructor(pJS: any, color: any, opacity: number, position?: any) {
        this.pJS = pJS;
        let options = pJS.options;

        /* size */
        this.radius = (options.particles.size.random ? Math.random() : 1) * options.particles.size.value;
        if (options.particles.size.anim.enable) {
            this.size_status = false;
            this.vs = options.particles.size.anim.speed / 100;
            if (!options.particles.size.anim.sync) {
                this.vs = this.vs * Math.random();
            }
        }
        /* position */
        this.x = position ? position.x : Math.random() * pJS.canvas.w;
        this.y = position ? position.y : Math.random() * pJS.canvas.h;
        /* check position  - into the canvas */
        if (this.x > pJS.canvas.w - this.radius * 2)
            this.x = this.x - this.radius;
        else if (this.x < this.radius * 2)
            this.x = this.x + this.radius;
        if (this.y > pJS.canvas.h - this.radius * 2)
            this.y = this.y - this.radius;
        else if (this.y < this.radius * 2)
            this.y = this.y + this.radius;
        /* parallax */
        this.offsetX = 0;
        this.offsetY = 0;
        /* check position - avoid overlap */
        if (options.particles.move.bounce) {
            pJS.fn.vendors.checkOverlap(this, position);
        }
        /* color */
        this.color = {};
        if (typeof (color.value) == 'object') {
            if (color.value instanceof Array) {
                let color_selected = color.value[Math.floor(Math.random() * options.particles.color.value.length)];

                this.color.rgb = pJSUtils.hexToRgb(color_selected);
            }
            else {
                if (color.value.r != undefined && color.value.g != undefined && color.value.b != undefined) {
                    this.color.rgb = {
                        r: color.value.r,
                        g: color.value.g,
                        b: color.value.b
                    };
                }
                if (color.value.h != undefined && color.value.s != undefined && color.value.l != undefined) {
                    this.color.hsl = {
                        h: color.value.h,
                        s: color.value.s,
                        l: color.value.l
                    };
                }
            }
        }
        else if (color.value == 'random') {
            this.color.rgb = {
                r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
                g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
                b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
            };
        }
        else if (typeof (color.value) == 'string') {
            this.color = color;
            this.color.rgb = pJSUtils.hexToRgb(this.color.value);
        }
        /* opacity */
        this.opacity = (options.particles.opacity.random ? Math.random() : 1) * options.particles.opacity.value;
        if (options.particles.opacity.anim.enable) {
            this.opacity_status = false;
            this.vo = options.particles.opacity.anim.speed / 100;
            if (!options.particles.opacity.anim.sync) {
                this.vo = this.vo * Math.random();
            }
        }
        /* animation - velocity for speed */
        let velbase = {} as any;

        switch (options.particles.move.direction) {
            case 'top':
                velbase = { x: 0, y: -1 };
                break;
            case 'top-right':
                velbase = { x: 0.5, y: -0.5 };
                break;
            case 'right':
                velbase = { x: 1, y: -0 };
                break;
            case 'bottom-right':
                velbase = { x: 0.5, y: 0.5 };
                break;
            case 'bottom':
                velbase = { x: 0, y: 1 };
                break;
            case 'bottom-left':
                velbase = { x: -0.5, y: 1 };
                break;
            case 'left':
                velbase = { x: -1, y: 0 };
                break;
            case 'top-left':
                velbase = { x: -0.5, y: -0.5 };
                break;
            default:
                velbase = { x: 0, y: 0 };
                break;
        }

        if (options.particles.move.straight) {
            this.vx = velbase.x;
            this.vy = velbase.y;
            if (options.particles.move.random) {
                this.vx = this.vx * (Math.random());
                this.vy = this.vy * (Math.random());
            }
        }
        else {
            this.vx = velbase.x + Math.random() - 0.5;
            this.vy = velbase.y + Math.random() - 0.5;
        }
        // let theta = 2.0 * Math.PI * Math.random();

        // this.vx = Math.cos(theta);
        // this.vy = Math.sin(theta);

        this.vx_i = this.vx;
        this.vy_i = this.vy;
        /* if shape is image */
        let shape_type = options.particles.shape.type;

        if (typeof (shape_type) == 'object') {
            if (shape_type instanceof Array) {
                let shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
                this.shape = shape_selected;
            }
        } else {
            this.shape = shape_type;
        }

        if (this.shape == 'image') {
            let sh = options.particles.shape;
            this.img = {
                src: sh.image.src,
                ratio: sh.image.width / sh.image.height
            };
            if (!this.img.ratio)
                this.img.ratio = 1;
            if (pJS.img_type == 'svg' && pJS.source_svg != undefined) {
                pJS.fn.vendors.createSvgImg(this);
                if (pJS.pushing) {
                    this.img.loaded = false;
                }
            }
        }
    }

    draw() {
        let p = this;
        let pJS = this.pJS;
        let options = pJS.options;
        let radius: any;
        let opacity;
        let color_value;

        if (p.radius_bubble != undefined) {
            radius = p.radius_bubble;
        }
        else {
            radius = p.radius;
        }
        if (p.opacity_bubble != undefined) {
            opacity = p.opacity_bubble;
        }
        else {
            opacity = p.opacity;
        }
        if (p.color.rgb) {
            color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + opacity + ')';
        }
        else {
            color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + opacity + ')';
        }
        pJS.canvas.ctx.fillStyle = color_value;
        pJS.canvas.ctx.beginPath();

        let p_x = p.x + p.offsetX;
        let p_y = p.y + p.offsetY;

        switch (p.shape) {
            case 'circle':
                pJS.canvas.ctx.arc(p_x, p_y, radius, 0, Math.PI * 2, false);
                break;
            case 'edge':
                pJS.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
                break;
            case 'triangle':
                pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2);
                break;
            case 'polygon':
                pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius / (options.particles.shape.polygon.nb_sides / 3.5), // startX
                    p.y - radius / (2.66 / 3.5), // startY
                    radius * 2.66 / (options.particles.shape.polygon.nb_sides / 3), // sideLength
                    options.particles.shape.polygon.nb_sides, // sideCountNumerator
                    1 // sideCountDenominator
                );
                break;
            case 'star':
                pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius * 2 / (options.particles.shape.polygon.nb_sides / 4), // startX
                    p.y - radius / (2 * 2.66 / 3.5), // startY
                    radius * 2 * 2.66 / (options.particles.shape.polygon.nb_sides / 3), // sideLength
                    options.particles.shape.polygon.nb_sides, // sideCountNumerator
                    2 // sideCountDenominator
                );
                break;
            case 'image':
                let img_obj: any;

                if (pJS.img_type == 'svg') {
                    img_obj = p.img.obj;
                }
                else {
                    img_obj = pJS.img_obj;
                }
                if (img_obj) {
                    this.subDraw(img_obj, radius);
                }
                break;
        }

        pJS.canvas.ctx.closePath();

        if (options.particles.shape.stroke.width > 0) {
            pJS.canvas.ctx.strokeStyle = options.particles.shape.stroke.color;
            pJS.canvas.ctx.lineWidth = options.particles.shape.stroke.width;
            pJS.canvas.ctx.stroke();
        }

        pJS.canvas.ctx.fill();
    }

    subDraw(img_obj: any, radius: number) {
        let p = this;
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.canvas.ctx.drawImage(img_obj, p.x - radius, p.y - radius, radius * 2, radius * 2 / p.img.ratio);
    }
}
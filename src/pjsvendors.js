import { isInArray } from './pjsutils';
import { pJSLoader } from './pjsloader';

'use strict';

export class pJSVendors {
    constructor(pJS) {
        this.pJS = pJS;
    }

    /* ---------- pJS functions - vendors ------------ */
    eventsListeners() {
        let pJS = this.pJS;
        let options = pJS.options;

        /* events target element */
        if (options.interactivity.detect_on == 'window') {
            pJS.interactivity.el = window;
        }
        else {
            pJS.interactivity.el = pJS.canvas.el;
        }
        /* detect mouse pos - on hover / click event */
        if (options.interactivity.events.onhover.enable || options.interactivity.events.onclick.enable) {
            /* el on mousemove */
            pJS.interactivity.el.addEventListener('mousemove', e => {
                let pos_x;
                let pos_y;

                if (pJS.interactivity.el == window) {
                    pos_x = e.clientX;
                    pos_y = e.clientY;
                } else {
                    pos_x = e.offsetX || e.clientX;
                    pos_y = e.offsetY || e.clientY;
                }

                pJS.interactivity.mouse.pos_x = pos_x;
                pJS.interactivity.mouse.pos_y = pos_y;

                if (pJS.retina) {
                    pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
                    pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
                }

                pJS.interactivity.status = 'mousemove';
            });
            /* el on onmouseleave */
            pJS.interactivity.el.addEventListener('mouseleave', e => {
                pJS.interactivity.mouse.pos_x = null;
                pJS.interactivity.mouse.pos_y = null;
                pJS.interactivity.status = 'mouseleave';
            });
        }
        /* on click event */
        if (options.interactivity.events.onclick.enable) {
            pJS.interactivity.el.addEventListener('click', () => {
                pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
                pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
                pJS.interactivity.mouse.click_time = new Date().getTime();
                if (options.interactivity.events.onclick.enable) {
                    switch (options.interactivity.events.onclick.mode) {
                        case 'push':
                            if (options.particles.move.enable) {
                                pJS.fn.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                            }
                            else {
                                if (options.interactivity.modes.push.particles_nb == 1) {
                                    pJS.fn.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                                }
                                else if (options.interactivity.modes.push.particles_nb > 1) {
                                    pJS.fn.modes.pushParticles(options.interactivity.modes.push.particles_nb);
                                }
                            }
                            break;
                        case 'remove':
                            pJS.fn.modes.removeParticles(options.interactivity.modes.remove.particles_nb);
                            break;
                        case 'bubble':
                            pJS.bubble_clicking = true;
                            break;
                        case 'repulse':
                            pJS.repulse_clicking = true;
                            pJS.repulse_count = 0;
                            pJS.repulse_finish = false;
                            setTimeout(() => {
                                pJS.repulse_clicking = false;
                            }, options.interactivity.modes.repulse.duration * 1000);
                            break;
                    }
                }
            });
        }
    }

    densityAutoParticles() {
        let pJS = this.pJS;
        let options = pJS.options;

        if (options.particles.number.density.enable) {
            /* calc area */
            let area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;

            if (pJS.retina) {
                area = area / (pJS.canvas.pxratio * 2);
            }
            /* calc number of particles based on density area */
            let nb_particles = area * options.particles.number.value / options.particles.number.density.value_area;

            /* add or remove X particles */
            let missing_particles = pJS.particles.array.length - nb_particles;

            if (missing_particles < 0)
                pJS.fn.modes.pushParticles(Math.abs(missing_particles));
            else
                pJS.fn.modes.removeParticles(missing_particles);
        }
    }

    checkOverlap(p1, position) {
        let pJS = this.pJS;
        let options = pJS.options;

        for (let i = 0; i < pJS.particles.array.length; i++) {
            let p2 = pJS.particles.array[i];
            let dx = p1.x - p2.x;
            let dy = p1.y - p2.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= p1.radius + p2.radius) {
                p1.x = position ? position.x : Math.random() * pJS.canvas.w;
                p1.y = position ? position.y : Math.random() * pJS.canvas.h;
                pJS.fn.vendors.checkOverlap(p1);
            }
        }
    }

    createSvgImg(p) {
        let pJS = this.pJS;
        let options = pJS.options;

        /* set color to svg element */
        let svgXml = pJS.source_svg;
        let rgbHex = /#([0-9A-F]{3,6})/gi;
        let coloredSvgXml = svgXml.replace(rgbHex, (m, r, g, b) => {
            let color_value;
            if (p.color.rgb) {
                color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + p.opacity + ')';
            }
            else {
                color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + p.opacity + ')';
            }
            return color_value;
        });
        /* prepare to create img with colored svg */
        let svg = new Blob([coloredSvgXml], { type: 'image/svg+xml;charset=utf-8' }), DOMURL = window.URL || window.webkitURL || window, url = DOMURL.createObjectURL(svg);
        /* create particle img obj */
        let img = new Image();
        img.addEventListener('load', () => {
            p.img.obj = img;
            p.img.loaded = true;
            DOMURL.revokeObjectURL(url);
            pJS.count_svg++;
        });
        img.src = url;
    }

    destroypJS() {
        let pJS = this.pJS;
        let options = pJS.options;

        cancelAnimationFrame(pJS.fn.drawAnimFrame);
        canvas_el.remove();
        pJSLoader.pJSDomSet(null);
    }

    drawShape(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
        let pJS = this.pJS;
        let options = pJS.options;

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        let sideCount = sideCountNumerator * sideCountDenominator;
        let decimalSides = sideCountNumerator / sideCountDenominator;
        let interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        let interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
        c.save();
        c.beginPath();
        c.translate(startX, startY);
        c.moveTo(0, 0);
        for (let i = 0; i < sideCount; i++) {
            c.lineTo(sideLength, 0);
            c.translate(sideLength, 0);
            c.rotate(interiorAngle);
        }
        //c.stroke();
        c.fill();
        c.restore();
    }

    exportImg() {
        let pJS = this.pJS;
        let options = pJS.options;

        window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
    }

    async loadImg(type) {
        let pJS = this.pJS;
        let options = pJS.options;

        pJS.img_error = undefined;
        if (options.particles.shape.image.src != '') {
            if (type == 'svg') {
                let response = await fetch(options.particles.shape.image.src);

                if (response.ok) {
                    pJS.source_svg = await response.blob();
                    pJS.fn.vendors.checkBeforeDraw();
                } else {
                    console.error('Error pJS - Image not found');
                    pJS.img_error = true;
                }
            }
            else {
                let img = new Image();

                img.addEventListener('load', () => {
                    pJS.img_obj = img;
                    pJS.fn.vendors.checkBeforeDraw();
                });

                img.src = options.particles.shape.image.src;
            }
        }
        else {
            console.error('Error pJS - No image.src');
            pJS.img_error = true;
        }
    }

    draw() {
        let pJS = this.pJS;
        let options = pJS.options;

        if (options.particles.shape.type == 'image') {
            if (pJS.img_type == 'svg') {
                if (pJS.count_svg >= options.particles.number.value) {
                    pJS.fn.particles.draw();
                    if (!options.particles.move.enable)
                        cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
                    else
                        pJS.fn.drawAnimFrame = requestAnimFrame(() => {
                            pJS.fn.vendors.draw();
                        });
                }
                else {
                    if (!pJS.img_error)
                        pJS.fn.drawAnimFrame = requestAnimFrame(() => {
                            pJS.fn.vendors.draw();
                        });
                }
            }
            else {
                if (pJS.img_obj != undefined) {
                    pJS.fn.particles.draw();
                    if (!options.particles.move.enable)
                        cancelRequestAnimFrame(() => {
                            pJS.fn.drawAnimFrame();
                        });
                    else
                        pJS.fn.drawAnimFrame = requestAnimFrame(() => {
                            pJS.fn.vendors.draw();
                        });
                }
                else {
                    if (!pJS.img_error)
                        pJS.fn.drawAnimFrame = requestAnimFrame(() => {
                            pJS.fn.vendors.draw();
                        });
                }
            }
        }
        else {
            pJS.fn.particles.draw();
            if (!options.particles.move.enable)
                cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
            else
                pJS.fn.drawAnimFrame = requestAnimFrame(() => {
                    pJS.fn.vendors.draw();
                });
        }
    }

    checkBeforeDraw() {
        let pJS = this.pJS;
        let options = pJS.options;

        // if shape is image
        if (options.particles.shape.type == 'image') {
            if (pJS.img_type == 'svg' && pJS.source_svg == undefined) {
                pJS.checkAnimFrame = requestAnimFrame(() => {
                    check();
                });
            }
            else {
                cancelRequestAnimFrame(pJS.checkAnimFrame);
                if (!pJS.img_error) {
                    pJS.fn.vendors.init();
                    pJS.fn.vendors.draw();
                }
            }
        }
        else {
            pJS.fn.vendors.init();
            pJS.fn.vendors.draw();
        }
    }

    init() {
        let pJS = this.pJS;
        let options = pJS.options;

        /* init canvas + particles */
        pJS.fn.retina.init();
        pJS.fn.canvas.init();
        pJS.fn.canvas.size();
        pJS.fn.canvas.paint();
        pJS.fn.particles.create();
        pJS.fn.vendors.densityAutoParticles();
    }

    async start() {
        let pJS = this.pJS;
        let options = pJS.options;

        if (isInArray('image', options.particles.shape.type)) {
            pJS.img_type = options.particles.shape.image.src.substr(options.particles.shape.image.src.length - 3);
            await pJS.fn.vendors.loadImg(pJS.img_type);
        }
        else {
            pJS.fn.vendors.checkBeforeDraw();
        }
    }
}
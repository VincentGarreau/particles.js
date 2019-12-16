'use strict';

import { isInArray, hexToRgb } from './pjsutils';

export class pJSVendors {
    constructor(pJS) {
        this.pJS = pJS;
    }

    /* ---------- pJS functions - vendors ------------ */
    eventsListeners() {
        let pJS = this.pJS;

        /* events target element */
        if (pJS.interactivity.detect_on == 'window') {
            pJS.interactivity.el = window;
        }
        else {
            pJS.interactivity.el = pJS.canvas.el;
        }
        /* detect mouse pos - on hover / click event */
        if (pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable) {
            /* el on mousemove */
            pJS.interactivity.el.addEventListener('mousemove', function (e) {
                if (pJS.interactivity.el == window) {
                    var pos_x = e.clientX, pos_y = e.clientY;
                }
                else {
                    var pos_x = e.offsetX || e.clientX, pos_y = e.offsetY || e.clientY;
                }
                pJS.interactivity.mouse.pos_x = pos_x;
                pJS.interactivity.mouse.pos_y = pos_y;
                if (pJS.tmp.retina) {
                    pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
                    pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
                }
                pJS.interactivity.status = 'mousemove';
            });
            /* el on onmouseleave */
            pJS.interactivity.el.addEventListener('mouseleave', function (e) {
                pJS.interactivity.mouse.pos_x = null;
                pJS.interactivity.mouse.pos_y = null;
                pJS.interactivity.status = 'mouseleave';
            });
        }
        /* on click event */
        if (pJS.interactivity.events.onclick.enable) {
            pJS.interactivity.el.addEventListener('click', function () {
                pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
                pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
                pJS.interactivity.mouse.click_time = new Date().getTime();
                if (pJS.interactivity.events.onclick.enable) {
                    switch (pJS.interactivity.events.onclick.mode) {
                        case 'push':
                            if (pJS.particles.move.enable) {
                                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                            }
                            else {
                                if (pJS.interactivity.modes.push.particles_nb == 1) {
                                    pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                                }
                                else if (pJS.interactivity.modes.push.particles_nb > 1) {
                                    pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                                }
                            }
                            break;
                        case 'remove':
                            pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
                            break;
                        case 'bubble':
                            pJS.tmp.bubble_clicking = true;
                            break;
                        case 'repulse':
                            pJS.tmp.repulse_clicking = true;
                            pJS.tmp.repulse_count = 0;
                            pJS.tmp.repulse_finish = false;
                            setTimeout(function () {
                                pJS.tmp.repulse_clicking = false;
                            }, pJS.interactivity.modes.repulse.duration * 1000);
                            break;
                    }
                }
            });
        }
    }

    densityAutoParticles() {
        let pJS = this.pJS;

        if (pJS.particles.number.density.enable) {
            /* calc area */
            var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
            if (pJS.tmp.retina) {
                area = area / (pJS.canvas.pxratio * 2);
            }
            /* calc number of particles based on density area */
            var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;
            /* add or remove X particles */
            var missing_particles = pJS.particles.array.length - nb_particles;
            if (missing_particles < 0)
                pJS.fn.modes.pushParticles(Math.abs(missing_particles));
            else
                pJS.fn.modes.removeParticles(missing_particles);
        }
    }

    checkOverlap(p1, position) {
        let pJS = this.pJS;

        for (var i = 0; i < pJS.particles.array.length; i++) {
            var p2 = pJS.particles.array[i];
            var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= p1.radius + p2.radius) {
                p1.x = position ? position.x : Math.random() * pJS.canvas.w;
                p1.y = position ? position.y : Math.random() * pJS.canvas.h;
                pJS.fn.vendors.checkOverlap(p1);
            }
        }
    }

    createSvgImg(p) {
        let pJS = this.pJS;

        /* set color to svg element */
        var svgXml = pJS.tmp.source_svg, rgbHex = /#([0-9A-F]{3,6})/gi, coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
            if (p.color.rgb) {
                var color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + p.opacity + ')';
            }
            else {
                var color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + p.opacity + ')';
            }
            return color_value;
        });
        /* prepare to create img with colored svg */
        var svg = new Blob([coloredSvgXml], { type: 'image/svg+xml;charset=utf-8' }), DOMURL = window.URL || window.webkitURL || window, url = DOMURL.createObjectURL(svg);
        /* create particle img obj */
        var img = new Image();
        img.addEventListener('load', function () {
            p.img.obj = img;
            p.img.loaded = true;
            DOMURL.revokeObjectURL(url);
            pJS.tmp.count_svg++;
        });
        img.src = url;
    }

    destroypJS() {
        let pJS = this.pJS;

        cancelAnimationFrame(pJS.fn.drawAnimFrame);
        canvas_el.remove();
        pJSDom = null;
    }

    drawShape(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
        let pJS = this.pJS;

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        var sideCount = sideCountNumerator * sideCountDenominator;
        var decimalSides = sideCountNumerator / sideCountDenominator;
        var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
        c.save();
        c.beginPath();
        c.translate(startX, startY);
        c.moveTo(0, 0);
        for (var i = 0; i < sideCount; i++) {
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

        window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
    }

    loadImg(type) {
        let pJS = this.pJS;

        pJS.tmp.img_error = undefined;
        if (pJS.particles.shape.image.src != '') {
            if (type == 'svg') {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', pJS.particles.shape.image.src);
                xhr.onreadystatechange = function (data) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            pJS.tmp.source_svg = data.currentTarget.response;
                            pJS.fn.vendors.checkBeforeDraw();
                        }
                        else {
                            console.error('Error pJS - Image not found');
                            pJS.tmp.img_error = true;
                        }
                    }
                };
                xhr.send();
            }
            else {
                var img = new Image();
                img.addEventListener('load', function () {
                    pJS.tmp.img_obj = img;
                    pJS.fn.vendors.checkBeforeDraw();
                });
                img.src = pJS.particles.shape.image.src;
            }
        }
        else {
            console.error('Error pJS - No image.src');
            pJS.tmp.img_error = true;
        }
    }

    draw() {
        let pJS = this.pJS;

        if (pJS.particles.shape.type == 'image') {
            if (pJS.tmp.img_type == 'svg') {
                if (pJS.tmp.count_svg >= pJS.particles.number.value) {
                    pJS.fn.particles.draw();
                    if (!pJS.particles.move.enable)
                        cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
                    else
                        pJS.fn.drawAnimFrame = requestAnimFrame(function () {
                            pJS.fn.vendors.draw();
                        });
                }
                else {
                    if (!pJS.tmp.img_error)
                        pJS.fn.drawAnimFrame = requestAnimFrame(function () {
                            pJS.fn.vendors.draw();
                        });
                }
            }
            else {
                if (pJS.tmp.img_obj != undefined) {
                    pJS.fn.particles.draw();
                    if (!pJS.particles.move.enable)
                        cancelRequestAnimFrame(function () {
                            pJS.fn.drawAnimFrame();
                        });
                    else
                        pJS.fn.drawAnimFrame = requestAnimFrame(function () {
                            pJS.fn.vendors.draw();
                        });
                }
                else {
                    if (!pJS.tmp.img_error)
                        pJS.fn.drawAnimFrame = requestAnimFrame(function () {
                            pJS.fn.vendors.draw();
                        });
                }
            }
        }
        else {
            pJS.fn.particles.draw();
            if (!pJS.particles.move.enable)
                cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
            else
                pJS.fn.drawAnimFrame = requestAnimFrame(function () {
                    pJS.fn.vendors.draw();
                });
        }
    }

    checkBeforeDraw() {
        let pJS = this.pJS;

        // if shape is image
        if (pJS.particles.shape.type == 'image') {
            if (pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined) {
                pJS.tmp.checkAnimFrame = requestAnimFrame(function () {
                    check();
                });
            }
            else {
                cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
                if (!pJS.tmp.img_error) {
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

        /* init canvas + particles */
        pJS.fn.retina.init();
        pJS.fn.canvas.init();
        pJS.fn.canvas.size();
        pJS.fn.canvas.paint();
        pJS.fn.particles.create();
        pJS.fn.vendors.densityAutoParticles();
        /* particles.line_linked - convert hex colors to rgb */
        pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);
    }

    start() {
        let pJS = this.pJS;

        if (isInArray('image', pJS.particles.shape.type)) {
            pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
            pJS.fn.vendors.loadImg(pJS.tmp.img_type);
        }
        else {
            pJS.fn.vendors.checkBeforeDraw();
        }
    }
}
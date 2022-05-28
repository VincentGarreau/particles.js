function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "pJS", () => $d1a534ad62a5c4c8$export$47684f97fe2830db);
$parcel$export(module.exports, "pJSDom", () => $d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8);
$parcel$export(module.exports, "setParticleColor", () => $d1a534ad62a5c4c8$export$a84195d18e286453);
$parcel$export(module.exports, "modifyParticles", () => $d1a534ad62a5c4c8$export$a44bdd20d2c1d681);
$parcel$export(module.exports, "particlesJS", () => $d1a534ad62a5c4c8$export$bf4d4b4e7a8db89a);
$parcel$export(module.exports, "particlesJSLoad", () => $d1a534ad62a5c4c8$export$e5860254b396deef);
function $d1a534ad62a5c4c8$export$47684f97fe2830db(tag_id, params) {
    var canvas_el = document.querySelector("#" + tag_id + " > .particles-js-canvas-el");
    /* particles.js variables with default values */ this.pJS = {
        canvas: {
            el: canvas_el,
            w: canvas_el.offsetWidth,
            h: canvas_el.offsetHeight
        },
        particles: {
            number: {
                value: 400,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#fff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ff0000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: false,
                anim: {
                    enable: false,
                    speed: 2,
                    opacity_min: 0,
                    sync: false
                }
            },
            size: {
                value: 20,
                random: false,
                anim: {
                    enable: false,
                    speed: 20,
                    size_min: 0,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 3000,
                    rotateY: 3000
                }
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 200,
                    size: 80,
                    duration: 0.4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            },
            mouse: {}
        },
        retina_detect: false,
        fn: {
            interact: {},
            modes: {},
            vendors: {}
        },
        tmp: {}
    };
    var pJS1 = this.pJS;
    /* params settings */ if (params) Object.deepExtend(pJS1, params);
    pJS1.tmp.obj = {
        size_value: pJS1.particles.size.value,
        size_anim_speed: pJS1.particles.size.anim.speed,
        move_speed: pJS1.particles.move.speed,
        line_linked_distance: pJS1.particles.line_linked.distance,
        line_linked_width: pJS1.particles.line_linked.width,
        mode_grab_distance: pJS1.interactivity.modes.grab.distance,
        mode_bubble_distance: pJS1.interactivity.modes.bubble.distance,
        mode_bubble_size: pJS1.interactivity.modes.bubble.size,
        mode_repulse_distance: pJS1.interactivity.modes.repulse.distance
    };
    pJS1.fn.retinaInit = function() {
        if (pJS1.retina_detect && window.devicePixelRatio > 1) {
            pJS1.canvas.pxratio = window.devicePixelRatio;
            pJS1.tmp.retina = true;
        } else {
            pJS1.canvas.pxratio = 1;
            pJS1.tmp.retina = false;
        }
        pJS1.canvas.w = pJS1.canvas.el.offsetWidth * pJS1.canvas.pxratio;
        pJS1.canvas.h = pJS1.canvas.el.offsetHeight * pJS1.canvas.pxratio;
        pJS1.particles.size.value = pJS1.tmp.obj.size_value * pJS1.canvas.pxratio;
        pJS1.particles.size.anim.speed = pJS1.tmp.obj.size_anim_speed * pJS1.canvas.pxratio;
        pJS1.particles.move.speed = pJS1.tmp.obj.move_speed * pJS1.canvas.pxratio;
        pJS1.particles.line_linked.distance = pJS1.tmp.obj.line_linked_distance * pJS1.canvas.pxratio;
        pJS1.interactivity.modes.grab.distance = pJS1.tmp.obj.mode_grab_distance * pJS1.canvas.pxratio;
        pJS1.interactivity.modes.bubble.distance = pJS1.tmp.obj.mode_bubble_distance * pJS1.canvas.pxratio;
        pJS1.particles.line_linked.width = pJS1.tmp.obj.line_linked_width * pJS1.canvas.pxratio;
        pJS1.interactivity.modes.bubble.size = pJS1.tmp.obj.mode_bubble_size * pJS1.canvas.pxratio;
        pJS1.interactivity.modes.repulse.distance = pJS1.tmp.obj.mode_repulse_distance * pJS1.canvas.pxratio;
    };
    /* ---------- pJS functions - canvas ------------ */ pJS1.fn.canvasInit = function() {
        pJS1.canvas.ctx = pJS1.canvas.el.getContext("2d");
    };
    pJS1.fn.canvasSize = function() {
        pJS1.canvas.el.width = pJS1.canvas.w;
        pJS1.canvas.el.height = pJS1.canvas.h;
        if (pJS1 && pJS1.interactivity.events.resize) window.addEventListener("resize", function() {
            pJS1.canvas.w = pJS1.canvas.el.offsetWidth;
            pJS1.canvas.h = pJS1.canvas.el.offsetHeight;
            /* resize canvas */ if (pJS1.tmp.retina) {
                pJS1.canvas.w *= pJS1.canvas.pxratio;
                pJS1.canvas.h *= pJS1.canvas.pxratio;
            }
            pJS1.canvas.el.width = pJS1.canvas.w;
            pJS1.canvas.el.height = pJS1.canvas.h;
            /* repaint canvas on anim disabled */ if (!pJS1.particles.move.enable) {
                pJS1.fn.particlesEmpty();
                pJS1.fn.particlesCreate();
                pJS1.fn.particlesDraw();
                pJS1.fn.vendors.densityAutoParticles();
            }
            /* density particles enabled */ pJS1.fn.vendors.densityAutoParticles();
        });
    };
    pJS1.fn.canvasPaint = function() {
        pJS1.canvas.ctx.fillRect(0, 0, pJS1.canvas.w, pJS1.canvas.h);
    };
    pJS1.fn.canvasClear = function() {
        pJS1.canvas.ctx.clearRect(0, 0, pJS1.canvas.w, pJS1.canvas.h);
    };
    /* --------- pJS functions - particles ----------- */ pJS1.fn.particle = function(color, opacity, position) {
        /* size */ this.radius = (pJS1.particles.size.random ? Math.random() : 1) * pJS1.particles.size.value;
        if (pJS1.particles.size.anim.enable) {
            this.size_status = false;
            this.vs = pJS1.particles.size.anim.speed / 100;
            if (!pJS1.particles.size.anim.sync) this.vs = this.vs * Math.random();
        }
        /* position */ this.x = position ? position.x : Math.random() * pJS1.canvas.w;
        this.y = position ? position.y : Math.random() * pJS1.canvas.h;
        /* check position  - into the canvas */ if (this.x > pJS1.canvas.w - this.radius * 2) this.x = this.x - this.radius;
        else if (this.x < this.radius * 2) this.x = this.x + this.radius;
        if (this.y > pJS1.canvas.h - this.radius * 2) this.y = this.y - this.radius;
        else if (this.y < this.radius * 2) this.y = this.y + this.radius;
        /* check position - avoid overlap */ if (pJS1.particles.move.bounce) pJS1.fn.vendors.checkOverlap(this, position);
        /* color */ this.color = {};
        if (typeof color.value == "object") {
            if (color.value instanceof Array) {
                var color_selected = color.value[Math.floor(Math.random() * pJS1.particles.color.value.length)];
                this.color.rgb = $d1a534ad62a5c4c8$var$hexToRgb(color_selected);
            } else {
                if (color.value.r != undefined && color.value.g != undefined && color.value.b != undefined) this.color.rgb = {
                    r: color.value.r,
                    g: color.value.g,
                    b: color.value.b
                };
                if (color.value.h != undefined && color.value.s != undefined && color.value.l != undefined) this.color.hsl = {
                    h: color.value.h,
                    s: color.value.s,
                    l: color.value.l
                };
            }
        } else if (color.value == "random") this.color.rgb = {
            r: Math.floor(Math.random() * 256) + 0,
            g: Math.floor(Math.random() * 256) + 0,
            b: Math.floor(Math.random() * 256) + 0
        };
        else if (typeof color.value == "string") {
            this.color = color;
            this.color.rgb = $d1a534ad62a5c4c8$var$hexToRgb(this.color.value);
        }
        /* opacity */ this.opacity = (pJS1.particles.opacity.random ? Math.random() : 1) * pJS1.particles.opacity.value;
        if (pJS1.particles.opacity.anim.enable) {
            this.opacity_status = false;
            this.vo = pJS1.particles.opacity.anim.speed / 100;
            if (!pJS1.particles.opacity.anim.sync) this.vo = this.vo * Math.random();
        }
        /* animation - velocity for speed */ var velbase = {};
        switch(pJS1.particles.move.direction){
            case "top":
                velbase = {
                    x: 0,
                    y: -1
                };
                break;
            case "top-right":
                velbase = {
                    x: 0.5,
                    y: -0.5
                };
                break;
            case "right":
                velbase = {
                    x: 1,
                    y: -0
                };
                break;
            case "bottom-right":
                velbase = {
                    x: 0.5,
                    y: 0.5
                };
                break;
            case "bottom":
                velbase = {
                    x: 0,
                    y: 1
                };
                break;
            case "bottom-left":
                velbase = {
                    x: -0.5,
                    y: 1
                };
                break;
            case "left":
                velbase = {
                    x: -1,
                    y: 0
                };
                break;
            case "top-left":
                velbase = {
                    x: -0.5,
                    y: -0.5
                };
                break;
            default:
                velbase = {
                    x: 0,
                    y: 0
                };
                break;
        }
        if (pJS1.particles.move.straight) {
            this.vx = velbase.x;
            this.vy = velbase.y;
            if (pJS1.particles.move.random) {
                this.vx = this.vx * Math.random();
                this.vy = this.vy * Math.random();
            }
        } else {
            this.vx = velbase.x + Math.random() - 0.5;
            this.vy = velbase.y + Math.random() - 0.5;
        }
        // var theta = 2.0 * Math.PI * Math.random();
        // this.vx = Math.cos(theta);
        // this.vy = Math.sin(theta);
        this.vx_i = this.vx;
        this.vy_i = this.vy;
        /* if shape is image */ var shape_type = pJS1.particles.shape.type;
        if (typeof shape_type == "object") {
            if (shape_type instanceof Array) {
                var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
                this.shape = shape_selected;
            }
        } else this.shape = shape_type;
        if (this.shape == "image") {
            var sh = pJS1.particles.shape;
            this.img = {
                src: sh.image.src,
                ratio: sh.image.width / sh.image.height
            };
            if (!this.img.ratio) this.img.ratio = 1;
            if (pJS1.tmp.img_type == "svg" && pJS1.tmp.source_svg != undefined) {
                pJS1.fn.vendors.createSvgImg(this);
                if (pJS1.tmp.pushing) this.img.loaded = false;
            }
        }
    };
    pJS1.fn.particle.prototype.draw = function() {
        var p = this;
        if (p.radius_bubble != undefined) var radius = p.radius_bubble;
        else var radius = p.radius;
        if (p.opacity_bubble != undefined) var opacity = p.opacity_bubble;
        else var opacity = p.opacity;
        if (p.color.rgb) var color_value = "rgba(" + p.color.rgb.r + "," + p.color.rgb.g + "," + p.color.rgb.b + "," + opacity + ")";
        else var color_value = "hsla(" + p.color.hsl.h + "," + p.color.hsl.s + "%," + p.color.hsl.l + "%," + opacity + ")";
        pJS1.canvas.ctx.fillStyle = color_value;
        pJS1.canvas.ctx.beginPath();
        switch(p.shape){
            case "circle":
                pJS1.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
                break;
            case "edge":
                pJS1.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
                break;
            case "triangle":
                pJS1.fn.vendors.drawShape(pJS1.canvas.ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2);
                break;
            case "polygon":
                pJS1.fn.vendors.drawShape(pJS1.canvas.ctx, p.x - radius / (pJS1.particles.shape.polygon.nb_sides / 3.5), p.y - radius / 0.76, radius * 2.66 / (pJS1.particles.shape.polygon.nb_sides / 3), pJS1.particles.shape.polygon.nb_sides, 1 // sideCountDenominator
                );
                break;
            case "star":
                pJS1.fn.vendors.drawShape(pJS1.canvas.ctx, p.x - radius * 2 / (pJS1.particles.shape.polygon.nb_sides / 4), p.y - radius / 1.52, radius * 5.32 / (pJS1.particles.shape.polygon.nb_sides / 3), pJS1.particles.shape.polygon.nb_sides, 2 // sideCountDenominator
                );
                break;
            case "image":
                function draw() {
                    pJS1.canvas.ctx.drawImage(img_obj, p.x - radius, p.y - radius, radius * 2, radius * 2 / p.img.ratio);
                }
                if (pJS1.tmp.img_type == "svg") var img_obj = p.img.obj;
                else var img_obj = pJS1.tmp.img_obj;
                if (img_obj) draw();
                break;
        }
        pJS1.canvas.ctx.closePath();
        if (pJS1.particles.shape.stroke.width > 0) {
            pJS1.canvas.ctx.strokeStyle = pJS1.particles.shape.stroke.color;
            pJS1.canvas.ctx.lineWidth = pJS1.particles.shape.stroke.width;
            pJS1.canvas.ctx.stroke();
        }
        pJS1.canvas.ctx.fill();
    };
    pJS1.fn.particlesCreate = function() {
        for(var i = 0; i < pJS1.particles.number.value; i++)pJS1.particles.array.push(new pJS1.fn.particle(pJS1.particles.color, pJS1.particles.opacity.value));
    };
    pJS1.fn.particlesUpdate = function() {
        for(var i = 0; i < pJS1.particles.array.length; i++){
            /* the particle */ var p = pJS1.particles.array[i];
            // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
            // var f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     var t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }
            /* move the particle */ if (pJS1.particles.move.enable) {
                var ms = pJS1.particles.move.speed / 2;
                p.x += p.vx * ms;
                p.y += p.vy * ms;
            }
            /* change opacity status */ if (pJS1.particles.opacity.anim.enable) {
                if (p.opacity_status == true) {
                    if (p.opacity >= pJS1.particles.opacity.value) p.opacity_status = false;
                    p.opacity += p.vo;
                } else {
                    if (p.opacity <= pJS1.particles.opacity.anim.opacity_min) p.opacity_status = true;
                    p.opacity -= p.vo;
                }
                if (p.opacity < 0) p.opacity = 0;
            }
            /* change size */ if (pJS1.particles.size.anim.enable) {
                if (p.size_status == true) {
                    if (p.radius >= pJS1.particles.size.value) p.size_status = false;
                    p.radius += p.vs;
                } else {
                    if (p.radius <= pJS1.particles.size.anim.size_min) p.size_status = true;
                    p.radius -= p.vs;
                }
                if (p.radius < 0) p.radius = 0;
            }
            /* change particle position if it is out of canvas */ if (pJS1.particles.move.out_mode == "bounce") var new_pos = {
                x_left: p.radius,
                x_right: pJS1.canvas.w,
                y_top: p.radius,
                y_bottom: pJS1.canvas.h
            };
            else var new_pos = {
                x_left: -p.radius,
                x_right: pJS1.canvas.w + p.radius,
                y_top: -p.radius,
                y_bottom: pJS1.canvas.h + p.radius
            };
            if (p.x - p.radius > pJS1.canvas.w) {
                p.x = new_pos.x_left;
                p.y = Math.random() * pJS1.canvas.h;
            } else if (p.x + p.radius < 0) {
                p.x = new_pos.x_right;
                p.y = Math.random() * pJS1.canvas.h;
            }
            if (p.y - p.radius > pJS1.canvas.h) {
                p.y = new_pos.y_top;
                p.x = Math.random() * pJS1.canvas.w;
            } else if (p.y + p.radius < 0) {
                p.y = new_pos.y_bottom;
                p.x = Math.random() * pJS1.canvas.w;
            }
            /* out of canvas modes */ switch(pJS1.particles.move.out_mode){
                case "bounce":
                    if (p.x + p.radius > pJS1.canvas.w) p.vx = -p.vx;
                    else if (p.x - p.radius < 0) p.vx = -p.vx;
                    if (p.y + p.radius > pJS1.canvas.h) p.vy = -p.vy;
                    else if (p.y - p.radius < 0) p.vy = -p.vy;
                    break;
            }
            /* events */ if ($d1a534ad62a5c4c8$var$isInArray("grab", pJS1.interactivity.events.onhover.mode)) pJS1.fn.modes.grabParticle(p);
            if ($d1a534ad62a5c4c8$var$isInArray("bubble", pJS1.interactivity.events.onhover.mode) || $d1a534ad62a5c4c8$var$isInArray("bubble", pJS1.interactivity.events.onclick.mode)) pJS1.fn.modes.bubbleParticle(p);
            if ($d1a534ad62a5c4c8$var$isInArray("repulse", pJS1.interactivity.events.onhover.mode) || $d1a534ad62a5c4c8$var$isInArray("repulse", pJS1.interactivity.events.onclick.mode)) pJS1.fn.modes.repulseParticle(p);
            /* interaction auto between particles */ if (pJS1.particles.line_linked.enable || pJS1.particles.move.attract.enable) for(var j = i + 1; j < pJS1.particles.array.length; j++){
                var p2 = pJS1.particles.array[j];
                /* link particles */ if (pJS1.particles.line_linked.enable) pJS1.fn.interact.linkParticles(p, p2);
                /* attract particles */ if (pJS1.particles.move.attract.enable) pJS1.fn.interact.attractParticles(p, p2);
                /* bounce particles */ if (pJS1.particles.move.bounce) pJS1.fn.interact.bounceParticles(p, p2);
            }
        }
    };
    pJS1.fn.particlesDraw = function() {
        /* clear canvas */ pJS1.canvas.ctx.clearRect(0, 0, pJS1.canvas.w, pJS1.canvas.h);
        /* update each particles param */ pJS1.fn.particlesUpdate();
        /* draw each particle */ for(var i = 0; i < pJS1.particles.array.length; i++){
            var p = pJS1.particles.array[i];
            p.draw();
        }
    };
    pJS1.fn.particlesEmpty = function() {
        pJS1.particles.array = [];
    };
    pJS1.fn.particlesRefresh = function() {
        /* init all */ $d1a534ad62a5c4c8$var$cancelRequestAnimFrame(pJS1.fn.checkAnimFrame);
        $d1a534ad62a5c4c8$var$cancelRequestAnimFrame(pJS1.fn.drawAnimFrame);
        pJS1.tmp.source_svg = undefined;
        pJS1.tmp.img_obj = undefined;
        pJS1.tmp.count_svg = 0;
        pJS1.fn.particlesEmpty();
        pJS1.fn.canvasClear();
        /* restart */ pJS1.fn.vendors.start();
    };
    /* ---------- pJS functions - particles interaction ------------ */ pJS1.fn.interact.linkParticles = function(p1, p2) {
        var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
        /* draw a line between p1 and p2 if the distance between them is under the config distance */ if (dist <= pJS1.particles.line_linked.distance) {
            var opacity_line = pJS1.particles.line_linked.opacity - dist / (1 / pJS1.particles.line_linked.opacity) / pJS1.particles.line_linked.distance;
            if (opacity_line > 0) {
                /* style */ var color_line = pJS1.particles.line_linked.color_rgb_line;
                pJS1.canvas.ctx.strokeStyle = "rgba(" + color_line.r + "," + color_line.g + "," + color_line.b + "," + opacity_line + ")";
                pJS1.canvas.ctx.lineWidth = pJS1.particles.line_linked.width;
                //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
                /* path */ pJS1.canvas.ctx.beginPath();
                pJS1.canvas.ctx.moveTo(p1.x, p1.y);
                pJS1.canvas.ctx.lineTo(p2.x, p2.y);
                pJS1.canvas.ctx.stroke();
                pJS1.canvas.ctx.closePath();
            }
        }
    };
    pJS1.fn.interact.attractParticles = function(p1, p2) {
        /* condensed particles */ var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= pJS1.particles.line_linked.distance) {
            var ax = dx / (pJS1.particles.move.attract.rotateX * 1000), ay = dy / (pJS1.particles.move.attract.rotateY * 1000);
            p1.vx -= ax;
            p1.vy -= ay;
            p2.vx += ax;
            p2.vy += ay;
        }
    };
    pJS1.fn.interact.bounceParticles = function(p1, p2) {
        var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy), dist_p = p1.radius + p2.radius;
        if (dist <= dist_p) {
            p1.vx = -p1.vx;
            p1.vy = -p1.vy;
            p2.vx = -p2.vx;
            p2.vy = -p2.vy;
        }
    };
    /* ---------- pJS functions - modes events ------------ */ pJS1.fn.modes.pushParticles = function(nb, pos) {
        pJS1.tmp.pushing = true;
        for(var i = 0; i < nb; i++){
            pJS1.particles.array.push(new pJS1.fn.particle(pJS1.particles.color, pJS1.particles.opacity.value, {
                "x": pos ? pos.pos_x : Math.random() * pJS1.canvas.w,
                "y": pos ? pos.pos_y : Math.random() * pJS1.canvas.h
            }));
            if (i == nb - 1) {
                if (!pJS1.particles.move.enable) pJS1.fn.particlesDraw();
                pJS1.tmp.pushing = false;
            }
        }
    };
    pJS1.fn.modes.removeParticles = function(nb) {
        pJS1.particles.array.splice(0, nb);
        if (!pJS1.particles.move.enable) pJS1.fn.particlesDraw();
    };
    pJS1.fn.modes.bubbleParticle = function(p) {
        /* on hover event */ if (pJS1.interactivity.events.onhover.enable && $d1a534ad62a5c4c8$var$isInArray("bubble", pJS1.interactivity.events.onhover.mode)) {
            var dx_mouse = p.x - pJS1.interactivity.mouse.pos_x, dy_mouse = p.y - pJS1.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse), ratio = 1 - dist_mouse / pJS1.interactivity.modes.bubble.distance;
            function init() {
                p.opacity_bubble = p.opacity;
                p.radius_bubble = p.radius;
            }
            /* mousemove - check ratio */ if (dist_mouse <= pJS1.interactivity.modes.bubble.distance) {
                if (ratio >= 0 && pJS1.interactivity.status == "mousemove") {
                    /* size */ if (pJS1.interactivity.modes.bubble.size != pJS1.particles.size.value) {
                        if (pJS1.interactivity.modes.bubble.size > pJS1.particles.size.value) {
                            var size = p.radius + pJS1.interactivity.modes.bubble.size * ratio;
                            if (size >= 0) p.radius_bubble = size;
                        } else {
                            var dif = p.radius - pJS1.interactivity.modes.bubble.size, size = p.radius - dif * ratio;
                            if (size > 0) p.radius_bubble = size;
                            else p.radius_bubble = 0;
                        }
                    }
                    /* opacity */ if (pJS1.interactivity.modes.bubble.opacity != pJS1.particles.opacity.value) {
                        if (pJS1.interactivity.modes.bubble.opacity > pJS1.particles.opacity.value) {
                            var opacity = pJS1.interactivity.modes.bubble.opacity * ratio;
                            if (opacity > p.opacity && opacity <= pJS1.interactivity.modes.bubble.opacity) p.opacity_bubble = opacity;
                        } else {
                            var opacity = p.opacity - (pJS1.particles.opacity.value - pJS1.interactivity.modes.bubble.opacity) * ratio;
                            if (opacity < p.opacity && opacity >= pJS1.interactivity.modes.bubble.opacity) p.opacity_bubble = opacity;
                        }
                    }
                }
            } else init();
            /* mouseleave */ if (pJS1.interactivity.status == "mouseleave") init();
        } else if (pJS1.interactivity.events.onclick.enable && $d1a534ad62a5c4c8$var$isInArray("bubble", pJS1.interactivity.events.onclick.mode)) {
            if (pJS1.tmp.bubble_clicking) {
                var dx_mouse = p.x - pJS1.interactivity.mouse.click_pos_x, dy_mouse = p.y - pJS1.interactivity.mouse.click_pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse), time_spent = (new Date().getTime() - pJS1.interactivity.mouse.click_time) / 1000;
                if (time_spent > pJS1.interactivity.modes.bubble.duration) pJS1.tmp.bubble_duration_end = true;
                if (time_spent > pJS1.interactivity.modes.bubble.duration * 2) {
                    pJS1.tmp.bubble_clicking = false;
                    pJS1.tmp.bubble_duration_end = false;
                }
            }
            function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {
                if (bubble_param != particles_param) {
                    if (!pJS1.tmp.bubble_duration_end) {
                        if (dist_mouse <= pJS1.interactivity.modes.bubble.distance) {
                            if (p_obj_bubble != undefined) var obj = p_obj_bubble;
                            else var obj = p_obj;
                            if (obj != bubble_param) {
                                var value = p_obj - time_spent * (p_obj - bubble_param) / pJS1.interactivity.modes.bubble.duration;
                                if (id == "size") p.radius_bubble = value;
                                if (id == "opacity") p.opacity_bubble = value;
                            }
                        } else {
                            if (id == "size") p.radius_bubble = undefined;
                            if (id == "opacity") p.opacity_bubble = undefined;
                        }
                    } else if (p_obj_bubble != undefined) {
                        var value_tmp = p_obj - time_spent * (p_obj - bubble_param) / pJS1.interactivity.modes.bubble.duration, dif = bubble_param - value_tmp;
                        value = bubble_param + dif;
                        if (id == "size") p.radius_bubble = value;
                        if (id == "opacity") p.opacity_bubble = value;
                    }
                }
            }
            if (pJS1.tmp.bubble_clicking) {
                /* size */ process(pJS1.interactivity.modes.bubble.size, pJS1.particles.size.value, p.radius_bubble, p.radius, "size");
                /* opacity */ process(pJS1.interactivity.modes.bubble.opacity, pJS1.particles.opacity.value, p.opacity_bubble, p.opacity, "opacity");
            }
        }
    };
    pJS1.fn.modes.repulseParticle = function(p) {
        if (pJS1.interactivity.events.onhover.enable && $d1a534ad62a5c4c8$var$isInArray("repulse", pJS1.interactivity.events.onhover.mode) && pJS1.interactivity.status == "mousemove") {
            var dx_mouse = p.x - pJS1.interactivity.mouse.pos_x, dy_mouse = p.y - pJS1.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            var normVec = {
                x: dx_mouse / dist_mouse,
                y: dy_mouse / dist_mouse
            }, repulseRadius = pJS1.interactivity.modes.repulse.distance, velocity = 100, repulseFactor = $d1a534ad62a5c4c8$var$clamp(1 / repulseRadius * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);
            var pos = {
                x: p.x + normVec.x * repulseFactor,
                y: p.y + normVec.y * repulseFactor
            };
            if (pJS1.particles.move.out_mode == "bounce") {
                if (pos.x - p.radius > 0 && pos.x + p.radius < pJS1.canvas.w) p.x = pos.x;
                if (pos.y - p.radius > 0 && pos.y + p.radius < pJS1.canvas.h) p.y = pos.y;
            } else {
                p.x = pos.x;
                p.y = pos.y;
            }
        } else if (pJS1.interactivity.events.onclick.enable && $d1a534ad62a5c4c8$var$isInArray("repulse", pJS1.interactivity.events.onclick.mode)) {
            if (!pJS1.tmp.repulse_finish) {
                pJS1.tmp.repulse_count++;
                if (pJS1.tmp.repulse_count == pJS1.particles.array.length) pJS1.tmp.repulse_finish = true;
            }
            if (pJS1.tmp.repulse_clicking) {
                var repulseRadius = Math.pow(pJS1.interactivity.modes.repulse.distance / 6, 3);
                var dx = pJS1.interactivity.mouse.click_pos_x - p.x, dy = pJS1.interactivity.mouse.click_pos_y - p.y, d = dx * dx + dy * dy;
                var force = -repulseRadius / d * 1;
                function process() {
                    var f = Math.atan2(dy, dx);
                    p.vx = force * Math.cos(f);
                    p.vy = force * Math.sin(f);
                    if (pJS1.particles.move.out_mode == "bounce") {
                        var pos = {
                            x: p.x + p.vx,
                            y: p.y + p.vy
                        };
                        if (pos.x + p.radius > pJS1.canvas.w) p.vx = -p.vx;
                        else if (pos.x - p.radius < 0) p.vx = -p.vx;
                        if (pos.y + p.radius > pJS1.canvas.h) p.vy = -p.vy;
                        else if (pos.y - p.radius < 0) p.vy = -p.vy;
                    }
                }
                // default
                if (d <= repulseRadius) process();
            // bang - slow motion mode
            // if(!pJS.tmp.repulse_finish){
            //   if(d <= repulseRadius){
            //     process();
            //   }
            // }else{
            //   process();
            // }
            } else if (pJS1.tmp.repulse_clicking == false) {
                p.vx = p.vx_i;
                p.vy = p.vy_i;
            }
        }
    };
    pJS1.fn.modes.grabParticle = function(p) {
        if (pJS1.interactivity.events.onhover.enable && pJS1.interactivity.status == "mousemove") {
            var dx_mouse = p.x - pJS1.interactivity.mouse.pos_x, dy_mouse = p.y - pJS1.interactivity.mouse.pos_y, dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            /* draw a line between the cursor and the particle if the distance between them is under the config distance */ if (dist_mouse <= pJS1.interactivity.modes.grab.distance) {
                var opacity_line = pJS1.interactivity.modes.grab.line_linked.opacity - dist_mouse / (1 / pJS1.interactivity.modes.grab.line_linked.opacity) / pJS1.interactivity.modes.grab.distance;
                if (opacity_line > 0) {
                    /* style */ var color_line = pJS1.particles.line_linked.color_rgb_line;
                    pJS1.canvas.ctx.strokeStyle = "rgba(" + color_line.r + "," + color_line.g + "," + color_line.b + "," + opacity_line + ")";
                    pJS1.canvas.ctx.lineWidth = pJS1.particles.line_linked.width;
                    //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
                    /* path */ pJS1.canvas.ctx.beginPath();
                    pJS1.canvas.ctx.moveTo(p.x, p.y);
                    pJS1.canvas.ctx.lineTo(pJS1.interactivity.mouse.pos_x, pJS1.interactivity.mouse.pos_y);
                    pJS1.canvas.ctx.stroke();
                    pJS1.canvas.ctx.closePath();
                }
            }
        }
    };
    /* ---------- pJS functions - vendors ------------ */ pJS1.fn.vendors.eventsListeners = function() {
        /* events target element */ if (pJS1.interactivity.detect_on == "window") pJS1.interactivity.el = window;
        else pJS1.interactivity.el = pJS1.canvas.el;
        /* detect mouse pos - on hover / click event */ if (pJS1.interactivity.events.onhover.enable || pJS1.interactivity.events.onclick.enable) {
            /* el on mousemove */ pJS1.interactivity.el.addEventListener("mousemove", function(e) {
                if (pJS1.interactivity.el == window) var pos_x = e.clientX, pos_y = e.clientY;
                else var pos_x = e.offsetX || e.clientX, pos_y = e.offsetY || e.clientY;
                pJS1.interactivity.mouse.pos_x = pos_x;
                pJS1.interactivity.mouse.pos_y = pos_y;
                if (pJS1.tmp.retina) {
                    pJS1.interactivity.mouse.pos_x *= pJS1.canvas.pxratio;
                    pJS1.interactivity.mouse.pos_y *= pJS1.canvas.pxratio;
                }
                pJS1.interactivity.status = "mousemove";
            });
            /* el on onmouseleave */ pJS1.interactivity.el.addEventListener("mouseleave", function(e) {
                pJS1.interactivity.mouse.pos_x = null;
                pJS1.interactivity.mouse.pos_y = null;
                pJS1.interactivity.status = "mouseleave";
            });
        }
        /* on click event */ if (pJS1.interactivity.events.onclick.enable) pJS1.interactivity.el.addEventListener("click", function() {
            pJS1.interactivity.mouse.click_pos_x = pJS1.interactivity.mouse.pos_x;
            pJS1.interactivity.mouse.click_pos_y = pJS1.interactivity.mouse.pos_y;
            pJS1.interactivity.mouse.click_time = new Date().getTime();
            if (pJS1.interactivity.events.onclick.enable) switch(pJS1.interactivity.events.onclick.mode){
                case "push":
                    if (pJS1.particles.move.enable) pJS1.fn.modes.pushParticles(pJS1.interactivity.modes.push.particles_nb, pJS1.interactivity.mouse);
                    else {
                        if (pJS1.interactivity.modes.push.particles_nb == 1) pJS1.fn.modes.pushParticles(pJS1.interactivity.modes.push.particles_nb, pJS1.interactivity.mouse);
                        else if (pJS1.interactivity.modes.push.particles_nb > 1) pJS1.fn.modes.pushParticles(pJS1.interactivity.modes.push.particles_nb);
                    }
                    break;
                case "remove":
                    pJS1.fn.modes.removeParticles(pJS1.interactivity.modes.remove.particles_nb);
                    break;
                case "bubble":
                    pJS1.tmp.bubble_clicking = true;
                    break;
                case "repulse":
                    pJS1.tmp.repulse_clicking = true;
                    pJS1.tmp.repulse_count = 0;
                    pJS1.tmp.repulse_finish = false;
                    setTimeout(function() {
                        pJS1.tmp.repulse_clicking = false;
                    }, pJS1.interactivity.modes.repulse.duration * 1000);
                    break;
            }
        });
    };
    pJS1.fn.vendors.densityAutoParticles = function() {
        if (pJS1.particles.number.density.enable) {
            /* calc area */ var area = pJS1.canvas.el.width * pJS1.canvas.el.height / 1000;
            if (pJS1.tmp.retina) area = area / (pJS1.canvas.pxratio * 2);
            /* calc number of particles based on density area */ var nb_particles = area * pJS1.particles.number.value / pJS1.particles.number.density.value_area;
            /* add or remove X particles */ var missing_particles = pJS1.particles.array.length - nb_particles;
            if (missing_particles < 0) pJS1.fn.modes.pushParticles(Math.abs(missing_particles));
            else pJS1.fn.modes.removeParticles(missing_particles);
        }
    };
    pJS1.fn.vendors.checkOverlap = function(p1, position) {
        for(var i = 0; i < pJS1.particles.array.length; i++){
            var p2 = pJS1.particles.array[i];
            var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= p1.radius + p2.radius) {
                p1.x = position ? position.x : Math.random() * pJS1.canvas.w;
                p1.y = position ? position.y : Math.random() * pJS1.canvas.h;
                pJS1.fn.vendors.checkOverlap(p1);
            }
        }
    };
    pJS1.fn.vendors.createSvgImg = function(p) {
        /* set color to svg element */ var svgXml = pJS1.tmp.source_svg, rgbHex = /#([0-9A-F]{3,6})/gi, coloredSvgXml = svgXml.replace(rgbHex, function(m, r, g, b) {
            if (p.color.rgb) var color_value = "rgba(" + p.color.rgb.r + "," + p.color.rgb.g + "," + p.color.rgb.b + "," + p.opacity + ")";
            else var color_value = "hsla(" + p.color.hsl.h + "," + p.color.hsl.s + "%," + p.color.hsl.l + "%," + p.opacity + ")";
            return color_value;
        });
        /* prepare to create img with colored svg */ var svg = new Blob([
            coloredSvgXml
        ], {
            type: "image/svg+xml;charset=utf-8"
        }), DOMURL = window.URL || window.webkitURL || window, url = DOMURL.createObjectURL(svg);
        /* create particle img obj */ var img = new Image();
        img.addEventListener("load", function() {
            p.img.obj = img;
            p.img.loaded = true;
            DOMURL.revokeObjectURL(url);
            pJS1.tmp.count_svg++;
        });
        img.src = url;
    };
    pJS1.fn.vendors.destroypJS = function() {
        cancelAnimationFrame(pJS1.fn.drawAnimFrame);
        canvas_el.remove();
        $d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8 = null;
    };
    pJS1.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        var sideCount = sideCountNumerator * sideCountDenominator;
        var decimalSides = sideCountNumerator / sideCountDenominator;
        var interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
        var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
        c.save();
        c.beginPath();
        c.translate(startX, startY);
        c.moveTo(0, 0);
        for(var i = 0; i < sideCount; i++){
            c.lineTo(sideLength, 0);
            c.translate(sideLength, 0);
            c.rotate(interiorAngle);
        }
        //c.stroke();
        c.fill();
        c.restore();
    };
    pJS1.fn.vendors.exportImg = function() {
        window.open(pJS1.canvas.el.toDataURL("image/png"), "_blank");
    };
    pJS1.fn.vendors.loadImg = function(type) {
        pJS1.tmp.img_error = undefined;
        if (pJS1.particles.shape.image.src != "") {
            if (type == "svg") {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", pJS1.particles.shape.image.src);
                xhr.onreadystatechange = function(data) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            pJS1.tmp.source_svg = data.currentTarget.response;
                            pJS1.fn.vendors.checkBeforeDraw();
                        } else {
                            console.log("Error pJS - Image not found");
                            pJS1.tmp.img_error = true;
                        }
                    }
                };
                xhr.send();
            } else {
                var img = new Image();
                img.addEventListener("load", function() {
                    pJS1.tmp.img_obj = img;
                    pJS1.fn.vendors.checkBeforeDraw();
                });
                img.src = pJS1.particles.shape.image.src;
            }
        } else {
            console.log("Error pJS - No image.src");
            pJS1.tmp.img_error = true;
        }
    };
    pJS1.fn.vendors.draw = function() {
        if (pJS1.particles.shape.type == "image") {
            if (pJS1.tmp.img_type == "svg") {
                if (pJS1.tmp.count_svg >= pJS1.particles.number.value) {
                    pJS1.fn.particlesDraw();
                    if (!pJS1.particles.move.enable) $d1a534ad62a5c4c8$var$cancelRequestAnimFrame(pJS1.fn.drawAnimFrame);
                    else pJS1.fn.drawAnimFrame = $d1a534ad62a5c4c8$var$requestAnimFrame(pJS1.fn.vendors.draw);
                } else //console.log('still loading...');
                if (!pJS1.tmp.img_error) pJS1.fn.drawAnimFrame = $d1a534ad62a5c4c8$var$requestAnimFrame(pJS1.fn.vendors.draw);
            } else {
                if (pJS1.tmp.img_obj != undefined) {
                    pJS1.fn.particlesDraw();
                    if (!pJS1.particles.move.enable) $d1a534ad62a5c4c8$var$cancelRequestAnimFrame(pJS1.fn.drawAnimFrame);
                    else pJS1.fn.drawAnimFrame = $d1a534ad62a5c4c8$var$requestAnimFrame(pJS1.fn.vendors.draw);
                } else if (!pJS1.tmp.img_error) pJS1.fn.drawAnimFrame = $d1a534ad62a5c4c8$var$requestAnimFrame(pJS1.fn.vendors.draw);
            }
        } else {
            pJS1.fn.particlesDraw();
            if (!pJS1.particles.move.enable) $d1a534ad62a5c4c8$var$cancelRequestAnimFrame(pJS1.fn.drawAnimFrame);
            else pJS1.fn.drawAnimFrame = $d1a534ad62a5c4c8$var$requestAnimFrame(pJS1.fn.vendors.draw);
        }
    };
    pJS1.fn.vendors.checkBeforeDraw = function() {
        // if shape is image
        if (pJS1.particles.shape.type == "image") {
            if (pJS1.tmp.img_type == "svg" && pJS1.tmp.source_svg == undefined) pJS1.tmp.checkAnimFrame = $d1a534ad62a5c4c8$var$requestAnimFrame(check);
            else {
                //console.log('images loaded! cancel check');
                $d1a534ad62a5c4c8$var$cancelRequestAnimFrame(pJS1.tmp.checkAnimFrame);
                if (!pJS1.tmp.img_error) {
                    pJS1.fn.vendors.init();
                    pJS1.fn.vendors.draw();
                }
            }
        } else {
            pJS1.fn.vendors.init();
            pJS1.fn.vendors.draw();
        }
    };
    pJS1.fn.vendors.init = function() {
        /* init canvas + particles */ pJS1.fn.retinaInit();
        pJS1.fn.canvasInit();
        pJS1.fn.canvasSize();
        pJS1.fn.canvasPaint();
        pJS1.fn.particlesCreate();
        pJS1.fn.vendors.densityAutoParticles();
        /* particles.line_linked - convert hex colors to rgb */ pJS1.particles.line_linked.color_rgb_line = $d1a534ad62a5c4c8$var$hexToRgb(pJS1.particles.line_linked.color);
    };
    pJS1.fn.vendors.start = function() {
        if ($d1a534ad62a5c4c8$var$isInArray("image", pJS1.particles.shape.type)) {
            pJS1.tmp.img_type = pJS1.particles.shape.image.src.substr(pJS1.particles.shape.image.src.length - 3);
            pJS1.fn.vendors.loadImg(pJS1.tmp.img_type);
        } else pJS1.fn.vendors.checkBeforeDraw();
    };
    /* ---------- pJS - start ------------ */ pJS1.fn.vendors.eventsListeners();
    pJS1.fn.vendors.start();
}
/* ---------- global functions - vendors ------------ */ // https://gist.github.com/fshost/4146993
// extend one object with another object's property's (default is deep extend)
// this works with circular references and is faster than other deep extend methods
// http://jsperf.com/comparing-custom-deep-extend-to-jquery-deep-extend/2
function $d1a534ad62a5c4c8$var$extend(target, source, shallow) {
    var array = "[object Array]", object = "[object Object]", targetMeta, sourceMeta, setMeta = function(value) {
        var meta, jclass = ({}).toString.call(value);
        if (value === undefined) return 0;
        if (typeof value !== "object") return false;
        if (jclass === array) return 1;
        if (jclass === object) return 2;
    };
    for(var key in source){
        if (source.hasOwnProperty(key)) {
            targetMeta = setMeta(target[key]);
            sourceMeta = setMeta(source[key]);
            if (source[key] !== target[key]) {
                if (!shallow && sourceMeta && targetMeta && targetMeta === sourceMeta) target[key] = $d1a534ad62a5c4c8$var$extend(target[key], source[key], true);
                else if (sourceMeta !== 0) target[key] = source[key];
            }
        } else break; // ownProperties are always first (see jQuery's isPlainObject function)
    }
    return target;
}
Object.deepExtend = $d1a534ad62a5c4c8$var$extend;
let $d1a534ad62a5c4c8$var$requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}();
let $d1a534ad62a5c4c8$var$cancelRequestAnimFrame = function() {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
}();
function $d1a534ad62a5c4c8$var$hexToRgb(hex) {
    // By Tim Down - http://stackoverflow.com/a/5624139/3493650
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function $d1a534ad62a5c4c8$var$clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}
function $d1a534ad62a5c4c8$var$isInArray(value, array) {
    return array.indexOf(value) > -1;
}
let $d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8 = [];
function $d1a534ad62a5c4c8$export$a84195d18e286453(hex) {
    if ($d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8.length > 0) {
        let rgbColor = $d1a534ad62a5c4c8$var$hexToRgb(hex);
        $d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8[0].pJS.particles.line_linked.color_rgb_line = rgbColor;
        $d1a534ad62a5c4c8$export$a44bdd20d2c1d681((p)=>{
            p.color.value = hex;
            p.color.rgb = rgbColor;
        });
    }
}
function $d1a534ad62a5c4c8$export$a44bdd20d2c1d681(modifier) {
    if ($d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8.length > 0) $d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8[0].pJS.particles.array.forEach(modifier);
}
function $d1a534ad62a5c4c8$export$bf4d4b4e7a8db89a(tag_id, params) {
    /* no string id? so it's object params, and set the id with default id */ if (typeof tag_id != "string") {
        params = tag_id;
        tag_id = "particles-js";
    }
    /* no id? set the id to default id */ if (!tag_id) tag_id = "particles-js";
    /* pJS elements */ var pJS_tag = document.getElementById(tag_id), pJS_canvas_class = "particles-js-canvas-el", exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);
    /* remove canvas if exists into the pJS target tag */ if (exist_canvas.length) while(exist_canvas.length > 0)pJS_tag.removeChild(exist_canvas[0]);
    /* create canvas element */ var canvas_el = document.createElement("canvas");
    canvas_el.className = pJS_canvas_class;
    /* set size canvas */ canvas_el.style.width = "100%";
    canvas_el.style.height = "100%";
    /* append canvas */ var canvas = document.getElementById(tag_id).appendChild(canvas_el);
    /* launch particle.js */ if (canvas != null) $d1a534ad62a5c4c8$export$133e7c9a2a8d0ed8.push(new $d1a534ad62a5c4c8$export$47684f97fe2830db(tag_id, params));
}
function $d1a534ad62a5c4c8$export$e5860254b396deef(tag_id, path_config_json, callback) {
    /* load json config */ var xhr = new XMLHttpRequest();
    xhr.open("GET", path_config_json);
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var params = JSON.parse(data.currentTarget.response);
                $d1a534ad62a5c4c8$export$bf4d4b4e7a8db89a(tag_id, params);
                if (callback) callback();
            } else {
                console.log("Error pJS - XMLHttpRequest status: " + xhr.status);
                console.log("Error pJS - File config not found");
            }
        }
    };
    xhr.send();
}


//# sourceMappingURL=particles-common.js.map

import { pJSFunctions } from './pjsfunctions';

'use strict';

export class pJS {
    constructor(tag_id, params) {
        let canvas_el = document.querySelector('#' + tag_id + ' > .particles-js-canvas-el');

        /* particles.js variables with default values */
        this.pJS = {
            canvas: {
                el: canvas_el,
                w: canvas_el.offsetWidth,
                h: canvas_el.offsetHeight
            },
            particles: {
                array: []
            },
            interactivity: {
                mouse: {}
            },
            options: {
                particles: {
                    number: {
                        value: 400,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#fff'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#ff0000'
                        },
                        polygon: {
                            nb_sides: 5
                        },
                        image: {
                            src: '',
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
                        color: '#fff',
                        opacity: 1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
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
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab',
                            parallax: {
                                enable: true,
                                force: 2,
                                smooth: 10
                            }
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
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
                    }
                },
                retina_detect: false
            }
        };

        let pJS = this.pJS;
        let options = pJS.options;

        pJS.fn = new pJSFunctions(pJS);

        /* params settings */
        if (params) {
            Object.deepExtend(pJS, params);
            Object.deepExtend(options, params);
        }

        /* ---------- pJS - start ------------ */
        pJS.fn.vendors.eventsListeners();

        //TODO: Start è async
        pJS.fn.vendors.start();
    }
}
import { pJSFunctions } from './pjsfunctions';

'use strict';

export interface pJS {
    canvas: {
        el: HTMLElement,
        ctx?: any,
        w: number,
        h: number,
        tag_id: string
    },
    particles: {
        array: []
    },
    interactivity: {
        mouse: {}
    },
    options: pJSOptions,
    fn?: pJSFunctions
}

export interface pJSOptions {
    particles: {
        number: {
            value: number,
            density: {
                enable: boolean,
                value_area: number
            }
        },
        color: {
            value: string
        },
        shape: {
            type: string,
            stroke: {
                width: number,
                color: string
            },
            polygon: {
                nb_sides: number
            },
            image: {
                src: string,
                width: number,
                height: number
            }
        },
        opacity: {
            value: number,
            random: boolean,
            anim: {
                enable: boolean,
                speed: number,
                opacity_min: number,
                sync: boolean
            }
        },
        size: {
            value: number,
            random: boolean,
            anim: {
                enable: boolean,
                speed: number,
                size_min: number,
                sync: boolean
            }
        },
        line_linked: {
            enable: boolean,
            distance: number,
            color: string,
            opacity: number,
            width: number,
            color_rgb?: pJSRgb | null
        },
        move: {
            enable: boolean,
            speed: number,
            direction: string,
            random: boolean,
            straight: boolean,
            out_mode: string,
            bounce: boolean,
            attract: {
                enable: boolean,
                rotateX: number,
                rotateY: number
            }
        },
        array: []
    },
    interactivity: {
        detect_on: string,
        events: {
            onhover: {
                enable: boolean,
                mode: string,
                parallax: {
                    enable: boolean,
                    force: number,
                    smooth: number
                }
            },
            onclick: {
                enable: boolean,
                mode: string
            },
            resize: boolean
        },
        modes: {
            grab: {
                distance: number,
                line_linked: {
                    opacity: number
                }
            },
            bubble: {
                distance: number,
                size: number,
                duration: number
            },
            repulse: {
                distance: number,
                duration: number
            },
            push: {
                particles_nb: number
            },
            remove: {
                particles_nb: number
            }
        }
    },
    retina_detect: boolean
}

export interface pJSRgb {
    r: number,
    g: number,
    b: number
}
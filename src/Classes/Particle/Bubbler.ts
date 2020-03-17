"use strict";

import {Container} from "../Container";
import {IBubblerProcessParam} from "../../Interfaces/IBubblerProcessParam";
import {Particle} from "../Particle";
import {ProcessBubbleType} from "../../Enums/ProcessBubbleType";
import {Utils} from "../Utils/Utils";
import {HoverMode} from "../../Enums/Modes/HoverMode";
import {ClickMode} from "../../Enums/Modes/ClickMode";

/**
 * Particle bubble manager
 */
export class Bubbler {
    public opacity?: number;
    public radius?: number;

    private readonly particle: Particle;
    private readonly container: Container;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public bubble(): void {
        const container = this.container;
        const options = container.options;
        const hoverEnabled = options.interactivity.events.onHover.enable;
        const hoverMode = options.interactivity.events.onHover.mode;
        const clickEnabled = options.interactivity.events.onClick.enable;
        const clickMode = options.interactivity.events.onClick.mode;

        /* on hover event */
        if (hoverEnabled && Utils.isInArray(HoverMode.bubble, hoverMode)) {
            this.hoverBubble();
        } else if (clickEnabled && Utils.isInArray(ClickMode.bubble, clickMode)) {
            this.clickBubble();
        }
    }

    private init(): void {
        const particle = this.particle;

        this.opacity = particle.opacity.value;
        this.radius = particle.radius;
    }

    private process(distMouse: number, timeSpent: number, data: IBubblerProcessParam): void {
        const container = this.container;
        const options = container.options;
        const bubbleDuration = options.interactivity.modes.bubble.duration;
        const bubbleParam = data.bubbleObj.optValue;
        const bubbleDistance = container.retina.bubbleModeDistance;
        const particlesParam = data.particlesObj.optValue;
        const pObjBubble = data.bubbleObj.value;
        const pObj = data.particlesObj.value || 0;
        const type = data.type;

        if (bubbleParam !== particlesParam) {
            if (!container.bubble.durationEnd) {
                if (distMouse <= bubbleDistance) {
                    let obj;

                    if (pObjBubble) {
                        obj = pObjBubble;
                    } else {
                        obj = pObj;
                    }

                    if (obj !== bubbleParam) {
                        const value = pObj - (timeSpent * (pObj - bubbleParam) / bubbleDuration);

                        if (type === ProcessBubbleType.size) {
                            this.radius = value;
                        }

                        if (type === ProcessBubbleType.opacity) {
                            this.opacity = value;
                        }
                    }
                } else {
                    if (type === ProcessBubbleType.size) {
                        this.radius = undefined;
                    }

                    if (type === ProcessBubbleType.opacity) {
                        this.opacity = undefined;
                    }
                }
            } else if (pObjBubble) {
                const tmpValue = pObj - (timeSpent * (pObj - bubbleParam) / bubbleDuration);
                const dif = bubbleParam - tmpValue;
                const value = bubbleParam + dif;

                if (type === ProcessBubbleType.size) {
                    this.radius = value;
                }

                if (type === ProcessBubbleType.opacity) {
                    this.opacity = value;
                }
            }
        }
    }

    private clickBubble(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        /* on click event */
        const mouseClickPos = container.interactivity.mouse.clickPosition || {x: 0, y: 0};
        const distMouse = Utils.getDistanceBetweenCoordinates(particle.position, mouseClickPos);
        const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

        if (container.bubble.clicking) {
            if (timeSpent > options.interactivity.modes.bubble.duration) {
                container.bubble.durationEnd = true;
            }

            if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.durationEnd = false;
            }
        }

        if (container.bubble.clicking) {
            /* size */
            const sizeData: IBubblerProcessParam = {
                bubbleObj: {
                    optValue: container.retina.bubbleModeSize,
                    value: this.radius,
                },
                particlesObj: {
                    optValue: container.retina.sizeValue,
                    value: this.particle.radius,
                },
                type: ProcessBubbleType.size,
            };

            this.process(distMouse, timeSpent, sizeData);

            /* opacity */
            const opacityData: IBubblerProcessParam = {
                bubbleObj: {
                    optValue: options.interactivity.modes.bubble.opacity,
                    value: this.opacity,
                },
                particlesObj: {
                    optValue: options.particles.opacity.value,
                    value: this.particle.opacity.value,
                },
                type: ProcessBubbleType.opacity,
            };

            this.process(distMouse, timeSpent, opacityData);
        }
    }

    private hoverBubble(): void {
        const container = this.container;
        const particle = this.particle;
        const mousePos = container.interactivity.mouse.position || {
            x: 0,
            y: 0,
        };
        const distMouse = Utils.getDistanceBetweenCoordinates(particle.position, mousePos);
        const ratio = 1 - distMouse / container.retina.bubbleModeDistance;

        /* mousemove - check ratio */
        if (distMouse <= container.retina.bubbleModeDistance) {
            if (ratio >= 0 && container.interactivity.status === "mousemove") {
                /* size */
                this.hoverBubbleSize(ratio);

                /* opacity */
                this.hoverBubbleOpacity(ratio);
            }
        } else {
            this.init();
        }

        /* mouseleave */
        if (container.interactivity.status === "mouseleave") {
            this.init();
        }
    }

    private hoverBubbleSize(ratio: number): void {
        const container = this.container;
        const particle = this.particle;

        if (container.retina.bubbleModeSize !== container.retina.sizeValue) {
            if (container.retina.bubbleModeSize > container.retina.sizeValue) {
                const size = particle.radius + (container.retina.bubbleModeSize * ratio);

                if (size >= 0) {
                    this.radius = size;
                }
            } else {
                const dif = particle.radius - container.retina.bubbleModeSize;
                const size = particle.radius - (dif * ratio);

                if (size > 0) {
                    this.radius = size;
                } else {
                    this.radius = 0;
                }
            }
        }
    }

    private hoverBubbleOpacity(ratio: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const modeOpacity = options.interactivity.modes.bubble.opacity;
        const optOpacity = options.particles.opacity.value;
        const pOpacity = particle.opacity.value;

        if (modeOpacity !== optOpacity) {
            if (modeOpacity > optOpacity) {
                const opacity = options.interactivity.modes.bubble.opacity * ratio;

                if (opacity > pOpacity && opacity <= modeOpacity) {
                    this.opacity = opacity;
                }
            } else {
                const opacity = pOpacity - (optOpacity - modeOpacity) * ratio;

                if (opacity < pOpacity && opacity >= modeOpacity) {
                    this.opacity = opacity;
                }
            }
        }
    }
}

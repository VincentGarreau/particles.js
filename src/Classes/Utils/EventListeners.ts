"use strict";

import {ClickMode} from "../../Enums/Modes/ClickMode";
import {Container} from "../Container";
import {InteractivityDetect} from "../../Enums/InteractivityDetect";
import {ICoordinates} from "../../Interfaces/ICoordinates";
import {PolygonMaskType} from "../../Enums/PolygonMaskType";

/**
 * Particles container event listeners manager
 */
export class EventListeners {
    private readonly container: Container;

    private readonly mouseMoveHandler: EventListenerOrEventListenerObject;
    private readonly touchStartHandler: EventListenerOrEventListenerObject;
    private readonly touchMoveHandler: EventListenerOrEventListenerObject;
    private readonly touchEndHandler: EventListenerOrEventListenerObject;
    private readonly mouseLeaveHandler: EventListenerOrEventListenerObject;
    private readonly touchCancelHandler: EventListenerOrEventListenerObject;
    private readonly touchEndClickHandler: EventListenerOrEventListenerObject;
    private readonly mouseUpHandler: EventListenerOrEventListenerObject;
    private readonly visibilityChangeHandler: EventListenerOrEventListenerObject;
    private readonly resizeHandler: EventListenerOrEventListenerObject;

    /**
     * Events listener constructor
     * @param container the calling container
     */
    constructor(container: Container) {
        this.container = container;

        this.mouseMoveHandler = (e: Event) => this.mouseTouchMove(e);
        this.touchStartHandler = (e: Event) => this.mouseTouchMove(e);
        this.touchMoveHandler = (e: Event) => this.mouseTouchMove(e);
        this.touchEndHandler = () => this.mouseTouchFinish();
        this.mouseLeaveHandler = () => this.mouseTouchFinish();
        this.touchCancelHandler = () => this.mouseTouchFinish();
        this.touchEndClickHandler = (e: Event) => this.mouseTouchClick(e);
        this.mouseUpHandler = (e: Event) => this.mouseTouchClick(e);
        this.visibilityChangeHandler = () => this.handleVisibilityChange();
        this.resizeHandler = () => this.handleWindowResize();
    }

    /**
     * Initializing event listeners
     */
    public addEventsListeners(): void {
        const container = this.container;
        const options = container.options;

        /* events target element */
        if (options.interactivity.detectsOn === InteractivityDetect.window) {
            container.interactivity.element = window;
        } else if (options.interactivity.detectsOn === InteractivityDetect.parent && container.canvas.element) {
            container.interactivity.element = container.canvas.element.parentNode;
        } else {
            container.interactivity.element = container.canvas.element;
        }

        const interactivityEl = container.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
            if (interactivityEl) {
                /* el on mousemove */
                interactivityEl.addEventListener("mousemove", this.mouseMoveHandler);

                /* el on touchstart */
                interactivityEl.addEventListener("touchstart", this.touchStartHandler);

                /* el on touchmove */
                interactivityEl.addEventListener("touchmove", this.touchMoveHandler);

                if (!options.interactivity.events.onClick.enable) {
                    /* el on touchend */
                    interactivityEl.addEventListener("touchend", this.touchEndHandler);
                }

                /* el on onmouseleave */
                interactivityEl.addEventListener("mouseleave", this.mouseLeaveHandler);

                /* el on touchcancel */
                interactivityEl.addEventListener("touchcancel", this.touchCancelHandler);
            }
        }

        /* on click event */
        if (options.interactivity.events.onClick.enable) {
            if (interactivityEl) {
                interactivityEl.addEventListener("touchend", this.touchEndClickHandler);
                interactivityEl.addEventListener("mouseup", this.mouseUpHandler);
            }
        }

        if (options.interactivity.events.resize) {
            window.addEventListener("resize", this.resizeHandler);
        }

        document?.addEventListener("visibilitychange", this.visibilityChangeHandler, false);
    }

    public removeEventsListeners(): void {
        const container = this.container;
        const options = container.options;

        /* events target element */
        if (options.interactivity.detectsOn === InteractivityDetect.window) {
            container.interactivity.element = window;
        } else if (options.interactivity.detectsOn === InteractivityDetect.parent && container.canvas.element) {
            container.interactivity.element = container.canvas.element.parentNode;
        } else {
            container.interactivity.element = container.canvas.element;
        }

        const interactivityEl = container.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
            if (interactivityEl) {
                /* el on mousemove */
                interactivityEl.removeEventListener("mousemove", this.mouseMoveHandler);

                /* el on touchstart */
                interactivityEl.removeEventListener("touchstart", this.touchStartHandler);

                /* el on touchmove */
                interactivityEl.removeEventListener("touchmove", this.touchMoveHandler);

                if (!options.interactivity.events.onClick.enable) {
                    /* el on touchend */
                    interactivityEl.removeEventListener("touchend", this.touchEndHandler);
                }

                /* el on onmouseleave */
                interactivityEl.removeEventListener("mouseleave", this.mouseLeaveHandler);

                /* el on touchcancel */
                interactivityEl.removeEventListener("touchcancel", this.touchCancelHandler);
            }
        }

        /* on click event */
        if (options.interactivity.events.onClick.enable) {
            if (interactivityEl) {
                interactivityEl.removeEventListener("touchend", this.touchEndClickHandler);
                interactivityEl.removeEventListener("mouseup", this.mouseUpHandler);
            }
        }

        if (options.interactivity.events.resize) {
            window.removeEventListener("resize", this.resizeHandler);
        }

        document?.removeEventListener("visibilitychange", this.visibilityChangeHandler);
    }

    private handleWindowResize(): void {
        const container = this.container;
        const options = container.options;

        if (!container.canvas.element) {
            return;
        }

        container.canvas.dimension.width = container.canvas.element.offsetWidth;
        container.canvas.dimension.height = container.canvas.element.offsetHeight;

        /* resize canvas */
        if (container.retina.isRetina) {
            container.canvas.dimension.width *= container.retina.pxRatio;
            container.canvas.dimension.height *= container.retina.pxRatio;
        }

        container.canvas.element.width = container.canvas.dimension.width;
        container.canvas.element.height = container.canvas.dimension.height;

        /* repaint canvas on anim disabled */
        if (!options.particles.move.enable) {
            container.particles.clear();
            container.particles.init();
            container.particles.draw(0);
        }

        /* density particles enabled */
        container.densityAutoParticles();

        if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none) {
            if (container.polygon.redrawTimeout) {
                clearTimeout(container.polygon.redrawTimeout);
            }

            container.polygon.redrawTimeout = setTimeout(async () => {
                container.polygon.raw = await container.polygon.parseSvgPathToPolygon();
                container.particles.clear();
                container.particles.init();
                container.particles.draw(0);
            }, 250);
        }
    }

    private handleVisibilityChange(): void {
        const container = this.container;
        const options = container.options;

        if (!options.pauseOnBlur) {
            return;
        }

        if (document?.hidden) {
            container.pageHidden = true;

            container.pause();
        } else {
            container.pageHidden = false;

            container.play();
        }
    }

    /**
     * Mouse/Touch move event
     * @param e the event arguments
     */
    private mouseTouchMove(e: Event): void {
        const container = this.container;
        const options = container.options;

        let pos: ICoordinates;

        if (e.type.startsWith("mouse")) {
            const mouseEvent = e as MouseEvent;

            if (container.interactivity.element === window && container.canvas.element) {
                const clientRect = container.canvas.element.getBoundingClientRect();

                pos = {
                    x: mouseEvent.clientX - clientRect.left,
                    y: mouseEvent.clientY - clientRect.top,
                };
            } else if (options.interactivity.detectsOn === InteractivityDetect.parent) {
                const source = mouseEvent.target as HTMLElement;
                const target = mouseEvent.currentTarget as HTMLElement;

                if (source && target) {
                    const sourceRect = source.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();

                    pos = {
                        x: mouseEvent.offsetX + sourceRect.left - targetRect.left,
                        y: mouseEvent.offsetY + sourceRect.top - targetRect.top,
                    };
                } else {
                    pos = {
                        x: mouseEvent.offsetX || mouseEvent.clientX,
                        y: mouseEvent.offsetY || mouseEvent.clientY,
                    };
                }
            } else {
                pos = {
                    x: mouseEvent.offsetX || mouseEvent.clientX,
                    y: mouseEvent.offsetY || mouseEvent.clientY,
                };
            }
        } else {
            const touchEvent = e as TouchEvent;

            const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];

            pos = {
                x: lastTouch.clientX,
                y: lastTouch.clientY,
            };
        }

        container.interactivity.mouse.position = pos;

        if (container.retina.isRetina) {
            container.interactivity.mouse.position.x *= container.retina.pxRatio;
            container.interactivity.mouse.position.y *= container.retina.pxRatio;
        }

        container.interactivity.status = "mousemove";
    }

    /**
     * Mouse/Touch event finish
     */
    private mouseTouchFinish(): void {
        const container = this.container;

        container.interactivity.mouse.position = null;
        container.interactivity.status = "mouseleave";
    }

    /**
     * Mouse/Touch click/tap event
     * @param e the click event arguments
     */
    private mouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none &&
            options.polygon.type !== PolygonMaskType.inline) {
            if (container.polygon.checkInsidePolygon(container.interactivity.mouse.position)) {
                this.doMouseTouchClick(e);
            }
        } else {
            this.doMouseTouchClick(e);
        }
    }

    /**
     * Mouse/Touch click/tap event implementation
     * @param e the click event arguments
     */
    private doMouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (container.interactivity.mouse.position) {
            container.interactivity.mouse.clickPosition = {
                x: container.interactivity.mouse.position.x,
                y: container.interactivity.mouse.position.y,
            };
        }

        container.interactivity.mouse.clickTime = new Date().getTime();

        const pushNb = options.interactivity.modes.push.quantity;
        const removeNb = options.interactivity.modes.remove.quantity;

        switch (options.interactivity.events.onClick.mode) {
            case ClickMode.push:
                if (options.particles.move.enable) {
                    container.particles.push(pushNb, container.interactivity.mouse);
                } else {
                    if (options.interactivity.modes.push.quantity === 1) {
                        container.particles.push(pushNb, container.interactivity.mouse);
                    } else if (options.interactivity.modes.push.quantity > 1) {
                        container.particles.push(pushNb);
                    }
                }
                break;
            case ClickMode.remove:
                container.particles.remove(removeNb);
                break;
            case ClickMode.bubble:
                container.bubble.clicking = true;
                break;
            case ClickMode.repulse:
                container.repulse.clicking = true;
                container.repulse.count = 0;
                container.repulse.finish = false;
                setTimeout(() => {
                    container.repulse.clicking = false;
                }, options.interactivity.modes.repulse.duration * 1000);
                break;
        }

        e.preventDefault();

        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }

        e.preventDefault();
    }
}

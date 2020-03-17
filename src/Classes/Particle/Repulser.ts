"use strict";

import {ClickMode} from "../../Enums/Modes/ClickMode";
import {Container} from "../Container";
import {HoverMode} from "../../Enums/Modes/HoverMode";
import {OutMode} from "../../Enums/OutMode";
import {Particle} from "../Particle";
import {Utils} from "../Utils/Utils";
import {DivMode} from "../../Enums/Modes/DivMode";

/**
 * Particle repulse manager
 */
export class Repulser {
    private readonly particle: Particle;
    private readonly container: Container;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public repulse(): void {
        const container = this.container;
        const options = container.options;
        const hoverEnabled = options.interactivity.events.onHover.enable;
        const clickEnabled = options.interactivity.events.onClick.enable;
        const mouseMoveStatus = container.interactivity.status === "mousemove";
        const hoverMode = options.interactivity.events.onHover.mode;
        const clickMode = options.interactivity.events.onClick.mode;
        const divMode = options.interactivity.events.onDiv.mode;

        if (mouseMoveStatus && hoverEnabled && Utils.isInArray(HoverMode.repulse, hoverMode)) {
            this.hoverRepulse();
        } else if (clickEnabled && Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse();
        } else if (options.interactivity.events.onDiv.enable && Utils.isInArray(DivMode.repulse, divMode)) {
            this.divRepulse();
        }
    }

    private divRepulse(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        const elem = document.getElementById(options.interactivity.events.onDiv.elementId) as HTMLElement;
        const pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2),
            y: (elem.offsetTop + elem.offsetHeight / 2),
        };
        let divWidth = elem.offsetWidth / 2;

        if (container.retina.isRetina) {
            pos.x *= container.retina.pxRatio;
            pos.y *= container.retina.pxRatio;
            divWidth *= container.retina.pxRatio
        }

        const dxDiv = particle.position.x - pos.x;
        const dyDiv = particle.position.y - pos.y;
        const distDiv = Math.sqrt(dxDiv * dxDiv + dyDiv * dyDiv);
        const normVec = {
            x: dxDiv / distDiv,
            y: dyDiv / distDiv,
        };
        const repulseRadius = divWidth;
        const velocity = 100;
        const repulseFactor = Utils.clamp((-Math.pow(distDiv / repulseRadius, 4) + 1) * velocity, 0, 50);

        this.particle.position.x += normVec.x * repulseFactor;
        this.particle.position.y += normVec.y * repulseFactor;
    }

    private clickRepulse(): void {
        const container = this.container;
        const particle = this.particle;

        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }

            container.repulse.count++;

            if (container.repulse.count === container.particles.array.length) {
                container.repulse.finish = true;
            }
        }

        if (container.repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance;
            const repulseRadius = Math.pow(repulseDistance / 6, 3);
            const mouseClickPos = container.interactivity.mouse.clickPosition || {x: 0, y: 0};
            const dx = mouseClickPos.x - particle.position.x;
            const dy = mouseClickPos.y - particle.position.y;
            const d = dx * dx + dy * dy;
            const force = -repulseRadius / d;

            // default
            if (d <= repulseRadius) {
                this.processRepulse(dx, dy, force);
            }
            // bang - slow motion mode
            // if(!container.repulse_finish){
            //   if(d <= repulseRadius){
            //     process();
            //   }
            // }else{
            //   process();
            // }
        } else if (container.repulse.clicking === false) {
            particle.velocity.horizontal = particle.initialVelocity.horizontal;
            particle.velocity.vertical = particle.initialVelocity.vertical;
        }
    }

    private hoverRepulse(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const mousePos = container.interactivity.mouse.position || {x: 0, y: 0};
        const dxMouse = particle.position.x - mousePos.x;
        const dyMouse = particle.position.y - mousePos.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const normVec = {x: dxMouse / distMouse, y: dyMouse / distMouse};
        const repulseRadius = container.retina.repulseModeDistance;
        const velocity = 100;
        const repulseFactor = Utils.clamp((1 - Math.pow(distMouse / repulseRadius, 2)) * velocity, 0, 50);
        const pos = {
            x: particle.position.x + normVec.x * repulseFactor,
            y: particle.position.y + normVec.y * repulseFactor,
        };
        const outMode = options.particles.move.outMode;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical || outMode === OutMode.bounceHorizontal) {
            const isInside = {
                horizontal: pos.x - particle.radius > 0 && pos.x + particle.radius < container.canvas.dimension.width,
                vertical: pos.y - particle.radius > 0 && pos.y + particle.radius < container.canvas.dimension.height,
            };
            if (outMode === OutMode.bounceVertical || isInside.horizontal) {
                particle.position.x = pos.x;
            }

            if (outMode === OutMode.bounceHorizontal || isInside.vertical) {
                particle.position.y = pos.y;
            }
        } else {
            particle.position.x = pos.x;
            particle.position.y = pos.y;
        }
    }

    private processRepulse(dx: number, dy: number, force: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const f = Math.atan2(dy, dx);

        particle.velocity.horizontal = force * Math.cos(f);
        particle.velocity.vertical = force * Math.sin(f);

        const outMode = options.particles.move.outMode;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal || outMode === OutMode.bounceVertical) {
            const pos = {
                x: particle.position.x + particle.velocity.horizontal,
                y: particle.position.y + particle.velocity.vertical,
            };

            if (outMode !== OutMode.bounceVertical) {
                if (pos.x + particle.radius > container.canvas.dimension.width || pos.x - particle.radius < 0) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                }
            }

            if (outMode !== OutMode.bounceHorizontal) {
                if (pos.y + particle.radius > container.canvas.dimension.height || pos.y - particle.radius < 0) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }
            }
        }
    }
}

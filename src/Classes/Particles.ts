"use strict";

import {Container} from "./Container";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {IMouseData} from "../Interfaces/IMouseData";
import {IRgb} from "../Interfaces/IRgb";
import {Particle} from "./Particle";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {PolygonMaskInlineArrangement} from "../Enums/PolygonMaskInlineArrangement";

/**
 * Particles manager
 */
export class Particles {
    public array: Particle[];
    public pushing?: boolean;
    public lineLinkedColor?: IRgb | string | null;

    private readonly container: Container;
    private interactionsEnabled: boolean;

    constructor(container: Container) {
        this.container = container;
        this.array = [];
        this.interactionsEnabled = false;
    }

    /* --------- tsParticles functions - particles ----------- */
    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline &&
            options.polygon.inline.arrangement === PolygonMaskInlineArrangement.onePerPoint) {
            container.polygon.drawPointsOnPolygonPath();
        } else {
            for (let i = this.array.length; i < options.particles.number.value; i++) {
                const p = new Particle(container);

                this.array.push(p);
            }
        }

        this.interactionsEnabled = options.particles.lineLinked.enable ||
            options.particles.move.attract.enable ||
            options.particles.move.collisions;
    }

    public update(delta: number): void {
        for (let i = 0; i < this.array.length; i++) {
            /* the particle */
            const p = this.array[i];

            // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
            //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }

            p.update(i, delta);

            /* interaction auto between particles */
            if (this.interactionsEnabled) {
                for (let j = i + 1; j < this.array.length; j++) {
                    const p2 = this.array[j];

                    p.interact(p2);
                }
            }
        }
    }

    public draw(delta: number): void {
        const container = this.container;
        const options = container.options;

        /* clear canvas */
        container.canvas.clear();

        /* update each particles param */
        this.update(delta);

        /* draw polygon shape in debug mode */
        if (options.polygon.enable && options.polygon.draw.enable) {
            container.polygon.drawPolygon();
        }

        /* draw each particle */
        for (const p of this.array) {
            p.draw();
        }
    }

    public clear(): void {
        this.array = [];
    }

    /* ---------- tsParticles functions - modes events ------------ */
    public push(nb: number, mousePosition?: IMouseData): void {
        const container = this.container;
        const options = container.options;

        this.pushing = true;

        if (options.particles.number.limit > 0) {
            if ((this.array.length + nb) > options.particles.number.limit) {
                this.remove((this.array.length + nb) - options.particles.number.limit);
            }
        }

        let pos: ICoordinates | undefined;

        if (mousePosition) {
            pos = mousePosition.position || {x: 0, y: 0};
        }

        for (let i = 0; i < nb; i++) {
            const p = new Particle(container, pos);

            this.array.push(p);
        }

        if (!options.particles.move.enable) {
            this.draw(0);
        }

        this.pushing = false;
    }

    public remove(nb: number): void {
        const container = this.container;
        const options = container.options;

        this.array.splice(0, nb);

        if (!options.particles.move.enable) {
            this.draw(0);
        }
    }
}

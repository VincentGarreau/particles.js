"use strict";

import {Container} from "../Container";
import {Particle} from "../Particle";

/**
 * Particle draw manager
 */
export class Drawer {
    private readonly particle: Particle;
    private readonly container: Container;
    private readonly text?: string;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public draw(): void {
        const container = this.container;
        const particle = this.particle;

        container.canvas.drawParticle(particle);
    }
}

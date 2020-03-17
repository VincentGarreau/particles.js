import {Container} from "../Container";
import {Particle} from "../Particle";

export class Attracter {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public attract(p2: Particle): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        /* condensed particles */
        const dx = particle.position.x - p2.position.x;
        const dy = particle.position.y - p2.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= container.retina.lineLinkedDistance) {
            const ax = dx / (options.particles.move.attract.rotate.x * 1000);
            const ay = dy / (options.particles.move.attract.rotate.y * 1000);

            particle.velocity.horizontal -= ax;
            particle.velocity.vertical -= ay;
            p2.velocity.horizontal += ax;
            p2.velocity.vertical += ay;
        }
    }
}

import {Container} from "../Container";
import {Particle} from "../Particle";
import {Linker} from "./Linker";
import {Attracter} from "./Attracter";
import {Collider} from "./Collider";

export class InteractionManager {
    private readonly container: Container;
    private readonly particle: Particle;
    private readonly linker: Linker;
    private readonly attracter: Attracter;
    private readonly collider: Collider;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
        this.linker = new Linker(container, particle);
        this.attracter = new Attracter(container, particle);
        this.collider = new Collider(container, particle);
    }

    public interact(p2: Particle): void {
        const container = this.container;
        const options = container.options;

        /* link particles */
        if (options.particles.lineLinked.enable) {
            this.linker.link(p2);
        }

        /* attract particles */
        if (options.particles.move.attract.enable) {
            this.attracter.attract(p2);
        }

        /* bounce particles */
        if (options.particles.move.collisions) {
            this.collider.collide(p2);
        }
    }
}

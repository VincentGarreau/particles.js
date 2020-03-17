import {Container} from "../Container";
import {Particle} from "../Particle";
import {Utils} from "../Utils/Utils";

export class Collider {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public collide(p2: Particle): void {
        const p1 = this.particle;

        if (p1 === p2) {
            return;
        }

        const dist = Utils.getDistanceBetweenCoordinates(p1.position, p2.position);
        const distP = (p1.bubbler.radius || p1.radius) + (p2.bubbler.radius || p2.radius);

        if (dist <= distP) {
            p1.resetVelocity();
            p2.resetVelocity();
        }
    }
}

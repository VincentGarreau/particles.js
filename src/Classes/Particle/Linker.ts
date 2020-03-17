import {Particle} from "../Particle";
import {Utils} from "../Utils/Utils";
import {Container} from "../Container";

export class Linker {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public link(p2: Particle): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const x1 = particle.position.x + particle.offset.x;
        const x2 = p2.position.x + p2.offset.x;
        const dx = x1 - x2;
        const y1 = particle.position.y + particle.offset.y;
        const y2 = p2.position.y + p2.offset.y;
        const dy = y1 - y2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const optOpacity = options.particles.lineLinked.opacity;
        const optDistance = container.retina.lineLinkedDistance;

        /* draw a line between p1 and p2 if the distance between them is under the config distance */
        if (dist <= optDistance) {
            const opacityLine = optOpacity - (dist * optOpacity) / optDistance;

            if (opacityLine > 0) {
                /* style */
                if (!container.particles.lineLinkedColor) {
                    const color = options.particles.lineLinked.color;

                    /* particles.line_linked - convert hex colors to rgb */
                    //  check for the color profile requested and
                    //  then return appropriate value

                    if (color === "random") {
                        if (options.particles.lineLinked.consent) {
                            container.particles.lineLinkedColor = Utils.hexToRgb(color);
                        } else if (options.particles.lineLinked.blink) {
                            container.particles.lineLinkedColor = "random";
                        } else {
                            container.particles.lineLinkedColor = "mid";
                        }
                    } else {
                        container.particles.lineLinkedColor = Utils.hexToRgb(color);
                    }
                }

                container.canvas.drawLinkedLine(particle, p2, {x: x1, y: y1}, {x: x2, y: y2}, opacityLine);
            }
        }
    }
}

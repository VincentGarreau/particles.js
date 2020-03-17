import {Container} from "./Container";
import {ShapeType} from "../Enums/ShapeType";

export class Drawer {
    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    public draw(timestamp: DOMHighResTimeStamp): void {
        const container = this.container;
        const options = container.options;

        // FPS limit logic
        // If we are too fast, just draw without updating
        const fpsLimit = options.fpsLimit > 0 ? options.fpsLimit : 60;

        if (container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + (1000 / fpsLimit)) {
            container.play();
            return;
        }

        const delta = timestamp - container.lastFrameTime;

        container.lastFrameTime = timestamp;

        if (options.particles.shape.type === ShapeType.image && container.images.every((img) => img.error)) {
            return;
        }

        container.particles.draw(delta);

        if (!options.particles.move.enable) {
            container.pause();
        } else {
            container.play();
        }
    }
}

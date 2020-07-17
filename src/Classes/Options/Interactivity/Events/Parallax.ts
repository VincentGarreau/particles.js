import {IParallax} from "../../../../Interfaces/Options/Interactivity/Events/IParallax";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Parallax implements IParallax {
    public enable: boolean;
    public force: number;
    public smooth: number;

    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
    }

    public load(data?: RecursivePartial<IParallax>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.force !== undefined) {
                this.force = data.force;
            }

            if (data.smooth !== undefined) {
                this.smooth = data.smooth;
            }
        }
    }
}

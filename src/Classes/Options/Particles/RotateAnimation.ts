import {IRotateAnimation} from "../../../Interfaces/Options/Particles/IRotateAnimation";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class RotateAnimation implements IRotateAnimation {
    public enable: boolean;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }

    public load(data?: RecursivePartial<IRotateAnimation>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.speed !== undefined) {
                this.speed = data.speed;
            }

            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
        }
    }
}

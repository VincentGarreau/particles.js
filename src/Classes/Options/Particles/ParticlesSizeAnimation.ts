import {ISizeAnimation} from "../../../Interfaces/Options/Particles/ISizeAnimation";
import {Messages} from "../../Utils/Messages";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class ParticlesSizeAnimation implements ISizeAnimation {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    public get size_min(): number {
        Messages.deprecated("particles.size.animation.size_min", "particles.size.animation.minimumValue");

        return this.minimumValue;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    public set size_min(value: number) {
        Messages.deprecated("particles.size.animation.size_min", "particles.size.animation.minimumValue");

        this.minimumValue = value;
    }

    public enable: boolean;
    public minimumValue: number;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 20;
        this.sync = false;
    }

    public load(data?: RecursivePartial<ISizeAnimation>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.minimumValue !== undefined) {
                this.minimumValue = data.minimumValue;
            } else if (data.size_min !== undefined) {
                this.size_min = data.size_min;
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

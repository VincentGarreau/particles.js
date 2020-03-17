import {IOpacityAnimation} from "../../../Interfaces/Options/Particles/IOpacityAnimation";
import {Messages} from "../../Utils/Messages";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class OpacityAnimation implements IOpacityAnimation {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    public get opacity_min(): number {
        Messages.deprecated("particles.opacity.animation.opacity_min", "particles.opacity.animation.minimumValue");

        return this.minimumValue;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    public set opacity_min(value: number) {
        Messages.deprecated("particles.opacity.animation.opacity_min", "particles.opacity.animation.minimumValue");

        this.minimumValue = value;
    }

    public enable: boolean;
    public minimumValue: number;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 2;
        this.sync = false;
    }

    public load(data?: RecursivePartial<IOpacityAnimation>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.minimumValue !== undefined) {
                this.minimumValue = data.minimumValue;
            } else if (data.opacity_min !== undefined) {
                this.opacity_min = data.opacity_min;
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

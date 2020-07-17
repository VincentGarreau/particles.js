import {IOpacity} from "../../../Interfaces/Options/Particles/IOpacity";
import {OpacityAnimation} from "./OpacityAnimation";
import {IOpacityAnimation} from "../../../Interfaces/Options/Particles/IOpacityAnimation";
import {Messages} from "../../Utils/Messages";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class Opacity implements IOpacity {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): IOpacityAnimation {
        Messages.deprecated("particles.opacity.anim", "particles.opacity.animation");

        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: IOpacityAnimation) {
        Messages.deprecated("particles.opacity.anim", "particles.opacity.animation");

        this.animation = value;
    }

    public animation: IOpacityAnimation;
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new OpacityAnimation();
        this.random = false;
        this.value = 1;
    }

    public load(data?: RecursivePartial<IOpacity>): void {
        if (data !== undefined) {
            if (data.animation !== undefined) {
                this.animation.load(data.animation);
            } else if (data.anim !== undefined) {
                this.anim.load(data.anim);
            }

            if (data.random !== undefined) {
                this.random = data.random;
            }

            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}

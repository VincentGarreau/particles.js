import {IParticlesColor} from "../../../Interfaces/Options/Particles/IParticlesColor";
import {IColor} from "../../../Interfaces/IColor";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class Color implements IParticlesColor {
    public value: string | IColor | string[];

    constructor() {
        this.value = "#fff";
    }

    public load(data?: RecursivePartial<IParticlesColor>): void {
        if (data !== undefined) {
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}

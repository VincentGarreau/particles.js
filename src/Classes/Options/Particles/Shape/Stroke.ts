import {IStroke} from "../../../../Interfaces/Options/Particles/Shape/IStroke";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Stroke implements IStroke {
    public color: string;
    public width: number;

    constructor() {
        this.color = "#ff0000";
        this.width = 0;
    }

    public load(data?: RecursivePartial<IStroke>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = data.color;
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}

import {IRepulse} from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Repulse implements IRepulse {
    public distance: number;
    public duration: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }

    public load(data?: RecursivePartial<IRepulse>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            if (data.duration !== undefined) {
                this.duration = data.duration;
            }
        }
    }
}

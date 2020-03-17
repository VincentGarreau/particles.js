import {ISlow} from "../../../../Interfaces/Options/Interactivity/Modes/ISlow";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Slow implements ISlow {
    public active: boolean;
    public factor: number;
    public radius: number;

    constructor() {
        this.active = false;
        this.factor = 1;
        this.radius = 0;
    }

    public load(data?: RecursivePartial<ISlow>): void {
        if (data !== undefined) {
            if (data.active !== undefined) {
                this.active = data.active;
            }

            if (data.factor !== undefined) {
                this.factor = data.factor;
            }

            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
        }
    }
}

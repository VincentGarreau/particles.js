import {ITrail} from "../../../Interfaces/Options/Particles/ITrail";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class Trail implements ITrail {
    public enable: boolean;
    public length: number;
    public fillColor: string;

    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = "#000000";
    }

    public load(data?: RecursivePartial<ITrail>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.fillColor !== undefined) {
                this.fillColor = data.fillColor;
            }

            if (data.length !== undefined) {
                this.length = data.length;
            }
        }
    }
}

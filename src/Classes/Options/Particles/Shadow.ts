import {IShadow} from "../../../Interfaces/Options/Particles/IShadow";
import {ICoordinates} from "../../../Interfaces/ICoordinates";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class Shadow implements IShadow {
    public blur: number;
    public color: string;
    public enable: boolean;
    public offset: ICoordinates;

    constructor() {
        this.blur = 0;
        this.color = "#000000";
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0,
        };
    }

    public load(data?: RecursivePartial<IShadow>): void {
        if (data !== undefined) {
            if (data.blur !== undefined) {
                this.blur = data.blur;
            }

            if (data.color !== undefined) {
                this.color = data.color;
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.offset !== undefined) {
                if (data.offset.x !== undefined) {
                    this.offset.x = data.offset.x;
                }

                if (data.offset.y !== undefined) {
                    this.offset.y = data.offset.y;
                }
            }
        }
    }
}

import {ILineLinkedShadow} from "../../../Interfaces/Options/Particles/ILineLinkedShadow";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class LineLinkedShadow implements ILineLinkedShadow {
    public blur: number;
    public color: string;
    public enable: boolean;

    constructor() {
        this.blur = 5;
        this.color = "lime";
        this.enable = false;
    }

    public load(data?: RecursivePartial<ILineLinkedShadow>): void {
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
        }
    }
}

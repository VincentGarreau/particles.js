import {ICharacterShape} from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class CharacterShape implements ICharacterShape {
    public fill: boolean;
    public font: string;
    public style: string;
    public value: string | string [];
    public weight: string;

    constructor() {
        this.fill = false;
        this.font = "Verdana";
        this.style = "";
        this.value = "*";
        this.weight = "400";
    }

    public load(data?: RecursivePartial<ICharacterShape>): void {
        if (data !== undefined) {
            if (data.fill !== undefined) {
                this.fill = data.fill;
            }

            if (data.font !== undefined) {
                this.font = data.font;
            }

            if (data.style !== undefined) {
                this.style = data.style;
            }

            if (data.value !== undefined) {
                this.value = data.value;
            }

            if (data.weight !== undefined) {
                this.weight = data.weight;
            }
        }
    }
}

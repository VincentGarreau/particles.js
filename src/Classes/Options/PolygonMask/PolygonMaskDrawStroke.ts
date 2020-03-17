import {IPolygonMaskDrawStroke} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    public color: string;
    public width: number;

    constructor() {
        this.color = "#ffffff";
        this.width = 0.5;
    }

    public load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
    }
}

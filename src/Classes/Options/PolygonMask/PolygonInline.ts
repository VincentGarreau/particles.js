import {IPolygonInline} from "../../../Interfaces/Options/PolygonMask/IPolygonInline";
import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class PolygonInline implements IPolygonInline {
    public arrangement: PolygonMaskInlineArrangement;

    constructor() {
        this.arrangement = PolygonMaskInlineArrangement.onePerPoint;
    }

    public load(data?: RecursivePartial<IPolygonInline>): void {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}

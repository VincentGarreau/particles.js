import {IPolygonMaskMove} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";
import {PolygonMaskMoveType} from "../../../Enums/PolygonMaskMoveType";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class Move implements IPolygonMaskMove {
    public radius: number;
    public type: PolygonMaskMoveType;

    constructor() {
        this.radius = 10;
        this.type = PolygonMaskMoveType.path;
    }

    public load(data?: RecursivePartial<IPolygonMaskMove>): void {
        if (data !== undefined) {
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }

            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}

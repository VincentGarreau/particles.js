import {IOptionLoader} from "../IOptionLoader";
import {PolygonMaskMoveType} from "../../../Enums/PolygonMaskMoveType";

export interface IPolygonMaskMove extends IOptionLoader<IPolygonMaskMove> {
    radius: number;
    type: PolygonMaskMoveType;
}

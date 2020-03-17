import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import {IOptionLoader} from "../IOptionLoader";

export interface IPolygonInline extends IOptionLoader<IPolygonInline> {
    arrangement: PolygonMaskInlineArrangement
}

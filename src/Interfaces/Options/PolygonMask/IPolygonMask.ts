import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {IPolygonMaskDraw} from "./IPolygonMaskDraw";
import {IPolygonMaskMove} from "./IPolygonMaskMove";
import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import {IOptionLoader} from "../IOptionLoader";
import {IPolygonInline} from "./IPolygonInline";

export interface IPolygonMask extends IOptionLoader<IPolygonMask> {
    draw: IPolygonMaskDraw;
    enable: boolean;
    inline: IPolygonInline;

    /**
     * @deprecated the inlineArrangement is deprecated, please use the new inline.arrangement property
     */
    inlineArrangement: PolygonMaskInlineArrangement;

    move: IPolygonMaskMove;
    scale: number;
    type: PolygonMaskType;
    url: string;
}

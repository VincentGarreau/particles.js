import {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import {IPolygonMaskDrawStroke} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import {Messages} from "../../Utils/Messages";
import {PolygonMaskDrawStroke} from "./PolygonMaskDrawStroke";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class Draw implements IPolygonMaskDraw {
    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    get lineWidth(): number {
        Messages.deprecated("polygon.draw.lineWidth", "polygon.draw.stroke.width");

        return this.stroke.width;
    }

    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    set lineWidth(value: number) {
        Messages.deprecated("polygon.draw.lineWidth", "polygon.draw.stroke.width");

        this.stroke.width = value;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    get lineColor(): string {
        Messages.deprecated("polygon.draw.lineColor", "polygon.draw.stroke.color");

        return this.stroke.color;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    set lineColor(value: string) {
        Messages.deprecated("polygon.draw.lineColor", "polygon.draw.stroke.color");

        this.stroke.color = value;
    }

    public enable: boolean;
    public stroke: IPolygonMaskDrawStroke;

    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke();
    }

    public load(data?: RecursivePartial<IPolygonMaskDraw>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.stroke !== undefined) {
                this.stroke.load(data.stroke);
            } else {
                if (data.lineColor !== undefined) {
                    this.lineColor = data.lineColor;
                }

                if (data.lineWidth !== undefined) {
                    this.lineWidth = data.lineWidth;
                }
            }
        }
    }
}

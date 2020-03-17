import {IImageShape} from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import {Messages} from "../../../Utils/Messages";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class ImageShape implements IImageShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     */
    public get replace_color(): boolean {
        Messages.deprecated("particles.shape.image.replace_color", "particles.shape.image.replaceColor");

        return this.replaceColor;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     * @param value
     */
    public set replace_color(value: boolean) {
        Messages.deprecated("particles.shape.image.replace_color", "particles.shape.image.replaceColor");

        this.replaceColor = value;
    }

    public height: number;
    public replaceColor: boolean;
    public src: string;
    public width: number;

    constructor() {
        this.height = 100;
        this.replaceColor = true;
        this.src = "";
        this.width = 100;
    }

    public load(data?: RecursivePartial<IImageShape>): void {
        if (data !== undefined) {
            if (data.height !== undefined) {
                this.height = data.height;
            }

            if (data.replaceColor !== undefined) {
                this.replaceColor = data.replaceColor;
            } else if (data.replace_color !== undefined) {
                this.replace_color = data.replace_color;
            }

            if (data.src !== undefined) {
                this.src = data.src;
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}

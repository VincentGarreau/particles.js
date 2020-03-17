import {IPolygonShape} from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import {Messages} from "../../../Utils/Messages";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class PolygonShape implements IPolygonShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     */
    public get nb_sides(): number {
        Messages.deprecated("particles.shape.polygon.nb_sides", "particles.shape.polygon.sides");

        return this.sides;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     * @param value
     */
    public set nb_sides(value: number) {
        Messages.deprecated("particles.shape.polygon.nb_sides", "particles.shape.polygon.sides");

        this.sides = value;
    }

    public sides: number;

    constructor() {
        this.sides = 5;
    }

    public load(data?: RecursivePartial<IPolygonShape>): void {
        if (data !== undefined) {
            if (data.sides !== undefined) {
                this.sides = data.sides;
            } else if (data.nb_sides !== undefined) {
                this.nb_sides = data.nb_sides;
            }
        }
    }
}

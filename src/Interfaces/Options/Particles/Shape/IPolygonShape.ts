import {IOptionLoader} from "../../IOptionLoader";

export interface IPolygonShape extends IOptionLoader<IPolygonShape> {
    /**
     * @deprecated use the new sides instead
     */
    nb_sides: number;

    sides: number;
}

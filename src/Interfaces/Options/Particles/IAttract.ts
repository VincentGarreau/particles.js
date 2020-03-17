import {ICoordinates} from "../../ICoordinates";
import {IOptionLoader} from "../IOptionLoader";

export interface IAttract extends IOptionLoader<IAttract> {
    enable: boolean;

    /**
     * @deprecated use the new rotate.x instead
     */
    rotateX: number;

    /**
     * @deprecated use the new rotate.y instead
     */
    rotateY: number;

    rotate: ICoordinates;
}

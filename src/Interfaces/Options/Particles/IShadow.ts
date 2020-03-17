import {ICoordinates} from "../../ICoordinates";
import {IOptionLoader} from "../IOptionLoader";

export interface IShadow extends IOptionLoader<IShadow> {
    blur: number;
    color: string;
    enable: boolean;
    offset: ICoordinates;
}

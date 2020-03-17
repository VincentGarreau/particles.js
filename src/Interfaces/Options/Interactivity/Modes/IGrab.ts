import {IGrabLineLinked} from "./IGrabLineLinked";
import {IOptionLoader} from "../../IOptionLoader";

export interface IGrab extends IOptionLoader<IGrab> {
    distance: number;

    /**
     * @deprecated use the new lineLinked instead
     */
    line_linked: IGrabLineLinked;

    lineLinked: IGrabLineLinked;
}

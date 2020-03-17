import {IOptionLoader} from "../IOptionLoader";
import {ILineLinkedShadow} from "./ILineLinkedShadow";

export interface ILineLinked extends IOptionLoader<ILineLinked> {
    blink: boolean;
    color: string;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: ILineLinkedShadow;
    width: number;
}

import {HoverMode} from "../../../../Enums/Modes/HoverMode";
import {IParallax} from "./IParallax";
import {IOptionLoader} from "../../IOptionLoader";

export interface IHoverEvent extends IOptionLoader<IHoverEvent> {
    enable: boolean;
    mode: HoverMode | HoverMode[];
    parallax: IParallax;
}

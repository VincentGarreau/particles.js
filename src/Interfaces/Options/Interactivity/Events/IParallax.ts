import {IOptionLoader} from "../../IOptionLoader";

export interface IParallax extends IOptionLoader<IParallax> {
    enable: boolean;
    force: number;
    smooth: number;
}

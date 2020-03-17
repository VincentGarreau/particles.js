import {IOptionLoader} from "../IOptionLoader";

export interface IRotateAnimation extends IOptionLoader<IRotateAnimation> {
    enable: boolean;
    speed: number;
    sync: boolean;
}

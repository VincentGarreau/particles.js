import {IOptionLoader} from "../IOptionLoader";

export interface IOpacityAnimation extends IOptionLoader<IOpacityAnimation> {
    enable: boolean;
    speed: number;

    /**
     * @deprecated use the new minimumValue instead
     */
    opacity_min: number;

    minimumValue: number;
    sync: boolean;
}

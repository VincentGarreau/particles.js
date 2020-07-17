import {IOpacityAnimation} from "./IOpacityAnimation";
import {IOptionLoader} from "../IOptionLoader";

export interface IOpacity extends IOptionLoader<IOpacity> {
    value: number;
    random: boolean;

    /**
     * @deprecated use the new animation instead
     */
    anim: IOpacityAnimation;

    animation: IOpacityAnimation;
}

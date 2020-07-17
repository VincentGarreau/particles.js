import {ISizeAnimation} from "./ISizeAnimation";
import {IOptionLoader} from "../IOptionLoader";

export interface ISize extends IOptionLoader<ISize> {
    /**
     * @deprecated use the new animation instead
     */
    anim: ISizeAnimation;

    animation: ISizeAnimation;
    random: boolean;
    value: number;
}

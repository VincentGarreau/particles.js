import {IOptionLoader} from "../../IOptionLoader";

export interface IBubble extends IOptionLoader<IBubble> {
    distance: number;
    duration: number;
    opacity: number;
    size: number;
}

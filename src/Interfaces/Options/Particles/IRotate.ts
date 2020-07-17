import {IRotateAnimation} from "./IRotateAnimation";
import {IOptionLoader} from "../IOptionLoader";
import {RotateDirection} from "../../../Enums/RotateDirection";

export interface IRotate extends IOptionLoader<IRotate> {
    animation: IRotateAnimation;
    random: boolean;
    value: number;
    direction: RotateDirection;
}

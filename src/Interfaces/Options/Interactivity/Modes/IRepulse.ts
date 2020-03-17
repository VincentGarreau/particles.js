import {IOptionLoader} from "../../IOptionLoader";

export interface IRepulse extends IOptionLoader<IRepulse> {
    distance: number;
    duration: number;
}

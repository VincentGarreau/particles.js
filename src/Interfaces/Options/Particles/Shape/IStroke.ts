import {IOptionLoader} from "../../IOptionLoader";

export interface IStroke extends IOptionLoader<IStroke> {
    width: number;
    color: string;
}

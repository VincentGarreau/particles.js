import {IOptionLoader} from "../../IOptionLoader";

export interface ISlow extends IOptionLoader<ISlow> {
    active: boolean;
    radius: number;
    factor: number;
}

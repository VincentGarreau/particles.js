import {IOptionLoader} from "../IOptionLoader";

export interface ITrail extends IOptionLoader<ITrail> {
    fillColor: string;
    enable: boolean;
    length: number;
}

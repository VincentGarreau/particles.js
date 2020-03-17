import {IOptionLoader} from "../IOptionLoader";

export interface ILineLinkedShadow extends IOptionLoader<ILineLinkedShadow> {
    blur: number;
    color: string;
    enable: boolean;
}

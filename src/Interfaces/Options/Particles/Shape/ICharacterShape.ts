import {IOptionLoader} from "../../IOptionLoader";

export interface ICharacterShape extends IOptionLoader<ICharacterShape> {
    value: string | string[];
    font: string;
    style: string;
    weight: string;
    fill: boolean;
}

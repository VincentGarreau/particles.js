import {IOptionLoader} from "../../IOptionLoader";

export interface IImageShape extends IOptionLoader<IImageShape> {
    /**
     * @deprecated use the new replaceColor instead
     */
    replace_color: boolean;

    replaceColor: boolean;

    src: string;
    width: number;
    height: number;
}

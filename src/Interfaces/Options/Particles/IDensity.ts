import {IOptionLoader} from "../IOptionLoader";

export interface IDensity extends IOptionLoader<IDensity> {
    enable: boolean;

    /**
     * @deprecated use the new area instead
     */
    value_area: number;

    area: number;
}

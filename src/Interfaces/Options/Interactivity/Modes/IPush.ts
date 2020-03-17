import {IOptionLoader} from "../../IOptionLoader";

export interface IPush extends IOptionLoader<IPush> {
    /**
     * @deprecated use the new quantity instead
     */
    particles_nb: number;

    quantity: number;
}

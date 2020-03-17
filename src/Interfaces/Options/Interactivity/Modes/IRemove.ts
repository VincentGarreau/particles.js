import {IOptionLoader} from "../../IOptionLoader";

export interface IRemove extends IOptionLoader<IRemove> {
    /**
     * @deprecated use the new quantity instead
     */
    particles_nb: number;

    quantity: number;
}

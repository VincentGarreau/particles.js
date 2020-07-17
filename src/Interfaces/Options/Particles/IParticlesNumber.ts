import {IDensity} from "./IDensity";
import {IOptionLoader} from "../IOptionLoader";

export interface IParticlesNumber extends IOptionLoader<IParticlesNumber> {
    density: IDensity;
    limit: number;

    /**
     * @deprecated the property max is deprecated, use the new limit instead
     */
    max: number;

    value: number;
}

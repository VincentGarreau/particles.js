import {IColor} from "../../IColor";
import {IOptionLoader} from "../IOptionLoader";

export interface IParticlesColor extends IOptionLoader<IParticlesColor> {
    value: string | IColor | string[];
}

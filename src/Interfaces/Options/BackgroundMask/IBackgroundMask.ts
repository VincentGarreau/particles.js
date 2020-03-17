import {IOptionLoader} from "../IOptionLoader";
import {IParticlesColor} from "../Particles/IParticlesColor";

export interface IBackgroundMask extends IOptionLoader<IBackgroundMask> {
    cover?: IParticlesColor;
    enable: boolean;
}

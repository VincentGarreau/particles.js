import {IAttract} from "./IAttract";
import {MoveDirection} from "../../../Enums/MoveDirection";
import {OutMode} from "../../../Enums/OutMode";
import {IOptionLoader} from "../IOptionLoader";
import {ITrail} from "./ITrail";

export interface IMove extends IOptionLoader<IMove> {
    attract: IAttract;

    /**
     * @deprecated use the new collisions instead
     */
    bounce: boolean;

    collisions: boolean;
    direction: MoveDirection;
    enable: boolean;

    /**
     * @deprecated use the new outMode instead
     */
    out_mode: OutMode;

    outMode: OutMode;
    random: boolean;
    speed: number;
    straight: boolean;
    trail: ITrail;
}

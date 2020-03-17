import {IBubble} from "./IBubble";
import {IConnect} from "./IConnect";
import {IGrab} from "./IGrab";
import {IPush} from "./IPush";
import {IRemove} from "./IRemove";
import {IRepulse} from "./IRepulse";
import {ISlow} from "./ISlow";
import {IOptionLoader} from "../../IOptionLoader";

export interface IModes extends IOptionLoader<IModes> {
    bubble: IBubble;
    connect: IConnect;
    grab: IGrab;
    push: IPush;
    remove: IRemove;
    repulse: IRepulse;
    slow: ISlow;
}

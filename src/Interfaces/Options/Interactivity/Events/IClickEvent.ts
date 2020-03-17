import {ClickMode} from "../../../../Enums/Modes/ClickMode";
import {IOptionLoader} from "../../IOptionLoader";

export interface IClickEvent extends IOptionLoader<IClickEvent> {
    enable: boolean;
    mode: ClickMode | ClickMode[];
}

import {DivMode} from "../../../../Enums/Modes/DivMode";
import {IOptionLoader} from "../../IOptionLoader";

export interface IDivEvent extends IOptionLoader<IDivEvent> {
    enable: boolean;
    mode: DivMode | DivMode[];

    /**
     * @deprecated use the new elementId instead
     */
    el: string;

    elementId: string;
}

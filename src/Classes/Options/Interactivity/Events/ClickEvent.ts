import {IClickEvent} from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import {ClickMode} from "../../../../Enums/Modes/ClickMode";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class ClickEvent implements IClickEvent {
    public enable: boolean;
    public mode: ClickMode | ClickMode[];

    constructor() {
        this.enable = true;
        this.mode = ClickMode.push;
    }

    public load(data?: RecursivePartial<IClickEvent>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
        }
    }
}

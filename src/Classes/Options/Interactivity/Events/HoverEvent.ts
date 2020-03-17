import {IHoverEvent} from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import {HoverMode} from "../../../../Enums/Modes/HoverMode";
import {Parallax} from "./Parallax";
import {IParallax} from "../../../../Interfaces/Options/Interactivity/Events/IParallax";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class HoverEvent implements IHoverEvent {
    public enable: boolean;
    public mode: HoverMode | HoverMode[];
    public parallax: IParallax;

    constructor() {
        this.enable = true;
        this.mode = HoverMode.grab;
        this.parallax = new Parallax();
    }

    public load(data?: RecursivePartial<IHoverEvent>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.mode !== undefined) {
                this.mode = data.mode;
            }

            this.parallax.load(data.parallax);
        }
    }
}

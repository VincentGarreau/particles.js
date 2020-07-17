import {IEvents} from "../../../../Interfaces/Options/Interactivity/Events/IEvents";
import {ClickEvent} from "./ClickEvent";
import {IDivEvent} from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import {IHoverEvent} from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import {DivEvent} from "./DivEvent";
import {HoverEvent} from "./HoverEvent";
import {IClickEvent} from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import {Messages} from "../../../Utils/Messages";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Events implements IEvents {
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    public get onclick(): IClickEvent {
        Messages.deprecated("interactivity.events.onclick", "interactivity.events.onClick");

        return this.onClick;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    public set onclick(value: IClickEvent) {
        Messages.deprecated("interactivity.events.onclick", "interactivity.events.onClick");

        this.onClick = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */
    public get ondiv(): IDivEvent {
        Messages.deprecated("interactivity.events.ondiv", "interactivity.events.onDiv");

        return this.onDiv;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    public set ondiv(value: IDivEvent) {
        Messages.deprecated("interactivity.events.ondiv", "interactivity.events.onDiv");

        this.onDiv = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */
    public get onhover(): IHoverEvent {
        Messages.deprecated("interactivity.events.onhover", "interactivity.events.onHover");

        return this.onHover;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    public set onhover(value: IHoverEvent) {
        Messages.deprecated("interactivity.events.onhover", "interactivity.events.onHover");

        this.onHover = value;
    }

    public onClick: IClickEvent;
    public onDiv: IDivEvent;
    public onHover: IHoverEvent;
    public resize: boolean;

    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = true;
    }

    public load(data?: RecursivePartial<IEvents>): void {
        if (data !== undefined) {
            if (data.onClick !== undefined) {
                this.onClick.load(data.onClick);
            } else if (data.onclick !== undefined) {
                this.onclick.load(data.onclick);
            }

            if (data.onDiv !== undefined) {
                this.onDiv.load(data.onDiv);
            } else if (data.ondiv !== undefined) {
                this.ondiv.load(data.ondiv);
            }

            if (data.onHover !== undefined) {
                this.onHover.load(data.onHover);
            } else if (data.onhover !== undefined) {
                this.onhover.load(data.onhover);
            }

            if (data.resize !== undefined) {
                this.resize = data.resize;
            }
        }
    }
}

import {IConnect} from "../../../../Interfaces/Options/Interactivity/Modes/IConnect";
import {ConnectLineLinked} from "./ConnectLineLinked";
import {IConnectLineLinked} from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";
import {Messages} from "../../../Utils/Messages";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Connect implements IConnect {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): IConnectLineLinked {
        Messages.deprecated("interactivity.modes.connect.line_linked", "interactivity.modes.connect.lineLinked");

        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: IConnectLineLinked) {
        Messages.deprecated("interactivity.modes.connect.line_linked", "interactivity.modes.connect.lineLinked");

        this.lineLinked = value;
    }

    public distance: number;
    public lineLinked: IConnectLineLinked;
    public radius: number;

    constructor() {
        this.distance = 80;
        this.lineLinked = new ConnectLineLinked();
        this.radius = 60;
    }

    public load(data?: RecursivePartial<IConnect>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            if (data.lineLinked !== undefined) {
                this.lineLinked.load(data.lineLinked);
            } else if (data.line_linked !== undefined) {
                this.line_linked.load(data.line_linked);
            }

            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
        }
    }
}

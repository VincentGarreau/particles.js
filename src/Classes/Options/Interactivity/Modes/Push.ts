import {IPush} from "../../../../Interfaces/Options/Interactivity/Modes/IPush";
import {Messages} from "../../../Utils/Messages";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Push implements IPush {
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    public get particles_nb(): number {
        Messages.deprecated("interactivity.modes.push.particles_nb", "interactivity.modes.push.quantity");

        return this.quantity;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    public set particles_nb(value: number) {
        Messages.deprecated("interactivity.modes.push.particles_nb", "interactivity.modes.push.quantity");

        this.quantity = value;
    }

    public quantity: number;

    constructor() {
        this.quantity = 4;
    }

    public load(data?: RecursivePartial<IPush>): void {
        if (data !== undefined) {
            if (data.quantity !== undefined) {
                this.quantity = data.quantity;
            } else if (data.particles_nb !== undefined) {
                this.particles_nb = data.particles_nb;
            }
        }
    }
}

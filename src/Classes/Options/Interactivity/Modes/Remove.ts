import {IRemove} from "../../../../Interfaces/Options/Interactivity/Modes/IRemove";
import {Messages} from "../../../Utils/Messages";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Remove implements IRemove {
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    public get particles_nb(): number {
        Messages.deprecated("interactivity.modes.remove.particles_nb", "interactivity.modes.remove.quantity");

        return this.quantity;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    public set particles_nb(value: number) {
        Messages.deprecated("interactivity.modes.remove.particles_nb", "interactivity.modes.remove.quantity");

        this.quantity = value;
    }

    public quantity: number;

    constructor() {
        this.quantity = 2;
    }

    public load(data?: RecursivePartial<IRemove>): void {
        if (data !== undefined) {
            if (data.quantity !== undefined) {
                this.quantity = data.quantity;
            } else if (data.particles_nb !== undefined) {
                this.particles_nb = data.particles_nb;
            }
        }
    }
}

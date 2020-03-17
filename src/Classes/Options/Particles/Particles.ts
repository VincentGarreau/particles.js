import {IParticles} from "../../../Interfaces/Options/Particles/IParticles";
import {Color} from "./Color";
import {LineLinked} from "./LineLinked";
import {Move} from "./Move";
import {ParticlesNumber} from "./ParticlesNumber";
import {Opacity} from "./Opacity";
import {Shape} from "./Shape/Shape";
import {ParticlesSize} from "./ParticlesSize";
import {IParticlesColor} from "../../../Interfaces/Options/Particles/IParticlesColor";
import {ILineLinked} from "../../../Interfaces/Options/Particles/ILineLinked";
import {IMove} from "../../../Interfaces/Options/Particles/IMove";
import {IParticlesNumber} from "../../../Interfaces/Options/Particles/IParticlesNumber";
import {IOpacity} from "../../../Interfaces/Options/Particles/IOpacity";
import {IShape} from "../../../Interfaces/Options/Particles/Shape/IShape";
import {ISize} from "../../../Interfaces/Options/Particles/ISize";
import {Messages} from "../../Utils/Messages";
import {IRotate} from "../../../Interfaces/Options/Particles/IRotate";
import {Rotate} from "./Rotate";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class Particles implements IParticles {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): ILineLinked {
        Messages.deprecated("particles.line_linked", "particles.lineLinked");

        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: ILineLinked) {
        Messages.deprecated("particles.line_linked", "particles.lineLinked");

        this.lineLinked = value;
    }

    public color: IParticlesColor;
    public lineLinked: ILineLinked;
    public move: IMove;
    public number: IParticlesNumber;
    public opacity: IOpacity;
    public rotate: IRotate;
    public shape: IShape;
    public size: ISize;

    // public shadow: IShadow;

    constructor() {
        this.color = new Color();
        this.lineLinked = new LineLinked();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.rotate = new Rotate();
        this.shape = new Shape();
        this.size = new ParticlesSize();
        //this.shadow = new Shadow();
    }

    public load(data?: RecursivePartial<IParticles>): void {
        if (data !== undefined) {
            this.color.load(data.color);

            if (data.lineLinked !== undefined) {
                this.lineLinked.load(data.lineLinked);
            } else if (data.line_linked !== undefined) {
                this.line_linked.load(data.line_linked);
            }

            this.move.load(data.move);
            this.number.load(data.number);
            this.opacity.load(data.opacity);
            this.rotate.load(data.rotate);
            this.shape.load(data.shape);
            this.size.load(data.size);
        }
    }
}


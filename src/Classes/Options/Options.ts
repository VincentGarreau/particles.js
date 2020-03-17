import {IOptions} from "../../Interfaces/Options/IOptions";
import {Interactivity} from "./Interactivity/Interactivity";
import {Particles} from "./Particles/Particles";
import {PolygonMask} from "./PolygonMask/PolygonMask";
import {IInteractivity} from "../../Interfaces/Options/Interactivity/IInteractivity";
import {IParticles} from "../../Interfaces/Options/Particles/IParticles";
import {IPolygonMask} from "../../Interfaces/Options/PolygonMask/IPolygonMask";
import {Messages} from "../Utils/Messages";
import {IBackgroundMask} from "../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import {BackgroundMask} from "./BackgroundMask/BackgroundMask";
import {RecursivePartial} from "../../Types/RecursivePartial";

export class Options implements IOptions {
    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     */
    public get fps_limit(): number {
        Messages.deprecated("fps_limit", "fpsLimit");

        return this.fpsLimit;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     * @param value
     */
    public set fps_limit(value: number) {
        Messages.deprecated("fps_limit", "fpsLimit");

        this.fpsLimit = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     */
    public get retina_detect(): boolean {
        Messages.deprecated("retina_detect", "detectsRetina");

        return this.detectRetina;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    public set retina_detect(value: boolean) {
        Messages.deprecated("retina_detect", "detectsRetina");

        this.detectRetina = value;
    }

    public detectRetina: boolean;
    public fpsLimit: number;
    public interactivity: IInteractivity;
    public particles: IParticles;
    public polygon: IPolygonMask;
    public backgroundMask: IBackgroundMask;
    public pauseOnBlur: boolean;

    constructor() {
        this.detectRetina = false;
        this.fpsLimit = 60;
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.polygon = new PolygonMask();
        this.backgroundMask = new BackgroundMask();
        this.pauseOnBlur = true;
    }

    public load(data: RecursivePartial<IOptions>): void {
        if (data !== undefined) {
            if (data.detectRetina !== undefined) {
                this.detectRetina = data.detectRetina;
            } else if (data.retina_detect !== undefined) {
                this.retina_detect = data.retina_detect;
            }

            if (data.fpsLimit !== undefined) {
                this.fpsLimit = data.fpsLimit;
            } else if (data.fps_limit !== undefined) {
                this.fps_limit = data.fps_limit;
            }

            if (data.pauseOnBlur !== undefined) {
                this.pauseOnBlur = data.pauseOnBlur;
            }

            this.interactivity.load(data.interactivity);
            this.particles.load(data.particles);
            this.polygon.load(data.polygon);
            this.backgroundMask.load(data.backgroundMask);
        }
    }
}

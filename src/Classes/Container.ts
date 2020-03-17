"use strict";

import {Canvas} from "./Canvas";
import {EventListeners} from "./Utils/EventListeners";
import {IRepulse} from "../Interfaces/IRepulse";
import {IBubble} from "../Interfaces/IBubble";
import {IImage} from "../Interfaces/IImage";
import {IContainerInteractivity} from "../Interfaces/IContainerInteractivity";
import {Particles} from "./Particles";
import {Retina} from "./Retina";
import {ShapeType} from "../Enums/ShapeType";
import {PolygonMask} from "./PolygonMask";
import {ImageShape} from "./Options/Particles/Shape/ImageShape";
import {IOptions} from "../Interfaces/Options/IOptions";
import {Drawer} from "./Drawer";
import {RecursivePartial} from "../Types/RecursivePartial";
import {Options} from "./Options/Options";
import {Utils} from "./Utils/Utils";

declare global {
    interface Window {
        customRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        customCancelRequestAnimationFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
    }
}

/* ---------- global functions - vendors ------------ */

window.customRequestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60));
})();

window.customCancelRequestAnimationFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 */
export class Container {
    public readonly sourceOptions?: RecursivePartial<IOptions>;
    public readonly id: string;
    public interactivity: IContainerInteractivity;
    public options: IOptions;
    public retina: Retina;
    public canvas: Canvas;
    public particles: Particles;
    public polygon: PolygonMask;
    public bubble: IBubble;
    public repulse: IRepulse;
    public images: IImage[];
    public lastFrameTime: number;
    public pageHidden: boolean;
    public drawer: Drawer;
    public started: boolean;

    private paused: boolean;
    private drawAnimationFrame?: number;
    private eventListeners: EventListeners;

    constructor(id: string, params?: RecursivePartial<IOptions>) {
        this.started = false;
        this.id = id;
        this.paused = true;
        this.sourceOptions = params;
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(this);
        this.polygon = new PolygonMask(this);
        this.drawer = new Drawer(this);
        this.interactivity = {
            mouse: {},
        };
        this.images = [];
        this.bubble = {};
        this.repulse = {};

        /* tsParticles variables with default values */
        this.options = new Options();

        /* params settings */
        if (this.sourceOptions) {
            this.options.load(this.sourceOptions);
        }

        /* ---------- tsParticles - start ------------ */
        this.eventListeners = new EventListeners(this);
    }

    public static requestFrame(callback: FrameRequestCallback): number {
        return window.customRequestAnimationFrame(callback);
    }

    public static cancelAnimation(handle: number): void {
        window.cancelAnimationFrame(handle);
    }

    public play(): void {
        if (this.paused) {
            this.lastFrameTime = performance.now();
            this.paused = false;
        }

        this.drawAnimationFrame = Container.requestFrame((t) => this.update(t));
    }

    public pause(): void {
        if (this.drawAnimationFrame !== undefined) {
            Container.cancelAnimation(this.drawAnimationFrame);

            delete this.drawAnimationFrame;
            this.paused = true;
        }
    }

    /* ---------- tsParticles functions - vendors ------------ */

    public densityAutoParticles(): void {
        if (!(this.canvas.element && this.options.particles.number.density.enable)) {
            return;
        }

        let area = this.canvas.element.width * this.canvas.element.height / 1000;
        if (this.retina.isRetina) {
            area /= this.retina.pxRatio * 2;
        }
        //const area = this.retina.particlesDensityArea;
        const optParticlesNumber = this.options.particles.number.value;
        const density = this.options.particles.number.density.area;
        const particlesNumber = area * optParticlesNumber / density;
        const missingParticles = this.particles.array.length - particlesNumber;

        if (missingParticles < 0) {
            this.particles.push(Math.abs(missingParticles));
        } else {
            this.particles.remove(missingParticles);
        }
    }

    public destroy(): void {
        this.stop();

        this.retina.reset();
        this.canvas.destroy();

        delete this.interactivity;
        delete this.options;
        delete this.retina;
        delete this.canvas;
        delete this.particles;
        delete this.polygon;
        delete this.bubble;
        delete this.repulse;
        delete this.images;
        delete this.drawer;
        delete this.eventListeners;
    }

    public exportImg(): void {
        if (this.canvas.element) {
            window.open(this.canvas.element.toDataURL("image/png"), "_blank");
        }
    }

    public async loadImg(image: IImage, optionsImage: ImageShape): Promise<void> {
        image.error = false;

        if (optionsImage.src) {
            const img = new Image();

            img.addEventListener("load", () => {
                image.obj = img;

                this.checkBeforeDraw();
            });

            img.src = optionsImage.src;
        } else {
            console.error("Error tsParticles - No image.src");

            image.error = true;
        }
    }

    public async refresh(): Promise<void> {
        /* init all */
        //if (this.checkAnimationFrame) {
        //    Container.cancelAnimation(this.checkAnimationFrame);
        //}

        /* restart */
        this.stop();
        await this.start();
    }

    public stop(): void {
        if (!this.started) {
            return;
        }

        this.started = false;

        this.eventListeners.removeEventsListeners();
        this.pause();

        this.images = [];
        this.particles.clear();
        this.retina.reset();
        this.canvas.clear();

        delete this.particles.lineLinkedColor;
        delete this.polygon.raw;
        delete this.polygon.path;
        delete this.polygon.svg;
    }

    public async start(): Promise<void> {
        if (this.started) {
            return;
        }

        this.started = true;

        this.eventListeners.addEventsListeners();

        /* If is set the url of svg element, load it and parse into raw polygon data,
         * works only with single path SVG
         */
        if (this.options.polygon.enable && this.options.polygon.url) {
            this.polygon.raw = await this.polygon.parseSvgPathToPolygon(this.options.polygon.url);
        }

        if (Utils.isInArray(ShapeType.char, this.options.particles.shape.type) ||
            Utils.isInArray(ShapeType.character, this.options.particles.shape.type)) {
            if (this.options.particles.shape.character instanceof Array) {
                for (const character of this.options.particles.shape.character) {
                    await Utils.loadFont(character);
                }
            } else {
                const character = this.options.particles.shape.character;
                await Utils.loadFont(character);
            }
        }

        if (this.options.particles.shape.type === ShapeType.image) {
            if (this.options.particles.shape.image instanceof Array) {
                for (const optionsImage of this.options.particles.shape.image) {
                    const src = optionsImage.src;
                    const image: IImage = {error: false};

                    image.type = src.substr(src.length - 3);

                    await this.loadImg(image, optionsImage);

                    this.images.push(image);
                }
            } else {
                const optionsImage = this.options.particles.shape.image;
                const src = optionsImage.src;
                const image: IImage = {error: false};

                image.type = src.substr(src.length - 3);

                await this.loadImg(image, optionsImage);

                this.images.push(image);
            }
        } else {
            this.checkBeforeDraw();
        }
    }

    private update(timestamp: DOMHighResTimeStamp): void {
        this.drawer.draw(timestamp);
    }

    private init(): void {
        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();
        this.particles.init();
        this.densityAutoParticles();
    }

    private checkBeforeDraw(): void {
        if (this.options.particles.shape.type === ShapeType.image) {
            //if (this.checkAnimationFrame) {
            //    Container.cancelAnimation(this.checkAnimationFrame);
            //}

            if (this.images.every((img) => img.error)) {
                return;
            }
        }

        this.init();
        this.play();
    }
}

"use strict";

import {Constants} from "./Utils/Constants";
import {Container} from "./Container";
import {IDimension} from "../Interfaces/IDimension";
import {Utils} from "./Utils/Utils";
import {IRgb} from "../Interfaces/IRgb";
import {Particle} from "./Particle";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {CanvasUtils} from "./Utils/CanvasUtils";

/**
 * Canvas manager
 */
export class Canvas {
    /**
     * The particles canvas
     */
    public element?: HTMLCanvasElement;
    /**
     * The particles canvas dimension
     */
    public readonly dimension: IDimension;

    /**
     * The parent container
     */
    private readonly container: Container;

    /**
     * The particles canvas context
     */
    private context: CanvasRenderingContext2D | null;

    private generatedCanvas: boolean;

    /**
     * Constructor of canvas manager
     * @param container the parent container
     */
    constructor(container: Container) {
        this.container = container;
        this.dimension = {
            height: 0,
            width: 0,
        };

        this.context = null;
        this.generatedCanvas = false;
    }

    /* ---------- tsParticles functions - canvas ------------ */
    /**
     * Initializes the canvas element
     */
    public init(): void {
        this.size();
        this.paint();
    }

    public loadCanvas(canvas: HTMLCanvasElement, generatedCanvas?: boolean): void {
        if (!canvas.className) {
            canvas.className = Constants.canvasClass;
        }

        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.generatedCanvas = generatedCanvas ?? false;
        this.element = canvas;
        this.dimension.height = canvas.offsetHeight;
        this.dimension.width = canvas.offsetWidth;
        this.context = this.element.getContext("2d");
        this.container.retina.init();
    }

    public destroy(): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        if (this.context) {
            CanvasUtils.clear(this.context, this.dimension);
        }
    }

    /**
     * Calculates the size of the canvas
     */
    public size(): void {
        if (this.element) {
            this.element.width = this.dimension.width;
            this.element.height = this.dimension.height;
        }
    }

    /**
     * Paints the canvas background
     */
    public paint(): void {
        const container = this.container;
        const options = container.options;

        if (this.context) {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                const color = Utils.getParticleColor(options.backgroundMask.cover);

                if (color) {
                    this.paintBase(Utils.getStyleFromColor(color));
                } else {
                    this.paintBase();
                }
            } else {
                this.paintBase();
            }
        }
    }

    /**
     * Clears the canvas content
     */
    public clear(): void {
        const container = this.container;
        const options = container.options;
        const trail = options.particles.move.trail;
        const fillColor = Utils.hexToRgb(trail.fillColor);

        if (options.backgroundMask.enable) {
            this.paint();
        } else if (trail.enable && trail.length > 0 && fillColor) {
            this.paintBase(`rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b},${1 / trail.length}`);
        } else {
            if (this.context) {
                CanvasUtils.clear(this.context, this.dimension);
            }
        }
    }

    public isPointInPath(path: Path2D, point: ICoordinates): boolean {
        return this.context?.isPointInPath(path, point.x, point.y) ?? false;
    }

    public drawPolygonMask(rawData: ICoordinates[]): void {
        const container = this.container;
        const options = container.options;
        const context = this.context;
        const polygonDraw = options.polygon.draw;

        if (context) {
            CanvasUtils.drawPolygonMask(context, rawData, polygonDraw.stroke);
        }
    }

    public drawLinkedLine(p1: Particle, p2: Particle, pos1: ICoordinates, pos2: ICoordinates, opacity: number): void {
        const container = this.container;
        const options = container.options;

        const ctx = this.context;

        if (!ctx) {
            return;
        }

        let colorLine: IRgb | undefined;

        /*
         * particles connecting line color:
         *
         *  random: in blink mode : in every frame refresh the color would change
         *          hence resulting blinking of lines
         *  mid: in consent mode: sample particles color and get a mid level color
         *                        from those two for the connecting line color
         */

        if (container.particles.lineLinkedColor === "random") {
            colorLine = Utils.getRandomColorRGBA();
        } else if (container.particles.lineLinkedColor == "mid" && p1.color && p2.color) {
            const sourceColor = p1.color;
            const destColor = p2.color;

            colorLine = {
                b: Math.floor(Utils.mixComponents(sourceColor.b, destColor.b, p1.radius, p2.radius)),
                g: Math.floor(Utils.mixComponents(sourceColor.g, destColor.g, p1.radius, p2.radius)),
                r: Math.floor(Utils.mixComponents(sourceColor.r, destColor.r, p1.radius, p2.radius)),
            };
        } else {
            colorLine = container.particles.lineLinkedColor as IRgb;
        }

        const width = container.retina.lineLinkedWidth;

        CanvasUtils.drawLineLinked(ctx,
            width,
            pos1,
            pos2,
            options.backgroundMask.enable,
            colorLine,
            opacity,
            options.particles.lineLinked.shadow);
    }

    public drawConnectLine(p1: Particle, p2: Particle): void {
        const lineStyle = this.lineStyle(p1, p2);

        if (!lineStyle) {
            return;
        }

        const ctx = this.context;

        if (!ctx) {
            return;
        }

        CanvasUtils.drawConnectLine(ctx, this.container.retina.lineLinkedWidth, lineStyle, p1.position, p2.position);
    }

    public drawGrabLine(particle: Particle, opacity: number, mousePos: ICoordinates): void {
        const container = this.container;
        const options = container.options;
        const optColor = options.particles.lineLinked.color;

        let lineColor = container.particles.lineLinkedColor || Utils.hexToRgb(optColor);

        if (lineColor == "random") {
            lineColor = Utils.getRandomColorRGBA();
        }

        container.particles.lineLinkedColor = lineColor;

        let colorLine: IRgb = {r: 127, g: 127, b: 127};
        const ctx = container.canvas.context;

        if (!ctx) {
            return;
        }

        if (container.particles.lineLinkedColor == "random") {
            colorLine = Utils.getRandomColorRGBA();
        } else {
            colorLine = container.particles.lineLinkedColor as IRgb || colorLine;
        }

        const beginPos = {
            x: particle.position.x + particle.offset.x,
            y: particle.position.y + particle.offset.y,
        };

        CanvasUtils.drawGrabLine(ctx, container.retina.lineLinkedWidth, beginPos, mousePos, colorLine, opacity);
    }

    public drawParticle(particle: Particle): void {
        const container = this.container;
        const options = container.options;

        let radius: number;
        let opacity: number;
        let colorValue: string | undefined;

        if (particle.bubbler.radius !== undefined) {
            radius = particle.bubbler.radius;
        } else {
            radius = particle.radius;
        }

        if (particle.bubbler.opacity !== undefined) {
            opacity = particle.bubbler.opacity;
        } else {
            opacity = particle.opacity.value;
        }

        if (particle.color) {
            colorValue = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`;
        }

        if (!this.context || !colorValue) {
            return;
        }

        CanvasUtils.drawParticle(this.context,
            particle,
            colorValue,
            options.backgroundMask.enable,
            radius, options.particles.shape.stroke);
    }

    private paintBase(baseColor?: string): void {
        if (this.context) {
            CanvasUtils.paintBase(this.context, this.dimension, baseColor);
        }
    }

    private lineStyle(p1: Particle, p2: Particle): CanvasGradient | undefined {
        if (p1.color && p2.color) {
            const sourceRgb = p1.color;
            const destRgb = p2.color;

            const rgb = {
                b: Utils.mixComponents(sourceRgb.b, destRgb.b, p1.radius, p2.radius),
                g: Utils.mixComponents(sourceRgb.g, destRgb.g, p1.radius, p2.radius),
                r: Utils.mixComponents(sourceRgb.r, destRgb.r, p1.radius, p2.radius),
            };

            const midColor = Utils.getStyleFromColor(rgb);

            if (this.context) {
                return CanvasUtils.gradient(this.context, p1, p2, midColor);
            }
        }
    }
}

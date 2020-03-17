import {IDimension} from "../../Interfaces/IDimension";
import {ICoordinates} from "../../Interfaces/ICoordinates";
import {IRgb} from "../../Interfaces/IRgb";
import {Particle} from "../Particle";
import {Utils} from "./Utils";
import {IStroke} from "../../Interfaces/Options/Particles/Shape/IStroke";
import {ShapeUtils} from "./ShapeUtils";
import {ILineLinkedShadow} from "../../Interfaces/Options/Particles/ILineLinkedShadow";
import {IPolygonMaskDrawStroke} from "../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";

export class CanvasUtils {
    public static paintBase(context: CanvasRenderingContext2D,
                            dimension: IDimension,
                            baseColor?: string): void {
        context.save();
        context.fillStyle = baseColor ?? "rgba(255, 255, 255, 0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
        context.restore();
    }

    public static clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }

    public static drawPolygonMask(context: CanvasRenderingContext2D,
                                  rawData: ICoordinates[],
                                  stroke: IPolygonMaskDrawStroke): void {
        context.save();
        context.beginPath();
        context.moveTo(rawData[0].x, rawData[0].y);

        for (let i = 1; i < rawData.length; i++) {
            context.lineTo(rawData[i].x, rawData[i].y);
        }

        context.closePath();
        context.strokeStyle = stroke.color;
        context.lineWidth = stroke.width;
        context.stroke();
        context.restore();
    }

    public static drawLineLinked(context: CanvasRenderingContext2D,
                                 width: number,
                                 begin: ICoordinates,
                                 end: ICoordinates,
                                 backgroundMask: boolean,
                                 colorLine: IRgb,
                                 opacity: number,
                                 shadow: ILineLinkedShadow): void {
        context.save();

        if (backgroundMask) {
            context.globalCompositeOperation = 'destination-out';
        }

        if (colorLine) {
            context.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacity})`;
        }

        context.lineWidth = width;
        // this.ctx.lineCap = "round"; /* performance issue */
        /* path */
        context.beginPath();
        if (shadow.enable) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = shadow.color;
        }
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
        context.restore();
    }

    public static drawConnectLine(context: CanvasRenderingContext2D,
                                  width: number,
                                  lineStyle: CanvasGradient,
                                  begin: ICoordinates,
                                  end: ICoordinates): void {
        context.save();
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
        context.restore();
    }

    public static gradient(context: CanvasRenderingContext2D,
                           p1: Particle,
                           p2: Particle,
                           midColor: string): CanvasGradient | undefined {
        const gradStop = Math.floor(p2.radius / p1.radius);

        if (!p1.color || !p2.color) {
            return;
        }

        const sourcePos = p1.position;
        const destPos = p2.position;
        const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

        grad.addColorStop(0, Utils.getStyleFromColor(p1.color));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, midColor);
        grad.addColorStop(1, Utils.getStyleFromColor(p2.color));

        return grad;
    }

    public static drawGrabLine(context: CanvasRenderingContext2D,
                               width: number,
                               begin: ICoordinates,
                               end: ICoordinates,
                               colorLine: IRgb,
                               opacity: number): void {
        context.save();
        context.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacity})`;
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
        context.restore();
    }

    public static drawParticle(context: CanvasRenderingContext2D,
                               particle: Particle,
                               colorValue: string,
                               backgroundMask: boolean,
                               radius: number,
                               stroke: IStroke): void {
        context.save();

        // TODO: Performance issues, the canvas shadow is really slow
        // const shadow = options.particles.shadow;

        // if (shadow.enable) {
        //     ctx.shadowBlur = shadow.blur;
        //     ctx.shadowColor = shadow.color;
        //     ctx.shadowOffsetX = shadow.offset.x;
        //     ctx.shadowOffsetY = shadow.offset.y;
        // } else {
        //     delete ctx.shadowBlur;
        //     delete ctx.shadowColor;
        //     delete ctx.shadowOffsetX;
        //     delete ctx.shadowOffsetY;
        // }

        context.fillStyle = colorValue;

        const pos = {
            x: particle.position.x,
            y: particle.position.y,
        };

        context.translate(pos.x, pos.y);
        context.beginPath();

        if (particle.angle !== 0) {
            context.rotate(particle.angle * Math.PI / 180);
        }

        if (backgroundMask) {
            context.globalCompositeOperation = 'destination-out';
        }

        ShapeUtils.drawShape(context, particle, radius, stroke);

        context.closePath();

        if (stroke.width > 0) {
            context.strokeStyle = stroke.color;
            context.lineWidth = stroke.width;
            context.stroke();
        }

        context.fill();
        context.restore();
    }
}

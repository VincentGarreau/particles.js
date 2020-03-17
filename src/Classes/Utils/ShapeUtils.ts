import {Particle} from "../Particle";
import {IStroke} from "../../Interfaces/Options/Particles/Shape/IStroke";
import {ShapeType} from "../../Enums/ShapeType";
import {ICoordinates} from "../../Interfaces/ICoordinates";
import {ISide} from "../../Interfaces/ISide";
import {ICharacterShape} from "../../Interfaces/Options/Particles/Shape/ICharacterShape";

export class ShapeUtils {
    public static drawShape(context: CanvasRenderingContext2D,
                            particle: Particle,
                            radius: number,
                            stroke: IStroke): void {
        const pos = {
            x: particle.offset.x,
            y: particle.offset.y,
        };

        const sides = particle.container.options.particles.shape.polygon.sides;

        switch (particle.shape) {
            case ShapeType.line:
                this.drawLineShape(context, radius, stroke);
                break;

            case ShapeType.circle:
                this.drawCircleShape(context, radius, pos);
                break;

            case ShapeType.edge:
            case ShapeType.square:
                this.drawSquareShape(context, radius);
                break;

            case ShapeType.triangle:
                this.drawTriangleShape(context, radius);
                break;

            case ShapeType.polygon:
                this.drawPolygonShape(context, radius, sides);
                break;

            case ShapeType.star:
                this.drawStarShape(context, radius, sides);
                break;

            case ShapeType.heart:
                this.drawHeartShape(context, radius);
                break;

            case ShapeType.char:
            case ShapeType.character:
                this.drawTextShape(context, particle.character, particle.text, radius);

                break;

            case ShapeType.image:
                this.drawImageShape(context, particle, radius);

                break;
        }
    }

    private static drawTriangleShape(context: CanvasRenderingContext2D, radius: number): void {
        const start: ICoordinates = {
            x: -radius,
            y: radius / 1.66,
        };

        const side: ISide = {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };

        this.drawGenericPolygonShape(context, start, side);
    }

    private static drawPolygonShape(context: CanvasRenderingContext2D, radius: number, sides: number): void {
        const start: ICoordinates = {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
        const side: ISide = {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: radius * 2.66 / (sides / 3),
        };

        this.drawGenericPolygonShape(context, start, side);
    }

    private static drawStarShape(context: CanvasRenderingContext2D, radius: number, sides: number): void {
        const start: ICoordinates = {
            x: -radius * 2 / (sides / 4),
            y: -radius / (2 * 2.66 / 3.5),
        };
        const side: ISide = {
            count: {
                denominator: 2,
                numerator: sides,
            },
            length: radius * 2 * 2.66 / (sides / 3),
        };

        this.drawGenericPolygonShape(context, start, side);
    }

    private static drawLineShape(context: CanvasRenderingContext2D, length: number, stroke: IStroke): void {
        context.moveTo(0, -length / 2);
        context.lineTo(0, length / 2);
        context.strokeStyle = stroke.color;
        context.lineWidth = stroke.width;
        context.stroke();
    }

    private static drawCircleShape(context: CanvasRenderingContext2D, radius: number, center: ICoordinates): void {
        context.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
    }

    private static drawSquareShape(context: CanvasRenderingContext2D, side: number): void {
        context.rect(-side, -side, side * 2, side * 2);
    }

    private static drawHeartShape(context: CanvasRenderingContext2D, radius: number): void {
        const x = -radius / 2;
        const y = -radius / 2;

        context.moveTo(x, y + radius / 4);
        context.quadraticCurveTo(x, y, x + radius / 4, y);
        context.quadraticCurveTo(x + radius / 2, y, x + radius / 2, y + radius / 4);
        context.quadraticCurveTo(x + radius / 2, y, x + radius * 3 / 4, y);
        context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 4);
        context.quadraticCurveTo(x + radius, y + radius / 2, x + radius * 3 / 4, y + radius * 3 / 4);
        context.lineTo(x + radius / 2, y + radius);
        context.lineTo(x + radius / 4, y + radius * 3 / 4);
        context.quadraticCurveTo(x, y + radius / 2, x, y + radius / 4);
    }

    private static drawTextShape(context: CanvasRenderingContext2D,
                                 character: ICharacterShape | undefined,
                                 text: string | undefined,
                                 radius: number): void {
        if (text === undefined || character === undefined) {
            return;
        }

        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = character.fill;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        const pos = {
            x: -radius / 2,
            y: radius / 2,
        };

        if (fill) {
            context.fillText(text, pos.x, pos.y);
        } else {
            context.strokeText(text, pos.x, pos.y);
        }
    }

    private static drawGenericPolygonShape(context: CanvasRenderingContext2D, start: ICoordinates, side: ISide): void {
        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

        if (!context) {
            return;
        }

        context.save();
        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }

        // c.stroke();
        context.fill();
        context.restore();
    }

    private static drawImageShape(context: CanvasRenderingContext2D, particle: Particle, radius: number): void {
        if (!context) {
            return;
        }

        const imgObj = particle.image?.data.obj;

        if (!imgObj) {
            return;
        }

        let ratio = 1;

        if (particle.image) {
            ratio = particle.image.ratio;
        }

        const pos = {
            x: -radius,
            y: -radius,
        };

        context.drawImage(imgObj, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    }
}

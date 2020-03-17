import {IShape} from "../../../../Interfaces/Options/Particles/Shape/IShape";
import {ShapeType} from "../../../../Enums/ShapeType";
import {CharacterShape} from "./CharacterShape";
import {ImageShape} from "./ImageShape";
import {PolygonShape} from "./PolygonShape";
import {Stroke} from "./Stroke";
import {IImageShape} from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import {ICharacterShape} from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import {IPolygonShape} from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import {IStroke} from "../../../../Interfaces/Options/Particles/Shape/IStroke";
import {RecursivePartial} from "../../../../Types/RecursivePartial";

export class Shape implements IShape {
    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    get images(): IImageShape[] {
        if (this.image instanceof Array) {
            return this.image;
        }

        return [];
    }

    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    set images(value: IImageShape[]) {
        this.image = value;
    }

    public character: ICharacterShape | ICharacterShape[];
    public image: IImageShape | IImageShape[];
    public polygon: IPolygonShape;
    public stroke: IStroke;
    public type: ShapeType | ShapeType[];

    constructor() {
        this.character = new CharacterShape();
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.stroke = new Stroke();
        this.type = ShapeType.circle;
    }

    public load(data?: RecursivePartial<IShape>): void {
        if (data !== undefined) {
            if (data.character !== undefined) {
                if (data.character instanceof Array) {
                    this.character = data.character.map((s) => {
                        const tmp = new CharacterShape();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    this.character = new CharacterShape();
                    this.character.load(data.character);
                }
            }

            if (data.image !== undefined) {
                if (data.image instanceof Array) {
                    this.image = data.image.map((s) => {
                        const tmp = new ImageShape();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    this.image = new ImageShape();
                    this.image.load(data.image);
                }
            }

            this.stroke.load(data.stroke);
            this.polygon.load(data.polygon);

            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}


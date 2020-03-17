"use strict";

import {ShapeType} from "../../../../Enums/ShapeType";
import {IImageShape} from "./IImageShape";
import {ICharacterShape} from "./ICharacterShape";
import {IPolygonShape} from "./IPolygonShape";
import {IStroke} from "./IStroke";
import {IOptionLoader} from "../../IOptionLoader";

export interface IShape extends IOptionLoader<IShape> {
    type: ShapeType | ShapeType[];
    stroke: IStroke;
    polygon: IPolygonShape;
    character: ICharacterShape | ICharacterShape[];
    image: IImageShape | IImageShape[];
}

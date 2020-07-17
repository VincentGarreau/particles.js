"use strict";

import {IHsl} from "./IHsl";
import {IRgb} from "./IRgb";

export interface IColor {
    rgb?: IRgb | null;
    hsl?: IHsl | null;
}

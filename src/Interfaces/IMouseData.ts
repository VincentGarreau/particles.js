"use strict";

import {ICoordinates} from "./ICoordinates";

export interface IMouseData {
    clickPosition?: ICoordinates | null,
    position?: ICoordinates | null;
    clickTime?: number;
}

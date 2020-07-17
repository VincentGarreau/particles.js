"use strict";

import {IImage} from "./IImage";

export interface IParticleImage {
    src: string;
    data: IImage;
    ratio: number;
    obj?: HTMLImageElement;
    loaded?: boolean;
    replaceColor: boolean;
}

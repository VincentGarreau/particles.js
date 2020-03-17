"use strict";

import {IMouseData} from "./IMouseData";

export interface IContainerInteractivity {
    element?: HTMLElement | Window | Node | null;
    status?: string;
    mouse: IMouseData;
}

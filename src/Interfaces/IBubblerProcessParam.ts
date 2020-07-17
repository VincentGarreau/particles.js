"use strict";

import {ProcessBubbleType} from "../Enums/ProcessBubbleType";
import {IBubblerProcessParamObj} from "./IBubblerProcessParamObj";

export interface IBubblerProcessParam {
    bubbleObj: IBubblerProcessParamObj;
    particlesObj: IBubblerProcessParamObj;
    type: ProcessBubbleType;
}

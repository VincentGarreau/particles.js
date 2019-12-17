import { pJSInteract } from './pjsinteract';
import { pJSModes } from './pjsmodes';
import { pJSVendors } from './pjsvendors';
import { pJSRetina } from './pjsretina';
import { pJSCanvas } from './pjscanvas';
import { pJSParticles } from './pjsparticles';

'use strict';

export class pJSFunctions {
    constructor(pJS) {
        this.pJS = pJS;

        this.interact = new pJSInteract(pJS);
        this.modes = new pJSModes(pJS);
        this.vendors = new pJSVendors(pJS);
        this.retina = new pJSRetina(pJS);
        this.canvas = new pJSCanvas(pJS);
        this.particles = new pJSParticles(pJS);
    }
}
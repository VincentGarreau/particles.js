"use strict";

import {ICoordinates} from "../../Interfaces/ICoordinates";
import {IHsl} from "../../Interfaces/IHsl";
import {IRgb} from "../../Interfaces/IRgb";
import {MoveDirection} from "../../Enums/MoveDirection";
import {IOptions} from "../../Interfaces/Options/IOptions";
import {IParticlesColor} from "../../Interfaces/Options/Particles/IParticlesColor";
import {ICharacterShape} from "../../Interfaces/Options/Particles/Shape/ICharacterShape";

type CSSOMString = string;
type FontFaceLoadStatus = 'unloaded' | 'loading' | 'loaded' | 'error';
type FontFaceSetStatus = 'loading' | 'loaded';

interface FontFace {
    family: CSSOMString;
    style: CSSOMString;
    weight: CSSOMString;
    stretch: CSSOMString;
    unicodeRange: CSSOMString;
    variant: CSSOMString;
    featureSettings: CSSOMString;
    variationSettings: CSSOMString;
    display: CSSOMString;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;

    load(): Promise<FontFace>;
}

interface FontFaceSet {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;

    check(font: string, text?: string): Boolean;

    load(font: string, text?: string): Promise<FontFace[]>
}

declare global {
    interface Document {
        fonts: FontFaceSet
    }
}

/* ---------- global functions - vendors ------------ */
export class Utils {
    /**
     * Converts hexadecimal string (HTML color code) in a [[IRgb]] object
     * @param hex the hexadecimal string (#f70 or #ff7700)
     */
    public static hexToRgb(hex: string): IRgb | undefined {
        // By Tim Down - http://stackoverflow.com/a/5624139/3493650
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

        const hexFixed = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexFixed);

        return result ? {
            b: parseInt(result[3], 16),
            g: parseInt(result[2], 16),
            r: parseInt(result[1], 16),
        } : undefined;
    }

    /**
     * Converts a Hue Saturation Lightness ([[IHsl]]) object in a [[IRgb]] object
     * @param hsl
     */
    public static hslToRgb(hsl: IHsl): IRgb {
        const result: IRgb = {b: 0, g: 0, r: 0};

        if (hsl.s == 0) {
            result.b = hsl.l; // achromatic
            result.g = hsl.l;
            result.r = hsl.l;
        } else {
            const q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
            const p = 2 * hsl.l - q;

            result.r = Utils.hue2rgb(p, q, hsl.h + 1 / 3);
            result.g = Utils.hue2rgb(p, q, hsl.h);
            result.b = Utils.hue2rgb(p, q, hsl.h - 1 / 3);
        }

        result.r = Math.round(result.r * 255);
        result.g = Math.round(result.g * 255);
        result.b = Math.round(result.b * 255);

        return result;
    }

    /**
     * Generate a random RGBA color
     * @param min a minimum seed value for all 3 values
     */
    public static getRandomColorRGBA(min?: number): IRgb {
        const fixedMin = min || 0;
        return {
            b: Math.floor(Math.random() * (255 * fixedMin) + fixedMin),
            g: Math.floor(Math.random() * (255 * fixedMin) + fixedMin),
            r: Math.floor(Math.random() * (255 * fixedMin) + fixedMin),
        };
    }

    /**
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */
    public static clamp(num: number, min: number, max: number): number {
        return Math.min(Math.max(num, min), max);
    }

    /**
     * Check if a value is equal to the destination, if same type, or is in the provided array
     * @param value the value to check
     * @param array the data array or single value
     */
    public static isInArray<T>(value: T, array: T[] | T): boolean {
        return value === array || (array as T[]).indexOf(value) > -1;
    }

    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */
    public static mixComponents(comp1: number, comp2: number, weight1: number, weight2: number): number {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    /**
     * Prepares a rgba() css function from a [[IRgb]] object
     * @param color the [[IRgb]] color to convert
     */
    public static getStyleFromColor(color: IRgb): string {
        return `rgba(${Math.floor(color.r)}, ${Math.floor(color.g)}, ${Math.floor(color.b)}, 0.4)`;
    }

    /**
     * Get Particle base velocity
     * @param options the options to use for calculating the velocity
     */
    public static getParticleBaseVelocity(options: IOptions): ICoordinates {
        let velocityBase: ICoordinates;

        switch (options.particles.move.direction) {
            case MoveDirection.top:
                velocityBase = {x: 0, y: -1};
                break;
            case MoveDirection.topRight:
                velocityBase = {x: 0.5, y: -0.5};
                break;
            case MoveDirection.right:
                velocityBase = {x: 1, y: -0};
                break;
            case MoveDirection.bottomRight:
                velocityBase = {x: 0.5, y: 0.5};
                break;
            case MoveDirection.bottom:
                velocityBase = {x: 0, y: 1};
                break;
            case MoveDirection.bottomLeft:
                velocityBase = {x: -0.5, y: 1};
                break;
            case MoveDirection.left:
                velocityBase = {x: -1, y: 0};
                break;
            case MoveDirection.topLeft:
                velocityBase = {x: -0.5, y: -0.5};
                break;
            default:
                velocityBase = {x: 0, y: 0};
                break;
        }

        return velocityBase;
    }

    /**
     * Gets the particles color
     * @param color the input color to convert in [[IRgb]] object
     */
    public static getParticleColor(color: IParticlesColor): IRgb | undefined {
        let res: IRgb | undefined;

        if (typeof (color.value) === "object") {
            if (color.value instanceof Array) {
                const arr = color.value as string[];
                const colorSelected = color.value[Math.floor(Math.random() * arr.length)];

                res = Utils.hexToRgb(colorSelected);
            } else {
                const rgbColor = color.value as IRgb;

                if (rgbColor.r !== undefined) {
                    res = rgbColor;
                }

                const hslColor = color.value as IHsl;

                if (hslColor.h !== undefined) {
                    res = Utils.hslToRgb(hslColor);
                }
            }
        } else {
            if (color.value === "random") {
                res = {
                    b: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    r: Math.floor(Math.random() * 256),
                };
            } else {
                res = Utils.hexToRgb(color.value);
            }
        }

        return res;
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    public static getDistanceBetweenCoordinates(pointA: ICoordinates, pointB: ICoordinates): number {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static async loadFont(character: ICharacterShape): Promise<void> {
        try {
            await document.fonts.load(`${character.weight} 36px '${character.font}'`);
        } catch {
        }
    }

    /**
     *
     * @param p
     * @param q
     * @param t
     */
    private static hue2rgb(p: number, q: number, t: number): number {
        let tCalc = t;

        if (tCalc < 0) {
            tCalc += 1;
        }

        if (tCalc > 1) {
            tCalc -= 1;
        }

        if (tCalc < 1 / 6) {
            return p + (q - p) * 6 * tCalc;
        }

        if (tCalc < 1 / 2) {
            return q;
        }

        if (tCalc < 2 / 3) {
            return p + (q - p) * (2 / 3 - tCalc) * 6;
        }

        return p;
    }
}

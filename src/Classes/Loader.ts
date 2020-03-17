"use strict";

import {Container} from "./Container";
import {IOptions} from "../Interfaces/Options/IOptions";
import {RecursivePartial} from "../Types/RecursivePartial";
import {Constants} from "./Utils/Constants";

let tsParticlesDom: Container[] = [];

/**
 * Main class for creating the [[Container]] objects
 */
export class Loader {
    /**
     * All the [[Container]] objects loaded
     */
    public static dom(): Container[] {
        if (!tsParticlesDom) {
            tsParticlesDom = [];
        }

        return tsParticlesDom;
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    public static domItem(index: number): Container {
        return Loader.dom()[index];
    }

    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    public static loadFromArray(tagId: string,
                                params: RecursivePartial<IOptions>[],
                                index?: number): Container | undefined {
        let idx: number;

        if (index === undefined || index < 0 || index >= params.length) {
            idx = Math.floor(Math.random() * params.length);
        } else {
            idx = index;
        }

        return Loader.load(tagId, params[idx]);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */
    public static load(tagId: string, params?: RecursivePartial<IOptions>): Container | undefined {
        /* elements */
        const domContainer = document.getElementById(tagId);

        if (!domContainer) {
            return;
        }

        const dom = Loader.dom();
        const idx = dom.findIndex((v) => v.id === tagId);

        if (idx >= 0) {
            const old = this.domItem(idx);

            old.destroy();
        }

        const existingCanvases = domContainer.getElementsByTagName("canvas");

        let canvasEl: HTMLCanvasElement;
        let generatedCanvas: boolean;

        /* get existing canvas if present, otherwise a new one will be created */
        if (existingCanvases.length) {
            canvasEl = existingCanvases[0];

            if (!canvasEl.className) {
                canvasEl.className = Constants.canvasClass;
            }

            generatedCanvas = false;
        } else {
            generatedCanvas = true;
            /* create canvas element */
            canvasEl = document.createElement("canvas");

            canvasEl.className = Constants.canvasClass;

            /* set size canvas */
            canvasEl.style.width = "100%";
            canvasEl.style.height = "100%";

            /* append canvas */
            domContainer.appendChild(canvasEl);
        }

        /* launch tsparticle */
        const newItem = new Container(tagId, params);

        if (idx >= 0) {
            dom.splice(idx, 1, newItem);
        } else {
            dom.push(newItem);
        }

        newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
        newItem.start();

        return newItem;
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path to use in the GET request
     */
    public static async loadJSON(tagId: string, jsonUrl: string): Promise<Container | undefined> {
        /* load json config */
        const response = await fetch(jsonUrl);

        if (response.ok) {
            const params = await response.json();

            if (params instanceof Array) {
                return Loader.loadFromArray(tagId, params);
            } else {
                return Loader.load(tagId, params);
            }
        } else {
            console.error(`Error tsParticles - fetch status: ${response.status}`);
            console.error("Error tsParticles - File config not found");
        }
    };

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    public static setOnClickHandler(callback: EventListenerOrEventListenerObject): void {
        const dom = Loader.dom();

        if (dom.length === 0) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }

        for (const domItem of dom) {
            const el = domItem.interactivity.element;

            if (el) {
                el.addEventListener("click", callback);
            }
        }
    }
}

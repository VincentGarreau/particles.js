require("pathseg");

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/**
 * A wrapper to call the new methods, with deprecation warnings
 */
export class ParticlesJS {
    /**
     * Loads the provided options to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */
    static load(tagId, params) {
        if (console) {
            console.warn("this method is obsolete, please use the new tsParticles.load");
        }

        return window.tsParticles.load(tagId, params);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     * @param callback the function called after the [[Container]] object is loaded that will be passed as a parameter
     */
    static loadJson(tagId, pathConfigJson, callback) {
        if (console) {
            console.warn("this method is obsolete, please use the new tsParticles.loadJSON");
        }

        window.tsParticles.loadJSON(tagId, pathConfigJson).then(callback).catch((error) => {
            console.error(error);
        });
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
     * @param callback the function called after the click event is fired
     */
    static setOnClickHandler(callback) {
        if (console) {
            console.warn("this method is obsolete, please use the new tsParticles.setOnClickHandler");
        }

        window.tsParticles.setOnClickHandler(callback);
    }
}
import {Container} from "./Classes/Container";
import {IOptions} from "./Interfaces/Options/IOptions";
import {RecursivePartial} from "./Types/RecursivePartial";

/**
 * A wrapper to call the new methods, with deprecation warnings
 */
declare class ParticlesJS {
    /**
     * Loads the provided options to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */
    public static load(tagId: string, params: RecursivePartial<IOptions>): Container;

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     * @param callback the function called after the [[Container]] object is loaded that will be passed as a parameter
     */
    public static loadJson(tagId: string, pathConfigJson: string, callback: ((container: Container) => void)): void;

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
     * @param callback the function called after the click event is fired
     */
    public static setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}

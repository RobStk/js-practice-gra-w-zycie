import { Animal } from "./animal";

/** @extends {Animal} */
class Antelope extends Animal {
    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    /**
     * Create a antelope.
     * @param {object} params 
     * @param {string} [params.gender] Gender of the antelope. if it is not defined it will be randomly selected.
     */
    constructor(params) {
        super("antelope", params);
        this._addLabel("a");
        this._isEatable = true;
        this._isEater = false;
        this._movementDirections = ["right"];
    }
}

export { Antelope };
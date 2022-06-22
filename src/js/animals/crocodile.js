import { Animal } from "./animal";

/** @extends {Animal} */
class Crocodile extends Animal {
    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    /**
     * Create a crocodile.
     * @param {object} params 
     * @param {string} [params.gender] Gender of the crocodile. if it is not defined it will be randomly selected.
     */
    constructor(params,) {
        super("crocodile", params);
        this._addLabel("k");
        this._isEatable = false;
        this._isEater = true;
        this._movementDirections = ["up", "down"];
    }
}

export { Crocodile };
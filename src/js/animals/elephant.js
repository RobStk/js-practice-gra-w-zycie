import { Animal } from "./animal";

/** @extends {Animal} */
class Elephant extends Animal {
    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    /**
     * Create a elephant.
     * @param {object} params 
     * @param {string} [params.gender] Gender of the elephant. if it is not defined it will be randomly selected.
     */
    constructor(params) {
        super("elephant", params);
        this._addLabel("e");
        this._isEatable = false;
        this._isEater = false;
        this._movementDirections = ["up", "right", "down", "left"];
    }
}

export { Elephant };
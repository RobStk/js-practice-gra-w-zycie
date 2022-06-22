import { Animal } from "./animal";

/** @extends {Animal} */
class Lion extends Animal {
    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    /**
     * Create a lion.
     * @param {object} params 
     * @param {string} [params.gender] Gender of the lion. if it is not defined it will be randomly selected.
     */
    constructor(params) {
        super("lion", params);
        this._addLabel("l");
        this._isEatable = false;
        this._isEater = true;
        this._movementDirections = ["right", "left"];
    }
}

export { Lion };
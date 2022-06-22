class SpeedManager {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #speed;
    #defaultDelay;
    #delay;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * @param {Number|String} speed         Numerical value of the set speed.
     * @param {Number} [defaultDelay=5000]  Optional: default delay as the basis for calculations.
     */
    constructor(speed, defaultDelay) {
        this.#speed = speed;
        defaultDelay ? this.#defaultDelay = defaultDelay : this.#defaultDelay = 5000;
        this.#setDelay();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get delay() { return this.#delay };

    set speed(speed) {
        this.#speed = speed;
        this.#setDelay();
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #setDelay() {
        const base = this.#defaultDelay / 5;
        this.#delay = this.#defaultDelay * 2 - (this.#speed * base);
    }
}

export { SpeedManager }
import { Token } from "./token";

class Field {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** @type {object} */
    #coordinates;
    /** @type {Token} */
    #content;
    /** @type {HTMLDivElement} */
    #html;
    /** @type {Number} */
    #coordinatesRequestId;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /** Create a field.
     * @param {object} coordinates      Coordinates of the field.
     * @param {Number} coordinates.x    x-coordinate
     * @param {Number} coordinates.y    y-coordinate
     */
    constructor(coordinates) {
        this.#createHTML();
        this.#coordinates = coordinates;
        this.#content = null;
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get html() { return this.#html }
    get content() { return this.#content }
    get coordinates() { return this.#coordinates };

    set content(content) {
        if (this.#content) this.#unbindToken();
        this.#html.innerHTML = "";
        this.#content = content;
        if (this.#content) {
            this.#coordinatesRequestId = this.#content.events.on("coordinates request", this.#setContentCoordinates.bind(this));
            this.#html.appendChild(this.#content.html);
        }
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #createHTML() {
        this.#html = document.createElement("div");
        this.#html.classList.add("field");
    }

    // ------------------------

    #setContentCoordinates(contentField) {
        contentField.x = this.#coordinates.x;
        contentField.y = this.#coordinates.y;
    }

    // ------------------------

    #unbindToken() {
        this.#content.events.off(this.#coordinatesRequestId);
    }
}

export { Field };
class SpeedSlider {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** @type {String} */
    #id;
    /** @type {Number} */
    #defaultValue;
    /** @type {HTMLInputElement} */
    #html;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * Creates a new SpeedSlider.
     * @param {String} id               Id of SpeedSlider input element.
     * @param {Number} value            Default value for slider
     */
    constructor(id, value) {
        this.#id = id;
        this.#defaultValue = value;
        if (this.#id.startsWith("#")) this.#id = this.#id.substring(1);

        this.#createHTML();
        this.#addEventsListeners();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get html() { return this.#html };
    get id() { return this.#id };
    get value() { return this.#html.value };
    get insertLabelBefore() { return this.#insertLabelBefore };

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #createHTML() {
        const input = document.createElement("input");
        input.type = "range";
        input.min = "0";
        input.max = "10";
        input.defaultValue = this.#defaultValue;
        input.id = this.#id;

        this.#html = input;
    }

    // ------------------------

    #resetValue() {
        this.#html.value = this.#html.defaultValue;
    }

    // ------------------------

    #addEventsListeners() {
        document.addEventListener("DOMContentLoaded", this.#resetValue.bind(this));
    }

    // ------------------------

    /**
     * Insert label before this html element.
     * @param {String} labelText Text for the label.
     * @param {String} [labelClass] Optional: class for the label element.
     */
    #insertLabelBefore(labelText, labelClass) {
        const label = document.createElement("label");
        label.setAttribute("for", this.#id);
        if (labelClass) label.classList.add(labelClass);
        label.textContent = labelText;

        const parent = this.#html.parentElement;
        parent.insertBefore(label, this.#html);
    }
}

export { SpeedSlider };
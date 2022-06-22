import { EventsManager } from "../events-manager";

class NumberInputRow {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #events;
    #html;
    #input;
    #label;
    #inputId;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    constructor(id, value, labelTxt) {
        this.#inputId = id;
        const inputValue = value;

        this.#createInput(inputValue);

        this.#label = document.createElement("label");
        this.#label.textContent = labelTxt;
        this.#label.setAttribute("for", this.#inputId);

        this.#html = document.createElement("div");
        this.#html.classList.add("input-row");
        this.#html.appendChild(this.#label);
        this.#html.appendChild(this.#input);

        this.#events = new EventsManager();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get events() { return this.#events }
    get input() { return this.#input };
    get inputValue() { return Number(this.#input.value) }
    get minInputValue() { return Number(this.#input.min) }
    get html() { return this.#html };

    set minInputValue(minInputValue) {
        this.#input.min = minInputValue;
        if (Number(this.#input.value) < Number(this.#input.min)) {
            this.#input.value = this.#input.min;
            this.#events.emit("change input value");
        }
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #createInput(inputValue) {
        this.#input = document.createElement("input");
        this.#input.setAttribute("id", this.#inputId);
        this.#input.setAttribute("type", "number");
        this.#input.setAttribute("min", 0);
        this.#input.value = inputValue;
        if (inputValue == 0) this.#input.value = null;
        this.#input.addEventListener("input", this.#handleInputEvent.bind(this));
    }

    // ------------------------

    #handleInputEvent() {
        if (Number(this.#input.value) < Number(this.#input.min)) this.#input.value = this.#input.min;
        this.#events.emit("change input value");
    }
}

export { NumberInputRow };
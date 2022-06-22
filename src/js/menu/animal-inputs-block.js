import { EventsManager } from "../events-manager";
import { NumberInputRow } from "./number-input-row";

class AnimalInputsBlock {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #events;
    #name;
    #html;
    #allInputRow;
    #maleInputRow;
    #femaleInputRow;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * @param {Object} animal 
     * @param {Number|String} animal.all
     * @param {Number|String} animal.males
     * @param {Number|String} animal.females
     * @param {String} animal.name
     * @param {String} animal.label
     */
    constructor(animal) {
        this.#events = new EventsManager();

        let name = animal.name;
        this.#name = this.#changeFirstLetterToUpperCase(name);

        this.#html = document.createElement("div");

        const header = document.createElement("h4");
        const label = animal.label;
        header.textContent = label;
        this.#html.appendChild(header);

        const inputsContainer = document.createElement("div");
        inputsContainer.classList.add("inputs-container");

        const idPrefix = "menu" + this.#name;

        const allInputId = idPrefix + "AllInput";
        const allInputValue = animal.all;
        const allInputLabel = "wszystkie";
        this.#allInputRow = new NumberInputRow(allInputId, allInputValue, allInputLabel);
        this.#allInputRow.events.on("change input value", this.#handleChangeAllInput.bind(this));

        const maleInputId = idPrefix + "MaleInput";
        const maleInputValue = animal.males;
        const maleInputLabel = "samce";
        this.#maleInputRow = new NumberInputRow(maleInputId, maleInputValue, maleInputLabel);
        this.#maleInputRow.events.on("change input value", this.#handleChangeGenderInput.bind(this));

        const femaleInputId = idPrefix + "FemaleInput";
        const femaleInputValue = animal.females;
        const femaleInputLabel = "samice";
        this.#femaleInputRow = new NumberInputRow(femaleInputId, femaleInputValue, femaleInputLabel);
        this.#femaleInputRow.events.on("change input value", this.#handleChangeGenderInput.bind(this));

        inputsContainer.appendChild(this.#allInputRow.html);
        inputsContainer.appendChild(this.#maleInputRow.html);
        inputsContainer.appendChild(this.#femaleInputRow.html);

        this.#html.appendChild(inputsContainer);
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */
    get events() { return this.#events }
    get html() { return this.#html }
    get allInputValue() { return Number(this.#allInputRow.inputValue) }
    get allInput() { return this.#allInputRow.input }
    get maleInput() { return this.#maleInputRow.input }
    get femaleInput() { return this.#femaleInputRow.input }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #changeFirstLetterToUpperCase(txt) {
        let firstLetter = txt[0];
        firstLetter = firstLetter.toUpperCase();
        const restLetter = txt.substring(1);
        txt = firstLetter + restLetter;
        return txt;
    }

    // ------------------------

    #handleChangeGenderInput() {
        const sum = Number(this.#maleInputRow.inputValue) + Number(this.#femaleInputRow.inputValue);
        this.#allInputRow.minInputValue = sum;
    }

    // ------------------------

    #handleChangeAllInput() {
        this.#events.emit("change all");
    }
}

export { AnimalInputsBlock }
import { Token } from "../token";

class Animal {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** @type {String} Specie of the animal. */
    #specie;
    /** @type {String} Gender of the animal. */
    #gender;
    /** @type {HTMLDivElement} HTML element. */
    #html;
    /** @type {Token} A token representing an animal for outsiders. */
    #token;
    /** @type {String} Label of the animal. */
    #label;
    /** @type {String[]} Eating directions. */
    #eatingDirections;
    /** @type {String[]} Breeding directions. */
    #breedingDirections;
    /** @type {String[]} Directions for new child. */
    #childDirections;

    /* ------------------------ */
    /* Protected properties     */
    /* ------------------------ */

    /** @type {String[]} Movement directions. */
    _movementDirections;
    /** @type {Boolean} Is the animal an eater? */
    _isEater;
    /** @type {Boolean} is the animal Eatable? */
    _isEatable;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * @param {String} specie           Specie of the animal.
     * @param {object} params           Params.
     * @param {String} [params.gender]  Gender of the Animal. If it is not defined it will be randomly selected.
     */
    constructor(specie, params) {
        if (!params) { params = {} };
        if (params.gender) { this.#gender = params.gender }
        else { this.#drawGender() };
        this.#createHTML();
        this.#specie = specie;
        this.#html.classList.add(this.#specie);
        if (this.#gender === "male") { this.#html.classList.add("male") };
        if (this.#gender === "female") { this.#html.classList.add("female") };
        this._movementDirections = [];
        this.#eatingDirections = ["up", "right", "down", "left"];
        this.#breedingDirections = ["up", "right", "down", "left"];
        this.#childDirections = ["up", "right", "down", "left"];
        this.#createToken();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get token() { return this.#token };

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    /** Creating HTML */
    #createHTML() {
        this.#html = document.createElement("div");
        this.#html.classList.add("animal");
        this.#html.textContent = this.#label;
    }

    // ------------------------

    /** Drawing a gender */
    #drawGender() {
        const result = Math.floor(Math.random() * 2);
        this.#gender = "female";
        if (result) { this.#gender = "male" };
    }

    // ------------------------

    /**
     * @protected
     * Creating a upper or lower case label for the animal based on gender.
     * @param {string} label Upper or lower case letter representing label of the animal.
     */
    _addLabel(label) {
        label = label.toLowerCase()
        if (this.#gender == "male") { label = label.toUpperCase() };
        this.#label = label;
        this.#html.textContent = this.#label;
    }

    // ------------------------

    #createToken() {
        this.#token = new Token(this.#html);
        this.#token.events.on("movement directions request", this.#setTokenMovementDirections.bind(this));
        this.#token.events.on("eating directions request", this.#setTokenEatingDirections.bind(this));
        this.#token.events.on("breeding directions request", this.#setTokenBreedingDirections.bind(this));
        this.#token.events.on("child directions request", this.#setTokenChildDirections.bind(this));
        this.#token.events.on("is eater request", function () { this.#token.isEater = this._isEater }.bind(this));
        this.#token.events.on("is eatable request", function () { this.#token.isEatable = this._isEatable }.bind(this));
        this.#token.events.on("gender request", function () { this.#token.gender = this.#gender }.bind(this));
        this.#token.events.on("specie request", function () { this.#token.specie = this.#specie }.bind(this));
    }

    // ------------------------

    #setTokenMovementDirections(dataRecipientRefrence) {
        if (Array.isArray(dataRecipientRefrence)) {
            this.#changeArrayContent(dataRecipientRefrence, this._movementDirections);
            return;
        }
        console.error("The parameter must be a reference to an array.");
    }

    // ------------------------

    #setTokenEatingDirections(dataRecipientRefrence) {
        if (Array.isArray(dataRecipientRefrence)) {
            this.#changeArrayContent(dataRecipientRefrence, this.#eatingDirections);
            return;
        }
        console.error("The parameter must be a reference to an array.");
    }

    // ------------------------

    #setTokenBreedingDirections(dataRecipientRefrence) {
        if (Array.isArray(dataRecipientRefrence)) {
            this.#changeArrayContent(dataRecipientRefrence, this.#breedingDirections);
            return;
        }
        console.error("The parameter must be a reference to an array.");
    }

    // ------------------------

    #setTokenChildDirections(dataRecipientRefrence) {
        if (Array.isArray(dataRecipientRefrence)) {
            this.#changeArrayContent(dataRecipientRefrence, this.#childDirections);
            return;
        }
        console.error("The parameter must be a reference to an array.");
    }

    // ------------------------

    #changeArrayContent(arrReference, newContentArr) {
        while (arrReference.length) arrReference.pop();
        newContentArr.forEach(index => {
            arrReference.push(index);
        });
    }
}

export { Animal };
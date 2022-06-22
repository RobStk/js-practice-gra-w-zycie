import { EventsManager } from "./events-manager";

class Token {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #html;
    #coordinates;
    #movementDirections;
    #eatingDirections;
    #breedingDirections;
    #childDirections;
    #isEater;
    #isEatable;
    #gender;
    #specie;
    #events;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * @param {HTMLDivElement} html 
     */
    constructor(html) {
        this.#html = html;
        this.#coordinates = {};
        this.#movementDirections = [];
        this.#eatingDirections = [];
        this.#breedingDirections = [];
        this.#childDirections = [];
        this.#events = new EventsManager();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get html() { return this.#html }

    get events() { return this.#events }

    get coordinates() {
        this.#events.emit("coordinates request", this.#coordinates);
        return this.#coordinates;
    }

    get movementDirections() {
        this.#events.emit("movement directions request", this.#movementDirections);
        return this.#movementDirections;
    }

    get eatingDirections() {
        this.#events.emit("eating directions request", this.#eatingDirections);
        return this.#eatingDirections;
    }

    get breedingDirections() {
        this.#events.emit("breeding directions request", this.#breedingDirections);
        return this.#breedingDirections;
    }

    get childDirections() {
        this.#events.emit("child directions request", this.#childDirections);
        return this.#childDirections;
    }

    get isEater() {
        this.#events.emit("is eater request", this.#isEater);
        return this.#isEater;
    }
    set isEater(isEater) { this.#isEater = isEater };

    get isEatable() {
        this.#events.emit("is eatable request", this.#isEatable);
        return this.#isEatable;
    }
    set isEatable(isEatable) { this.#isEatable = isEatable };

    get gender() {
        this.#events.emit("gender request", this.#gender);
        return this.#gender;
    }
    set gender(gender) { this.#gender = gender };

    get specie() {
        this.#events.emit("specie request", this.#specie);
        return this.#specie;
    }
    set specie(specie) { this.#specie = specie };
}

export { Token };
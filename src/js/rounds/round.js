import { Breeding } from "./breeding";
import { Eating } from "./eating";
import { Moving } from "./moving";
import { Board } from "../board";
import { SpeedManager } from "../speed-manager";
import { EventsManager } from "../events-manager";

class Round {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** Object that handles the movement. */
    #moving;
    /** Object that handles eating. */
    #eating;
    /** Object that handles reproduction. */
    #breeding;
    /** Events manager. */
    #events;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * @param {Board} board                 Reference to the game board.
     * @param {SpeedManager} speedManager   Speed Manager reference.
     */
    constructor(board, speedManager) {
        this.#moving = new Moving(board, speedManager);
        this.#eating = new Eating(board, speedManager);
        this.#events = new EventsManager();
        this.#breeding = new Breeding(board, speedManager, this.onCreateAnimal);
        this.#breeding.events.on("create animal", this.#createAnimal.bind(this));
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get execute() { return this.#execute };
    get events() { return this.#events };

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async #execute() {
        await this.#moving.execute();
        await this.#eating.execute();
        await this.#breeding.execute();
    }

    // ------------------------

    #createAnimal(data) {
        this.#events.emit("create animal", data);
    }
}

export { Round };
import { AnimalsTypes } from "./animals/animals-types";
import { Menu } from "./menu/menu";
import { Run } from "./run";
import { SpeedManager } from "./speed-manager";

class Game {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** @type {HTMLDivElement} Main HTML element. */
    #html;
    /** @type {object} Options */
    #options
    /** @type {Menu} Main manu. */
    #menu;
    /** @type {Run} Run. */
    #run;
    /** @type {SpeedManager} Speed manager. */
    #speedManager;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * Ceate a game.
     * @param {HTMLDivElement} containerElement Container to create a new game in it.
     */
    constructor(containerElement) {
        const animals = new AnimalsTypes();
        animals.all = 20;
        this.#options = {
            rounds: 10,
            speed: 5,
            xSize: 10,
            ySize: 10,
            animals: animals
        }

        this.#html = containerElement;
        this.#menu = new Menu(this.#options);
        this.#showMenu();
        this.#addEventsListeners();
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #showMenu() {
        if (this.#run) {
            if (this.#html.contains(this.#run.html)) {
                this.#html.replaceChild(this.#run.html, this.#menu.html);
                return;
            }
        }
        if (!this.#html.contains(this.#menu.html)) this.#html.appendChild(this.#menu.html);
    }

    // ------------------------

    #showRun() {
        this.#speedManager = new SpeedManager(this.#options.speed, 1000);
        this.#run = new Run(this.#speedManager, this.#options);
        this.#html.replaceChild(this.#run.html, this.#menu.html);
    }

    // ------------------------

    #addEventsListeners() {
        this.#menu.events.on("start initiated", this.#showRun.bind(this));
    }
}

export { Game };
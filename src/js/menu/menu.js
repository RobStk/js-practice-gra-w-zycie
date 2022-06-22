import { EventsManager } from "../events-manager";
import { SpeedSlider } from "../speed-slider";
import { AnimalInputsBlock } from "./animal-inputs-block";

class Menu {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** @type {Object} */
    #options;
    /** @type {HTMLElement} */
    #html;
    /** @type {Object} */
    #inputs;
    /** @type {AnimalInputsBlock[]} */
    #animalInputsBlocks;
    /** @type {MediaQueryList} */
    #normalSizeQuery;
    /** @type {EventsManager} */
    #events;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * Create a menu.
     * @param {Object} options 
     */
    constructor(options) {
        this.#options = options;
        this.#createHTML();
        this.#normalSizeQuery = window.matchMedia("(min-width: 340px)");
        this.#setSize();
        this.#addEventsListeners();
        this.#events = new EventsManager();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get html() { return this.#html }
    get events() { return this.#events };

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #createHTML() {
        const template = document.querySelector("#menu");
        this.#html = template.content.querySelector(".menu");

        const animals = this.#options.animals;

        const sliderId = "#menuSpeedInput";
        const slider = this.#html.querySelector(sliderId);
        const speedSlider = new SpeedSlider(sliderId, this.#options.speed);
        const sliderParent = slider.parentElement;
        sliderParent.replaceChild(speedSlider.html, slider);

        const animalsInputs = {};
        this.#inputs = {
            rounds: this.#html.querySelector("#menuRoundsInput"),
            speed: speedSlider.html,
            xSize: this.#html.querySelector("#menuXSizeInput"),
            ySize: this.#html.querySelector("#menuYSizeInput"),
            animalsAll: this.#html.querySelector("#menuAnimalsAllInput"),
            animals: animalsInputs
        }

        this.#inputs.rounds.value = this.#options.rounds;
        this.#inputs.speed.value = this.#options.speed;
        this.#inputs.xSize.value = this.#options.xSize;
        this.#inputs.ySize.value = this.#options.ySize;
        this.#inputs.animalsAll.value = this.#options.animals.all;

        const animalsContainer = this.#html.querySelector(".menu-animals-container");

        this.#animalInputsBlocks = [];

        for (const key in animals) {
            const val = animals[key];
            if (typeof (val) == "object") {
                const animal = animals[key];

                const animalInputsBlock = new AnimalInputsBlock(animal);
                animalInputsBlock.events.on("change all", this.#handleChangeAll.bind(this));
                this.#animalInputsBlocks.push(animalInputsBlock);

                animalsContainer.appendChild(animalInputsBlock.html);

                animalsInputs[animal.name] = {
                    all: animalInputsBlock.allInput,
                    males: animalInputsBlock.maleInput,
                    females: animalInputsBlock.femaleInput
                }
            }
        };
    }

    // ------------------------

    #submit(event) {
        event.preventDefault();
        this.#options.rounds = this.#inputs.rounds.value;
        this.#options.speed = Number(this.#inputs.speed.value);
        this.#options.xSize = Number(this.#inputs.xSize.value);
        this.#options.ySize = Number(this.#inputs.ySize.value);
        this.#options.animals.all = Number(this.#inputs.animalsAll.value);
        this.#options.speed = Number(this.#inputs.speed.value);

        for (const animalKey in this.#inputs.animals) {
            const animal = this.#inputs.animals[animalKey];
            for (const key in animal) { this.#options.animals[animalKey][key] = Number(this.#inputs.animals[animalKey][key].value) }
        }

        this.#events.emit("start initiated");
    }

    // ------------------------

    #handleChangeAll() {
        const allAnimalsInput = this.#html.querySelector("#menuAnimalsAllInput");
        let sum = 0;
        this.#animalInputsBlocks.forEach(animalInputsBlock => {
            sum += Number(animalInputsBlock.allInputValue);
        });
        allAnimalsInput.min = sum;
        if (allAnimalsInput.value < sum) allAnimalsInput.value = sum;
    }

    // ------------------------

    #addEventsListeners() {
        this.#html.addEventListener("submit", this.#submit.bind(this));
        this.#normalSizeQuery.addEventListener("change", this.#setSize.bind(this));
    }

    // ------------------------

    #setSize() {
        let size = "normal";
        if (!this.#normalSizeQuery.matches) size = "small";
        const elements = this.#html.querySelectorAll(".resizable");
        elements.forEach(element => {
            if (size === "normal") element.classList.add("col-2");
            if (size === "small") element.classList.remove("col-2");
        });
    }
}

export { Menu };
import { Animal } from "./animals/animal";
import { Antelope } from "./animals/antelope";
import { Crocodile } from "./animals/crocodile";
import { Elephant } from "./animals/elephant";
import { Lion } from "./animals/lion";
import { Board } from "./board";
import { Round } from "./rounds/round";
import { SpeedManager } from "./speed-manager";
import { SpeedSlider } from "./speed-slider";

class Run {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** Speed Manager. */
    #speedManager;
    /** Options. */
    #options;
    /** @type {Animal[]} Animals. */
    #animals;
    /** @type {HTMLDivElement} HTML element. */
    #html;
    /** @type {Board} Game's board. */
    #board;
    /** @type {Round[]} All rounds. */
    #rounds;
    /** @type {SpeedSlider} Speed Slider. */
    #speedSlider;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * Create a run.
     * @param {SpeedManager} speedManager               Speed Manager object reference.
     * @param {object} options                          Options for new instance.
     * @param {Number|String} [options.xSize = 10]      Number of fields on the x axis.
     * @param {Number|String} [options.ySize = 10]      Number of fields on the y axis.
     * @param {Number|String} [options.rounds]          Number of rounds.
     * @param {Number} [options.speed]                  Speed of the game.
     * @param {object} [options.animals]                An object containing the number of animals 
     * @param {Number|String} [options.animals.all]     Number of all animals. If fewer animals of a particular type are given, then the rest will be drawn.
     */
    constructor(speedManager, options) {
        this.#speedManager = speedManager;
        this.#options = options;
        this.#createAnimals();
        this.#createBoard();
        this.#createRounds();
        this.#createSpeedSldier();
        this.#createHTML();
        this.#start();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get html() { return this.#html }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #createAnimals() {
        this.#animals = [];

        for (const key in this.#options.animals) {

            const females = this.#options.animals[key].females;
            for (let i = 0; i < females; i++) {
                this.#addAnimalByTypeKey(key, "female");
            }

            const males = this.#options.animals[key].males;
            for (let i = 0; i < males; i++) {
                this.#addAnimalByTypeKey(key, "male");
            }

            const all = this.#options.animals[key].all;
            if (all > (females + males)) {
                const rest = all - (females + males);
                for (let i = 0; i < rest; i++) {
                    this.#addAnimalByTypeKey(key, "");
                }
            }
        }

        const allAnimals = this.#options.animals.all;
        if (allAnimals > (this.#animals.length)) {
            const rest = allAnimals - (this.#animals.length);
            for (let i = 0; i < rest; i++) {
                const result = Math.floor(Math.random() * 4 + 1);
                let key = null;
                switch (result) {
                    case 1:
                        key = "antelopes";
                        break;
                    case 2:
                        key = "crocodiles";
                        break;
                    case 3:
                        key = "elephants";
                        break;
                    case 4:
                        key = "lions";
                        break;
                }
                if (key) { this.#addAnimalByTypeKey(key, ""); }
            }
        }
    }

    // ------------------------

    #createBoard() {
        const boardOptions = {
            xSize: this.#options.xSize,
            ySize: this.#options.ySize
        }
        this.#board = new Board(boardOptions);
        const tokens = [];
        this.#animals.forEach(animal => {
            tokens.push(animal.token);
        });
        this.#board.addTokens(tokens);
    }

    // ------------------------

    #createRounds() {
        this.#rounds = [];
        for (let i = 0; i < this.#options.rounds; i++) {
            const round = new Round(this.#board, this.#speedManager);
            round.events.on("create animal", this.#addAnimalToRun.bind(this));
            this.#rounds.push(round);
        }
    }

    // ------------------------

    #createHTML() {
        this.#html = document.createElement("div");
        const sliderContainer = document.createElement("div");
        sliderContainer.classList.add("board-slider-container");
        sliderContainer.appendChild(this.#speedSlider.html);
        this.#speedSlider.insertLabelBefore("Prędkość");
        this.#html.appendChild(sliderContainer);
        this.#html.appendChild(this.#board.html);
    }

    // ------------------------

    async #start() {
        for (let i = 0; i < this.#rounds.length; i++) {
            const round = this.#rounds[i];
            await round.execute();
            console.log(`Koniec rundy ${i + 1}.`);
        }
        console.log("KONIEC");
    }

    // ------------------------

    #addAnimalByTypeKey(typeKey, gender) {
        let animal = null;
        switch (typeKey) {
            case "antelopes":
                animal = new Antelope({ gender: gender });
                break;
            case "crocodiles":
                animal = new Crocodile({ gender: gender });
                break;
            case "elephants":
                animal = new Elephant({ gender: gender });
                break;
            case "lions":
                animal = new Lion({ gender: gender });
                break;
        }
        if (animal) { this.#animals.push(animal) }
    }

    // ------------------------

    #createAnimalBySpecie(specie, gender) {
        let animal = null;
        switch (specie) {
            case "antelope":
                animal = new Antelope({ gender: gender });
                return animal;
            case "crocodile":
                animal = new Crocodile({ gender: gender });
                return animal;
            case "elephant":
                animal = new Elephant({ gender: gender });
                return animal;
            case "lion":
                animal = new Lion({ gender: gender });
                return animal;
            default:
                console.error("Specie is not supported: ", specie);
                return null;
        }
    }

    // ------------------------

    #addAnimalToRun({ specie, coords }) {
        const animal = this.#createAnimalBySpecie(specie);
        const token = animal.token
        this.#board.addNewToken({ token: token, coords: coords });
    }

    // ------------------------

    #createSpeedSldier() {
        this.#speedSlider = new SpeedSlider("boardSpeedSlider", this.#options.speed);
        this.#speedSlider.html.addEventListener("input", this.#changeSpeed.bind(this));
    }

    // ------------------------

    #changeSpeed() {
        this.#options.speed = this.#speedSlider.value;
        this.#speedManager.speed = this.#options.speed;
    }
}

export { Run };
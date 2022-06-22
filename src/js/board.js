import { AnimalsTypes } from "./animals/animals-types";
import { Field } from "./field";
import { Token } from "./token";
import { Moving } from "./rounds/moving";

class Board {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** Options. */
    #options;
    /** HTML element. */
    #html;
    /** @type {Array[]} All fields on board. */
    #fields;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * Create a board with fields.
     * @param {object} options                  Options for new instance.
     * @param {Number|String} options.xSize     Number of fields on the x axis.
     * @param {Number|String} options.ySize     Number of fields on the y axis.
     * @param {AnimalsTypes} options.tokens     Tokens to be placed on the board
     */
    constructor(options) {
        this.#options = options;
        this.#createFields();
        this.#createHTML();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get html() { return this.#html }
    get addTokens() { return this.#addTokens };
    get getSortedTokens() { return this.#getSortedTokens };
    get getDirectionCoords() { return this.#getDirectionCoords };
    get findEmptyCoords() { return this.#findEmptyCoords };
    get moveTokenToCoords() { return this.#moveTokenToCoords };
    get getTokenForCoords() { return this.#getTokenForCoords };
    get removeToken() { return this.#removeToken };
    get addNewToken() { return this.#addNewToken };

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #createFields() {
        this.#fields = new Array(this.#options.ySize);
        for (let i = 0; i < this.#fields.length; i++) {
            const row = new Array(this.#options.xSize);
            for (let j = 0; j < row.length; j++) {
                const coordinates = { y: i, x: j };
                row[j] = new Field(coordinates);
            }
            this.#fields[i] = row;
        }
    }

    // ------------------------

    #addTokens(tokens) {
        const coords = [];
        for (let y = 0; y < this.#fields.length; y++) {
            const row = this.#fields[y];
            for (let x = 0; x < row.length; x++) {
                const coord = { y: y, x: x };
                coords.push(coord);
            }
        }

        tokens.forEach(token => {
            if (!coords.length) {
                console.warn("The board is full. Remaining tokens have been omitted.");
                return;
            };
            if (coords.length) {
                const result = (Math.floor(Math.random() * (coords.length - 1)));
                const fieldCoord = coords[result];
                const y = fieldCoord.y;
                const x = fieldCoord.x;
                coords.splice(result, 1);
                this.#fields[y][x].content = token;
            }
        });
    }

    // ------------------------

    #createHTML() {
        this.#html = document.createElement("div");
        this.#html.classList.add("board");
        let style = `grid-template-columns: repeat(${this.#options.xSize}, auto);`;
        style += `grid-template-rows: repeat(${this.#options.ySize}, auto)`;
        this.#html.setAttribute("style", style);
        this.#fields.forEach(row => {
            row.forEach(field => {
                this.#html.appendChild(field.html);
            });
        });
    }

    // ------------------------

    /**
     * @param {object} coords
     * @param {Number} coords.y
     * @param {Number} coords.x
     * @returns {Field}
     */
    #getFieldForCoords(coords) {
        const field = this.#fields[coords.y][coords.x];
        return field;
    }

    // ------------------------

    /**
     * @returns {Token[]}
     */
    #getSortedTokens() {
        const tokens = [];
        for (let i = 0; i < this.#fields.length; i++) {
            const row = this.#fields[i];
            for (let j = 0; j < row.length; j++) {
                const field = row[j];
                if (field.content) tokens.push(field.content);
            }
        }
        return tokens;
    }

    // ------------------------

    /**
     * @param {object} baseCoords 
     * @param {String} direction 
     * @returns {object|null}
     */
    #getDirectionCoords(baseCoords, direction) {
        const coords = { ...baseCoords };
        switch (direction) {
            case "left":
                coords.x -= 1;
                break;
            case "right":
                coords.x += 1;
                break;
            case "up":
                coords.y -= 1;
                break;
            case "down":
                coords.y += 1;
                break;
            default:
                console.error("Not suported direction.");
                return null;
        }
        if (coords.x < this.#options.xSize && coords.y < this.#options.ySize && coords.x >= 0 && coords.y >= 0) return coords;
        return null;
    }

    // ------------------------

    /**
     * @param {object[]} coords 
     * @returns {object|null}
     */
    #findEmptyCoords(coords) {
        for (let i = 0; i < coords.length; i++) {
            const coordinates = coords[i];
            const field = this.#fields[coordinates.y][coordinates.x];
            if (!field.content) return coordinates;
        }
        return null;
    }

    // ------------------------

    /**
     * @param {object} coords 
     * @param {Number} coords.x
     * @param {Number} coords.y
     * @returns {Token|null}
     */
    #getTokenForCoords(coords) {
        const field = this.#fields[coords.y][coords.x];
        const token = field.content;
        return token;
    }

    // ------------------------

    #checkIfCoordsMatchTheBoard(coords) {
        const coordsMatch = true;
        if (coords.x + 1 > this.#options.xSize || coords.y + 1 > this.#options.ySize || coords.x < 0 || coords.y < 0) {
            coordsMatch = false;
        }
        return coordsMatch;
    }

    // ------------------------

    /**
     * @param {Token} token 
     * @param {object} targetCoords 
     * @returns 
     */
    #moveTokenToCoords(token, targetCoords) {
        const coordsMatch = this.#checkIfCoordsMatchTheBoard(targetCoords);
        if (!coordsMatch) return console.error("Coordinates go beyond the board.");

        const targetField = this.#fields[targetCoords.y][targetCoords.x];
        if (targetField.content) return console.error("The field is occupied, the token cannot be moved.");

        const currentField = this.#getFieldForCoords(token.coordinates);
        currentField.content = null;
        targetField.content = token;
    }

    // ------------------------

    #removeToken(token) {
        const field = this.#fields[token.coordinates.y][token.coordinates.x];
        field.content = null;
    }

    // ------------------------

    #addNewToken({ token, coords }) {
        const field = this.#getFieldForCoords(coords);
        if (field.content) return console.error("Given coordinates are occupied. Token cannot be added. ");
        field.content = token;
    }
}

export { Board };
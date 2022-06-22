import { Board } from "../board";
import { SpeedManager } from "../speed-manager";
import { Token } from "../token";

class Action {
    /* ------------------------ */
    /* Protected properties     */
    /* ------------------------ */

    _board;
    _speedManager;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * @param {Board} board                 Reference to the game board.
     * @param {SpeedManager} speedManager   Speed Manager reference.
     */
    constructor(board, speedManager) {
        this._board = board;
        this._speedManager = speedManager;
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get execute() { return this._execute };

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async _execute() {
        console.warn("Not implemented virual method.");
    }

    // ------------------------

    /**
     * @returns {Token[]}
     */
    _getSortedTokens() {
        const sortedTokens = this._board.getSortedTokens();
        return sortedTokens;
    }

    // ------------------------

    /**
     * 
     * @param {Token} token 
     * @param {String[]} directions 
     * @returns {object[]}
     */
    _getDirectionsCoords(token, directions) {
        const directionsCoords = [];
        directions.forEach(direction => {
            const directionCoords = this._board.getDirectionCoords(token.coordinates, direction);
            if (directionCoords) directionsCoords.push(directionCoords);
        });
        return directionsCoords;
    }

    // ------------------------

    /**
     * @param {object[]} coords 
     * @returns {Token[]}
     */
    _getTokensForCoords(coords) {
        const tokens = [];
        coords.forEach(coordynates => {
            const token = this._board.getTokenForCoords(coordynates);
            if (token) tokens.push(token);
        });
        return tokens;
    }

    // ------------------------

    /**
     * @param {Array} arr 
     * @returns {*}
     */
    _drawFromArray(arr) {
        const random = (Math.floor(Math.random() * (arr.length - 1)));
        const result = arr[random];
        return result;
    }

    // ------------------------

    _delay() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, this._speedManager.delay);
        })
    }
}

export { Action };
import { Action } from "./action";

class Moving extends Action {
    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async _execute() {
        const sortedTokens = this._getSortedTokens();
        for (let i = 0; i < sortedTokens.length; i++) {
            const token = sortedTokens[i];
            const movementDirections = token.movementDirections;
            const directionsCoords = this._getDirectionsCoords(token, movementDirections);
            const target = this._board.findEmptyCoords(directionsCoords);
            if (target) {
                await this._delay();
                this._board.moveTokenToCoords(token, target);
            };
        }
    }
}

export { Moving };
import { Action } from "./action";

class Eating extends Action {
    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async _execute() {
        const sortedTokens = this._getSortedTokens();
        for (let i = 0; i < sortedTokens.length; i++) {
            const token = sortedTokens[i];
            if (token.isEater) {
                const eatableNaighbors = [];
                const eatingDirections = token.eatingDirections;
                const eatingCoords = this._getDirectionsCoords(token, eatingDirections);
                const neighbors = this._getTokensForCoords(eatingCoords);
                neighbors.forEach(neighbor => {
                    if (neighbor.isEatable) eatableNaighbors.push(neighbor);
                });

                if (eatableNaighbors.length) {
                    const victim = this._drawFromArray(eatableNaighbors);
                    await this._delay();
                    this._board.removeToken(victim);
                }
            }
        }
    }
}

export { Eating };
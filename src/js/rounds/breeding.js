import { Action } from "./action";
import { EventsManager } from "../events-manager";

class Breeding extends Action {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #events;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * @param {Board} board 
     * @param {SpeedManager} speedManager
     */
    constructor(board, speedManager) {
        super(board, speedManager);
        this.#events = new EventsManager();
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get events() { return this.#events };

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async _execute() {
        const sortedTokens = this._getSortedTokens();
        const maleTokens = sortedTokens.filter(token => token.gender == "male");
        const potentialMothers = sortedTokens.filter(token => token.gender == "female");
        for (let i = 0; i < maleTokens.length; i++) {
            const token = maleTokens[i];
            const breedingDirections = token.breedingDirections;
            const breedingCoords = this._getDirectionsCoords(token, breedingDirections);
            const neighbors = this._getTokensForCoords(breedingCoords);
            const specie = token.specie;
            const sameSpecieNeighbors = neighbors.filter(neighbor => neighbor.specie == specie)
            const femaleNeighbors = sameSpecieNeighbors.filter(neighbor => neighbor.gender == "female");
            const potentialMothersNeighbors = [];
            femaleNeighbors.forEach(femailNeighbor => {
                if (potentialMothers.includes(femailNeighbor)) potentialMothersNeighbors.push(femailNeighbor);
            });
            const mother = this._drawFromArray(potentialMothersNeighbors);
            if (mother) {
                const childIsMade = await this.#tryToMakeChild(mother);
                if (childIsMade) {
                    const motherIndex = potentialMothers.indexOf(mother);
                    potentialMothers.splice(motherIndex, 1);
                }
            }
        }
    }

    // ------------------------

    async #tryToMakeChild(mother) {
        const childDirections = mother.childDirections;
        const directionsCoords = this._getDirectionsCoords(mother, childDirections);
        const emptyCoords = [];
        directionsCoords.forEach(coords => {
            const content = this._board.getTokenForCoords(coords);
            if (!content) emptyCoords.push(coords);
        });
        const targetCoords = this._drawFromArray(emptyCoords);
        const specie = mother.specie;
        if (targetCoords) {
            await this._delay();
            this.#events.emit("create animal", { specie: specie, coords: targetCoords })
            return true;
        };
        return false;
    }
}

export { Breeding };
import { Game } from "./game";

async function main() {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const game = new Game(div);
}

main();
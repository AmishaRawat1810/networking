import { fetchAndAddPokemon } from "./addPoke.js";

const b = {};
await fetchAndAddPokemon(b, "darkrai");
Deno.writeTextFileSync("./darkrai.json", JSON.stringify(b));

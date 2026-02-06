import { addFileRoutes } from "./files_route.js";
import { createPokemonsFiles } from "./addPoke.js";

export const pokemonData = await createPokemonsFiles({});
export const FILES_ROUTE = addFileRoutes(pokemonData, {
  "/pokemon/": "./pokemon/pikachu.json",
  "/": "./index.html",
  "/addPokemon.html": "./addPokemon.html",
  "/seeAll.html": "./seeAll.html",
});

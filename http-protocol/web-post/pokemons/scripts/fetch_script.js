const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getPokemonStats = (stats) =>
  stats
    .filter(({ stat }) => !stat.name.startsWith("special"))
    .reduce((acc, { base_stat, stat }) => {
      acc[stat.name] = base_stat;
      return acc;
    }, {});

const filterData = (json) => {
  const pokemon = {};
  const { base_experience, name, sprites, stats, types, weight } = json;
  pokemon["img"] = sprites.other["official-artwork"].front_default;
  pokemon["name"] = name;
  pokemon["types"] = types.map(({ type }) => type.name);
  pokemon["weight"] = weight;
  pokemon["xp"] = base_experience;
  pokemon["stats"] = getPokemonStats(stats);
  return pokemon;
};

const getAllPokemonsData = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const pokemons = [];

  for (let id = 1; id < 1026; id++) {
    const json = await fetchData(`${url}${id}`);
    const data = filterData(json);
    pokemons.push(data);
  }

  const data = JSON.stringify(pokemons);
  Deno.writeTextFileSync("./pokemons.json", data, { write: true });
};

getAllPokemonsData();

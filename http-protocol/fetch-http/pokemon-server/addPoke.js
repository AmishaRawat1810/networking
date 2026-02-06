const parseData = (data, random = Math.random) => {
  const moves = [];
  const name = data["species"]["name"];

  data["moves"].forEach((move) => {
    const pokiMove = move["move"]["name"];
    const movePoints = Math.floor(random() * 99);
    moves.push({ move: pokiMove, points: movePoints });
  });

  return { name, moves };
};

export const fetchAndAddPokemon = async (pokemonDetails, number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
  const data = await fetch(url).then((res) => res.json());
  const { name, moves } = parseData(data);
  if (!(name in pokemonDetails)) pokemonDetails[name] = { name, moves };
};

const aggregatePokeData = async (pokemonDetails) => {
  for (let number = 1; number <= 50; number++) {
    await fetchAndAddPokemon(pokemonDetails, number);
  }
  return pokemonDetails;
};

export const createPokemonsFiles = async (pokemonDetails) => {
  await aggregatePokeData(pokemonDetails);

  for (const pokemon of Object.keys(pokemonDetails)) {
    const data = pokemonDetails[pokemon];
    Deno.writeTextFileSync(`./pokemon/${pokemon}.json`, JSON.stringify(data));
  }

  return pokemonDetails;
};

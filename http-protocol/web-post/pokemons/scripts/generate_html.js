const capitalise = (text) => {
  const words = text.split(" ");
  return words.map((word) =>
    word.length < 3
      ? `${word.toUpperCase()}`
      : `${word[0].toUpperCase()}${word.slice(1)} `
  ).join("").trim();
};

const createImgBlock = (img, name) => `
        <div class="card-img">
          <img
            src=${img}
            alt=${name}>
        </div>`;

const createNameBlock = (name) => `
            <div id="name">
              <h3>${capitalise(name)}</h3>
            </div>`;

const createTypeBlock = (types) =>
  types.map((type) => `
    <div class="type ${type}">
      <p>${capitalise(type)}</p>
    </div>`).join("\n");

const addStat = (stat, value, accumulator) => {
  const template = `
            <tr>
              <td>${capitalise(stat)}</td>
              <td>${value}</td>
            </tr>`;
  accumulator.push(template);
};

const createStatsBlock = (weight, xp, stats) => {
  const accumulator = [];
  const allStats = [
    ...Object.entries(stats),
    ["Weight", weight],
    ["Base XP", xp],
  ];

  for (const [stat, value] of allStats) {
    addStat(stat, value, accumulator);
  }

  const statsTable = `
            <table>
              ${accumulator.join("\n")}
            </table>
  `;

  return statsTable;
};

const generateCard = (pokemon, id) => {
  const card = `
      <div class="card">
          ${createImgBlock(pokemon.img, pokemon.name)}

        <div class="card-desc">

          <div class="title">
            ${createNameBlock(pokemon.name)}

            <div class="types">
              ${createTypeBlock(pokemon.types, id)}
            </div>
          </div>

          ${createStatsBlock(pokemon.weight, pokemon.xp, pokemon.stats)}
        </div>
      </div>
  `;
  return card;
};

const addGoBackButton = () => {
  return `
  <form action="/" method="post">
      <button type="submit">go back</button>
  </form>
  `;
};

const generateHTMLPage = (cards, filePath) => {
  const root = filePath.includes("index.html") ? "./" : "../";
  const html = `
  <html>
  <head>
    <title>Pokedex</title>
  <link rel="stylesheet" href="${root}styles/style.css">
  <link rel="stylesheet" href="${root}styles/colors.css">
  </head>

  <body>
    <main>
      <div class="container">
        ${cards}
      </div>
      ${addGoBackButton()}
    </main>
  </body>
  </html>
  `;
  Deno.writeTextFileSync(filePath, html);
};

const getPokemonTypes = (pokemons) => {
  const typesMap = {};
  pokemons.forEach((pokemon, index) => {
    pokemon.types.forEach((type) => {
      if (!typesMap[type]) typesMap[type] = [];
      typesMap[type].push(index);
    });
  });
  return typesMap;
};

const generateCategoriesPages = (typesMap, allTypeNames, allCards) => {
  generateHTMLPage(allCards.join("\n"), "./index.html");

  allTypeNames.forEach((type) => {
    const typeCards = typesMap[type].map((id) => allCards[id]).join("\n");
    generateHTMLPage(typeCards, `./pages/${type}.html`);
  });
};

const generateCardsPages = (pokemons) => {
  pokemons.map((pokemon, id) => {
    const card = generateCard(pokemon, id);
    generateHTMLPage(card, `./pages/cards/${pokemon.name}.html`);
  });
};

const main = (filePath = "./data/pokemons.json") => {
  const data = Deno.readTextFileSync(filePath);
  const pokemons = JSON.parse(data);

  const typesMap = getPokemonTypes(pokemons);
  const allTypeNames = Object.keys(typesMap).sort();

  const allCards = pokemons.map((pokemon) => generateCard(pokemon));
  generateCategoriesPages(typesMap, allTypeNames, allCards);
  generateCardsPages(pokemons);
};

main();

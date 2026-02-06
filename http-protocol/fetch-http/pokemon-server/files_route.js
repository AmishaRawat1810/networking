export const addFileRoutes = (pokemonDetails, FILES_ROUTE) => {
  for (const name of Object.keys(pokemonDetails)) {
    const [urlPath, routePath] = [`/pokemon/${name}`, `./pokemon/${name}.json`];
    if (!(urlPath in FILES_ROUTE)) FILES_ROUTE[urlPath] = routePath;
  }
  return FILES_ROUTE;
};

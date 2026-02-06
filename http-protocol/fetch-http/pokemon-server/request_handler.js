import { fetchAndAddPokemon } from "./addPoke.js";
import { FILES_ROUTE, pokemonData } from "./global.js";

const handleGetRequest = (urlPath, readFile) => {
  try {
    const path = FILES_ROUTE[urlPath];
    const body = readFile(path);

    return new Response(body, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
  } catch {
    return new Response("404 NOT FOUND", {
      method: "GET",
      headers: {
        "content-type": "text/plain",
      },
    });
  }
};

const handlePostRequest = async (urlPath, writeFile) => {
  const [name] = urlPath.match(/([^\/]+)$/g);
  await fetchAndAddPokemon(pokemonData, name);

  if (!(name in FILES_ROUTE)) {
    writeFile(`./pokemon/${name}.json`, JSON.stringify(pokemonData[name]));
    FILES_ROUTE[`/pokemon/${name}`] = `./pokemon/${name}.json`;

    return new Response("Added Successfully", {
      staus: 201,
      headers: { "content-type": "text/plain" },
    });
  }

  return new Response("Already exists", {
    staus: 409,
    statusText: "Conflict : Pokemon already exists",
    headers: {
      "content-type": "text/plain",
    },
  });
};

export const requestHandler = async (request, readFile) => {
  const urlPath = new URL(request.url).pathname;
  const method = request.method;

  if (method === "GET") {
    return handleGetRequest(urlPath, readFile);
  }

  if (urlPath.includes("/pokemon/add/") && method === "POST") {
    const writeFile = Deno.writeTextFileSync;
    return await handlePostRequest(urlPath, writeFile);
  }
};

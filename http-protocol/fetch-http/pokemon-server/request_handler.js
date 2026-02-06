import { FILES_ROUTE } from "./global.js";

const getRequest = (urlPath, readFile) => {
  try {
    const path = FILES_ROUTE[urlPath];
    console.log({ urlPath, path, FILES_ROUTE });
    const body = JSON.parse(readFile(path));
    return new Response(JSON.stringify(body), {
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

export const requestHandler = (request, readFile) => {
  const urlPath = new URL(request.url).pathname;
  const method = request.method;

  if (method === "GET") {
    return getRequest(urlPath, readFile);
  }

  if (urlPath.includes("/pokemon/add/") && method === "POST") {
    Deno.writeTextFileSync("./pokemon.json", pokemonsData.body, {
      append: true,
    });
    return new Response("done", {
      headers: {
        "content-type": "text/plain",
      },
    });
  }
};

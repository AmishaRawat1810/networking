import { createResponse } from "./response_methods.js";

const readFile = (filePath) => Deno.readTextFileSync(filePath);

const routes = {
  "/": (data, contentType, statusCode) =>
    createResponse(data, contentType, statusCode),
  "/index.html": (data, contentType, statusCode) =>
    createResponse(data, contentType, statusCode),
};

export const requestHandler = (request) => {
  const { path } = request;
  if ((!path) in routes) mapResponse["/notFound"];

  const data = readFile(routes[path]);
  const contentType = "text/html";

  return routes[path](data, contentType, 200);
};

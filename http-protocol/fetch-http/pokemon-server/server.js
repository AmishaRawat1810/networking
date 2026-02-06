import { requestHandler } from "./request_handler.js";

const main = () => {
  const readFile = (filePath) => Deno.readTextFileSync(filePath);
  Deno.serve(async (request) => await requestHandler(request, readFile));
};

main();

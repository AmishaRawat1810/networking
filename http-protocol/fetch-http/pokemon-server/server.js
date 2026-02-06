import { requestHandler } from "./request_handler.js";

const main = () => {
  const readFile = (filePath) => Deno.readTextFileSync(filePath);
  Deno.serve((request) => requestHandler(request, readFile));
};

main();

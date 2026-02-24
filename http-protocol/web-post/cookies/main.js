import { requestHandler } from "./src/serve.js";

const main = () => {
  Deno.serve({ port: 8000 }, requestHandler);
};

main();

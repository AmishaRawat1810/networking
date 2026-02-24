import { requestHandler } from "./scripts/serve.js";

const main = () => {
  Deno.serve({ port: 8000 }, requestHandler);
};

main();

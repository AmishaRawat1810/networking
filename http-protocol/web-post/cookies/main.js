import { createRequestHandler } from "./src/serve.js";

const main = async () => {
  const requestHandler = await createRequestHandler("./data/userInfo.json");
  Deno.serve(requestHandler);
};

main();

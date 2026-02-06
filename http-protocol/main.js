import { requestHandler } from "./server-src/request_handler.js";
import { serve } from "./server-src/server.js";

const main = async () => {
  await serve(8000, requestHandler);
};

await main();

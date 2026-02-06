import { getResponseParams, sendResponse } from "./handleResponse.js";
import { parseRequest } from "./handleRequest.js";

const handleConnection = async (conn) => {
  const request = await parseRequest(conn);
  const params = getResponseParams(request);
  await sendResponse(conn, params);
};

const server = async (port = 8000) => {
  const listener = await Deno.listen({ port, transport: "tcp" });
  console.log(`Server connection established`);
  for await (const conn of listener) {
    handleConnection(conn);
  }
};

await server();

import { parseRequest } from "./request_utils.js";
import { sendResponse } from "./response_utils.js";

const handleConnection = async (conn, requestHandler) => {
  const request = await parseRequest(conn);
  const response = requestHandler(request);
  await sendResponse(conn, response);
};

export const serve = async (port, requestHandler) => {
  const listener = await Deno.listen({ port, transport: "tcp" });
  console.log(`Server connection established ...`);

  for await (const conn of listener) {
    handleConnection(conn, requestHandler);
  }
};

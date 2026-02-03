import { filePaths, parseRequest, sendResponse } from "./handleRequest.js";

const handleConnection = async (conn) => {
  const request = await parseRequest(conn);
  const path = !(request.path in filePaths)
    ? "./notFound.html"
    : filePaths[path];

  await sendResponse(path, request);
};

const server = async (port = 8000) => {
  const listener = await Deno.listen({ port, transport: "tcp" });
  console.log(`Server connection established`);
  for await (const conn of listener) {
    handleConnection(conn);
  }
};

await server(port);

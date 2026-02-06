const port = 8000;
const hostname = "10.132.126.169";
const listener = Deno.listen({ port, hostname, transport: "tcp" });
const CONNECTIONS = [];
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const formatResponse = (buffer, nBytes) => {
  const request = buffer.slice(0, nBytes);
  const decodedRequest = decoder.decode(request);
  return decodedRequest.toUpperCase();
};

const handleConnection = async (conn) => {
  const buffer = new Uint8Array(1024);
  while (true) {
    const nBytes = await conn.read(buffer);
    if (nBytes === null) break;
    CONNECTIONS.forEach(async (connection) => {
      if (connection !== conn) {
        const response = formatResponse(buffer, nBytes);
        await connection.write(encoder.encode(response));
      }
    });
  }
};

const main = async () => {
  console.log(`Listening on ${hostname} : ${port}...`);
  for await (const conn of listener) {
    CONNECTIONS.push(conn);
    handleConnection(conn);
  }
};

await main();

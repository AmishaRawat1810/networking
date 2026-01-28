let count = 0;
const listener = Deno.listen({
  "port": 8000,
  "transport": "tcp",
});

const writer = Deno.stdout.writable.getWriter();
const decoder = new TextDecoder();

for await (const conn of listener) {
  console.clear();
  while (true) {
    //
    ++count;

    //Read from the connection and show it in the source's terminal
    const buf = new Uint8Array(1024);
    const bytesRead = await conn.read(buf);
    const response = buf.slice(0, bytesRead);
    const decodedResponse = decoder.decode(response);

    if (decodedResponse.trim() === "exit") {
      conn.writable.getWriter().write("See you again...");
      break;
    }
    writer.write(response);
  }
  conn.close();
}

console.log("THE END");

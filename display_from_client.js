const listener = Deno.listen({
  "port": 8000,
  "transport": "tcp",
});

const writer = Deno.stdout.writable.getWriter();
const decoder = new TextDecoder();

const writeFromClient = async (listener) => {
  for await (const conn of listener) {
    console.clear();
    const buf = new Uint8Array(1024);

    while (true) {
      //Read from the connection and show it in the source's terminal
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
};

await writeFromClient(listener);
console.log("THE END");

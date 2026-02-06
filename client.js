const port = 8000;
const client = "10.132.126.169";
const conn = await Deno.connect({ port, hostname: client });

await conn.write(new TextEncoder().encode("Hello"));
const buffer = new Uint8Array(200);

const n = await conn.read(buffer);
const decoder = new TextDecoder();
console.log(decoder.decode(buffer.slice(0,n)));

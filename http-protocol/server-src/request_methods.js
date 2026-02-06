export const parseRequest = async (conn) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(596);
  const readBytes = await conn.read(buffer);

  if (!readBytes) {
    conn.close();
    return;
  }

  const data = buffer.slice(0, readBytes);
  const request = decoder.decode(data);
  const [readlines] = request.split("\r\n");
  const [method, path, protocol] = readlines.split(" ");

  return { method, path, protocol };
};

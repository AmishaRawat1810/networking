const decoder = new TextDecoder();

const filePaths = {
  "/": "./index.html",
  "/index.html": "./index.html",
  "/pink.html": "./pink.html",
  "/blue.html": "./blue.html",
  "/purple.html": "./purple.html",
};

export const parseRequest = async (conn) => {
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

  const selectedPath = !(request.path in filePaths)
    ? "./html-files/notFound.html"
    : filePaths[path];

  return { method, selectedPath: selectedPath, protocol };
};

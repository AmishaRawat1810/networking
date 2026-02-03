const decoder = new TextDecoder();
const encoder = new TextEncoder();

const prepareResponse = (path, protocol, statusCode, msg) => {
  const response = {
    line: `${protocol} ${statusCode} ${msg}`,
    headers: { "content-type": "text/html" },
  };

  response.body = Deno.readTextFileSync(path);
  response.headers["content-length"] = response.body.length;
};

export const sendResponse = async (path, protocol, statusCode, msg) => {
  const response = prepareResponse(path, protocol, statusCode, msg);
  const encodedResponse = encoder.encode(response);
  await conn.write(encodedResponse);
};

export const filePaths = {
  "/": "./index.html",
  "index.html": "./index.html",
  "pink.html": "./pink.html",
  "blue.html": "./blue.html",
  "purple.html": "./purple.html",
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

  return { method, path, protocol };
};

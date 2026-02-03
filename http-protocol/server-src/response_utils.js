const formatHeader = (headers) => {
  return Object.entries(headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\r\n");
};

export const updateResponse = (path, response, code, msg) => {
  response.readLine = createResponseLine(protocol, code, msg);
  response.body = Deno.readTextFileSync(path);
  response.headers["content-length"] = response.body.length;
  return response;
};

export const createResponseLine = (protocol, statusCode, msg) => {
  return `${protocol} ${statusCode} ${msg}`;
};

export const sendResponse = async (conn, response) => {
  const encoder = new TextEncoder();
  response.headers = formatHeader(response.headers);
  const response = [...Object.values(response)].join("\r\n");
  await conn.write(encoder.encoder(response));
};

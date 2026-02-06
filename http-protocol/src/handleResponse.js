const encoder = new TextEncoder();

export const getResponseParams = (request) => {
  const params = {};
  params.path = request.selectedPath;
  params.protocol = request.protocol;

  if (params.path === "./html-files/notFound.html") {
    params.statusCode = 404;
    params.msg = "NOT FOUND";
    return params;
  }

  params.statusCode = 200;
  params.msg = "OK";
  return params;
};

const prepareResponse = (path, protocol, statusCode, msg) => {
  const response = {
    line: `${protocol} ${statusCode} ${msg}`,
    headers: { "content-type": "text/html" },
    newLine: "",
  };

  response.body = Deno.readTextFileSync(path);
  response.headers["content-length"] = response.body.length;

  return [...Object.entries(response)].join("\r\n");
};

export const sendResponse = async (conn, args) => {
  const { path, protocol, statusCode, msg } = args;

  const response = prepareResponse(path, protocol, statusCode, msg);
  const encodedResponse = encoder.encode(response);

  await conn.write(encodedResponse);
};

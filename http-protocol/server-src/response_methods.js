const formatHeader = (headers) => {
  return Object.entries(headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\r\n");
};

const STATUS_MSG = {
  200: "OK",
  404: "NOT_FOUND",
};

export const createResponse = (data, contentType, statusCode) => {
  const response = {
    body: data,
    statusCode,
    statusDesc: STATUS_MSG[statusCode],
    headers: {
      "Content-Type": contentType,
      "Content-Length": data.length,
    },
  };
  return response;
};

export const createResponseLine = (protocol, statusCode, msg) => {
  return `${protocol} ${statusCode} ${msg}`;
};

export const sendResponse = async (conn, request, response) => {
  const encoder = new TextEncoder();
  const headers = formatHeader(response.headers);
  const lines = [
    createResponseLine(
      request.protocol,
      response.statusCode,
      response.statusDesc,
    ),
    headers,
    "",
    response.body,
  ];

  const formatted = lines.join("\r\n");
  console.log(formatted);
  await conn.write(encoder.encode(formatted));
};

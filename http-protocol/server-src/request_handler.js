import { createResponseLine, updateResponse } from "./response_utils.js";

export const requestHandler = (request) => {
  const { path, protocol } = request;

  const response = {
    responseLine: "",
    headers: { "content-type": "text/html" },
    newLine: "",
  };

  switch (path) {
    case "../html-files/index.html": {
      updateResponse(path, response, 200, "OK");
      return response;
    }
    case "../html-files/pink.html": {
      updateResponse(path, response, 200, "OK");
      return response;
    }
    case "../html-files/blue.html": {
      updateResponse(path, response, 200, "OK");
      return response;
    }
    case "../html-files/purple.html": {
      updateResponse(path, response, 200, "OK");
      return response;
    }
    default: {
      response.responseLine = createResponseLine(protocol, 404, "NOT FOUND");
      response.body = "";
      return response;
    }
  }
};

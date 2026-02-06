export const requestHandler = async (request, interns) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path === "/interns" && method === "GET") {
    return new Response(JSON.stringify(interns), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  if (path === "/interns/create" && method === "POST") {
    const newIntern = await request.json();
    interns.push(newIntern);
    return new Response(JSON.stringify(interns), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response({
    body: "NOT FOUND",
    headers: {
      "content-type": "text/plain",
    },
  });
};

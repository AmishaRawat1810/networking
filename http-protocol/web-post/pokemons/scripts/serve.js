const servePokemon = async (req) => {
  const reqBody = await req.text();
  const searchParams = new URLSearchParams(reqBody);
  const pokemon = searchParams.get("pokemon");
  const body = Deno.readTextFileSync(`./pages/cards/${pokemon}.html`);
  const headers = new Headers();
  headers.append("content-type", "text/html");
  return new Response(body, { headers });
};

const serveHomepage = () => {
  const body = Deno.readTextFileSync("./getRequest.html");
  return new Response(body, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveNotFound = () => {
  const body = "<h1>Not Found</h1>";
  return new Response(body, {
    status: 404,
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveCategory = (urlPath) => {
  const category = urlPath.slice(1);
  try {
    const body = Deno.readTextFileSync(`./pages/${category}.html`);
    const headers = new Headers();
    headers.append("content-type", "text/html");

    return new Response(body, { status: 200, headers });
  } catch {
    return serveNotFound();
  }
};

const serveStyle = (urlPath) => {
  try {
    const body = Deno.readTextFileSync(`.${urlPath}`);
    const headers = new Headers();
    headers.append("content-type", "text/css");

    return new Response(body, { status: 200, headers });
  } catch {
    return serveNotFound();
  }
};

const serveForm = async (req) => {
  const body = await req.text();
  const searchParams = new URLSearchParams(body);
  const category = searchParams.get("category");

  if (category && category !== "none") {
    //redirect to the category
    const headers = new Headers();
    headers.append("location", `/${category}`);

    return new Response(null, {
      status: 303,
      headers,
    });
  }

  //redirect to home
  return new Response(null, {
    status: 303,
    headers: { location: "/category" },
  });
};

const serveGetRequest = (urlPath) => {
  if (urlPath === "/category") {
    return serveHomepage();
  }

  const isCategory = /^\/[a-z]+$/g.test(urlPath);

  if (isCategory) {
    return serveCategory(urlPath);
  }
  if (urlPath.includes(".css")) {
    return serveStyle(urlPath);
  }
};

export const requestHandler = (req) => {
  const url = new URL(req.url);
  const urlPath = url.pathname;

  if (urlPath === "/category" && req.method === "POST") {
    return serveForm(req);
  }

  if (urlPath === "/pokemon" && req.method === "POST") {
    return servePokemon(req);
  }

  if (req.method === "GET") {
    return serveGetRequest(urlPath);
  }

  return serveNotFound();
};

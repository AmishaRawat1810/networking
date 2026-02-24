export const requestHandler = (req) => {
  const url = new URL(req.url);
  req.pathname = url.pathname;

  console.log({ pathname: req.pathname, method: req.method });

  if (url.pathname === "/") {
    return serveHomepage();
  }

  if (url.pathname === "/greet" && req.method === "POST") {
    return serveGreeting(req);
  }

  if (url.pathname === "/success") {
    return serveSuccessPage(url);
  }

  return notFoundPage();
};

const serveHomepage = () => {
  const body = Deno.readTextFileSync("./public/index.html");

  return new Response(body, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const getNameAndEmail = async (req) => {
  const body = await req.text();
  const parameters = new URLSearchParams(body);
  const { name, email } = Object.fromEntries(parameters.entries());
  return { name, email };
};

const serveGreeting = async (req) => {
  const { name, email } = await getNameAndEmail(req);
  const params = new URLSearchParams({ name, email });

  return new Response(null, {
    status: 303,
    headers: {
      location: `/success?${params.toString()}`,
    },
  });
};

const serveSuccessPage = (url) => {
  const parameters = new URLSearchParams(url.search);
  const { name, email } = Object.fromEntries(parameters.entries());
  const body = `<h1>Welcome ${name}! Contact: ${email}`;

  return new Response(body, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const notFoundPage = () => {
  const body = "<h1>NOT FOUND</h1>";
  return new Response(body, {
    status: 404,
    headers: {
      "content-type": "text/html",
    },
  });
};

const uploadFile = async (req) => {
  const formData = await req.formData();
  const file = formData.get("file");
  const fs = await Deno.open(`./uploads/${file.name}`, {
    create: true,
    write: true,
  });

  await file.stream().pipeTo(fs.writable);
  return new Response("OK");
};

const serveHomepage = () => {
  const body = Deno.readTextFileSync("./pages/index.html");
  const headers = new Headers();
  headers.append("content-type", "text/html");

  return new Response(body, { headers });
};

export const requestHandler = (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  console.log({ pathname, method: req.method });

  if (pathname === "/") {
    return serveHomepage();
  }

  if (pathname === "/upload" && req.method === "POST") {
    return uploadFile(req);
  }
};

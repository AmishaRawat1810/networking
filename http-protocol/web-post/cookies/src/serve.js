const serveHomepage = async () => {
  const body = await Deno.readFile("./public/pages/registration.html");
  const headers = new Headers();
  headers.append("content-type", "text/html");

  return new Response(body, { headers });
};

const addUserInfo = async (userInfo, filePath) => {
  const { firstname, lastname, username, email, contact, password } = userInfo;

  try {
    const rawData = await Deno.readTextFile(filePath);
    const data = JSON.parse(rawData);
    const newUser = { firstname, lastname, username, email, contact, password };
    data.push(newUser);
    await Deno.writeTextFile(filePath, JSON.stringify(data));

    return { success: true };
  } catch {
    return { success: false };
  }
};

const redirectToLogin = (success) => {
  if (!success) {
    return new Response("Error updating", { status: 500 });
  }

  const headers = new Headers();
  headers.set("location", "/login");
  return new Response(null, { status: 303, headers });
};

const serveRegistrationPage = async (request, filePath) => {
  const formData = await request.formData();
  const userInfo = Object.fromEntries(formData);
  const { success } = await addUserInfo(userInfo, filePath);
  return await redirectToLogin(success);
};

const serveLoginPage = async () => {
  const body = await Deno.readTextFile("./public/pages/login.html");
  const headers = new Headers();
  headers.set("content-type", "text/html");
  return new Response(body, { headers });
};

const requestHandler = (request, filePath) => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/" || path === "/homepage") {
    return serveHomepage();
  }

  console.log({ url, path });

  if (path === "/registration") {
    return serveRegistrationPage(request, filePath);
  }

  if (path === "/login") {
    return serveLoginPage();
  }
};

export const createRequestHandler = async (path = "./data/userInfo.json") => {
  await Deno.writeTextFile(path, "[]");
  return (request) => requestHandler(request, path);
};

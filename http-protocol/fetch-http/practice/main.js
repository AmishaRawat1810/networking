import { requestHandler } from "./main.js";

const main = () => {
  const interns = [{ name: "ABX", age: 20 }];
  Deno.serve((request) => requestHandler(request, interns));
};

main();

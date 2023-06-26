import http from "http";
import { StringDecoder } from "string_decoder";
import Watch from "../src/index.js";

function doSomething(data) {
  const { userId } = data;

  return userId;
}

const server = http.createServer(async (req, res) => {
  let buffer = "";
  let decoder = new StringDecoder("utf-8");

  req.on("data", chunk => {
    buffer += decoder.write(chunk);
  });

  req.on("end", () => {
    buffer += decoder.end();
    const body = JSON.parse(buffer);

    // Create a new Watch instance with the request body
    const handler = Watch.new(doSomething);

    /**
     * Would log in the server
     */
    // [2023-06-26T18:36:47.084Z]
    // action: calling method, property: null, args: {"userId":"123wdw123"}, returningValue: 123wdw123, on: doSomething
    handler(body);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

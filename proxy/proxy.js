const http = require("http");
const app = require("./config/express");

http.createServer(app).listen(3002, () => {
  console.log("Proxy load sucessfull");
}); 
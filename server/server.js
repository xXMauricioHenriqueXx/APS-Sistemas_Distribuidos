const app = require("./config/express");
const http = require("http");

http.createServer(app).listen(3001, () => {
	console.log("Server load successfull");
});

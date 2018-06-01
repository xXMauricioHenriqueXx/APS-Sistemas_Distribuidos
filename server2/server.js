const app = require("./config/express");
const http = require("http");

http.createServer(app).listen(3004, () => {
	console.log("Server load successfull. Load in port 3004");
});

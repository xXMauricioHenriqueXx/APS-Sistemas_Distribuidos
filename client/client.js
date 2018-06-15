let http = require("http");
let express = require("express");
let app = express();
let path = require("path");

http.createServer(app).listen(3003, () => {
	console.log("Client load sucessfull. Load in port 3003");
});

app.use(express.static('./app/public'));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname+'/app/public/index.html'));
});
app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname+'/app/public/login.html'));
});

app.get("/cadastro", (req, res) => {
	res.sendFile(path.join(__dirname+'/app/public/cadastro.html'));
});

app.get("/atualizacao", (req, res) => {
	res.sendFile(path.join(__dirname+'/app/public/atualizacao.html'));
});
const app = require("express").Router();
const ProxyController = require("../controllers/proxyController")();

app.post('/usuarios/insert', ProxyController.insert);
app.post("/auth", ProxyController.auth);
app.get("/usuarios", ProxyController.findAll);

module.exports = app;
const app = require("express").Router();
const Usuario = require("../controllers/usuarioController")();


app.get("/", (req, res) => {
	res.send("Hello");
});

app.get("/usuarios", Usuario.findAll);
app.get("/usuarios/:id", Usuario.findById);
app.post("/usuarios/insert", Usuario.insert);
app.delete("/usuarios/:id", Usuario.remove);
app.post("/auth", Usuario.remove);

module.exports = app;

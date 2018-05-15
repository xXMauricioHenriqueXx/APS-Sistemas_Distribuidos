const app = require("express").Router();
const Usuario = require("../controllers/UsuarioController")();


app.get("/", (req, res) => {
	res.send("Hello");
});

app.get("/usuarios", Usuario.findAll);
app.get("/usuarios/:id", Usuario.findById);
app.post("/usuarios/insert", Usuario.insert);

module.exports = app;

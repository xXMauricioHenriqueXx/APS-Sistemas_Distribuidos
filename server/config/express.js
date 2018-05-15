const app = require("express")();
const router = require("../app/router");

app.use(router);

module.exports = app;
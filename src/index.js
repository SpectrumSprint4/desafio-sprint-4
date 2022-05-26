const express = require("express");

const app = express();

app.use(express.json());
app.use(require("./routes"));
app.listen(process.env.PORT || 3000);
console.log("Servidor iniciado na porta 3000");
require("./controllers/funcionarios");

module.exports = app;

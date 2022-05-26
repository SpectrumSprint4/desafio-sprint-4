const express = require("express");
const db = require("./config/dbConnect");
const routes = require("./routes/index");

db.on("error", console.log.bind(console, "DB não conectado"));
db.once("open", () => {console.log("Conexão no BD feita com sucesso");});

const app = express();
app.use(express.json());
routes(app);

module.exports = app;
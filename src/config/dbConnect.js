const mongoose = require("mongoose");

const user = "";
const senha = "";

mongoose.connect(`mongodb+srv://${user}:${senha}@desafio-4.stdmzal.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;

module.exports = db;

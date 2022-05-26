const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/teste");

let db = mongoose.connection;

module.exports = db;
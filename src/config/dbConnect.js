const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/teste");

const db = mongoose.connection;

module.exports = db;
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://arthur:Compass134@desafio-4.stdmzal.mongodb.net/?retryWrites=true&w=majority");
mongoose.Promise = global.Promise;

module.exports = mongoose;
const mongoose = require("mongoose");

const produtosSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	category: {
		type: String, 
		required: true,
		unique: false
	},
	price: {
		type: Number,
		required: true,
		unique: false
	},
	employee_id: {
		type: String
	}	
});

const produtos = mongoose.model("Produtos", produtosSchema);

module.exports = produtos;
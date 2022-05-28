const mongoose = require("mongoose");

const produtosSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	category: {
		type: String, 
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	employee_id: {
		type: String
	}	
});

const produtos = mongoose.model("Produtos", produtosSchema);

module.exports = produtos;
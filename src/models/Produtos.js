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
		type: mongoose.Schema.Types.ObjectId,
		ref: "Funcionarios",
		require: true
	}	
});

const produtos = mongoose.model("Produtos", produtosSchema);

module.exports = produtos;
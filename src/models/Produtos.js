const mongoose = require("mongoose");

const produtosSchema = new mongoose.Schema({
	employee_id: {
		type: String
	},
	name: {
		type: String,
		required: true
	},
	category: {
		type: String, 
		required: true,
		unique: true
	},
	price: {
		type: String,
		required: true,
		unique: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

const produtos = mongoose.model("Produtos", produtosSchema);

module.exports = produtos;
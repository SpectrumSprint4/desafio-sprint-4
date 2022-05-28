const mongoose = require("mongoose");

const produtosSchema = new mongoose.Schema({
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
		type: parseFloat,
		required: true,
		unique: false
	},
	employee_id: {
		type: String
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
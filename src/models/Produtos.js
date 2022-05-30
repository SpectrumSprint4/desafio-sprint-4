const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

produtosSchema.plugin(mongoosePaginate);
const produtos = mongoose.model("Produtos", produtosSchema);

module.exports = produtos;
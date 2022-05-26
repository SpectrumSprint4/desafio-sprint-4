const mongoose = require("mongoose");

const funcionariosSchema = new mongoose.Schema({
	employee_id: {
		type: String
	},
	name: {
		type: String,
		required: true
	},
	cpf: {
		type: String, 
		required: true,
		unique: true
	},
	office: {
		type: String,
		required: true,
		enum: {
			values: ["gerente", "vendedor","caixa"],
			message: "Office não condiz com os cargos"
		}
	},
	numeroPaginas: {
		type: Number,
		required: true
	},
	birthday: {
		type: Date,
		required: true
	},
	situation: {
		type: String,
		required: true,
		enum: {
			values: ["active", "disabled"],
			message: "Situation deve ser active ou disabled"
		}
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

const funcionarios = mongoose.model("Funcionarios", funcionariosSchema);

module.exports = funcionarios;
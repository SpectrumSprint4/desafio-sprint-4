const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const funcionariosSchema = new mongoose.Schema({
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
			values: ["gerente", "vendedor", "caixa"],
			message: "Office não condiz com os cargos"
		}
	},
	birthday: {
		type: Date,
		required: true
	},
	situation: {
		type: String,
		required: true,
		default: "active",
		enum: {
			values: ["active", "deactivate"],
			message: "Situation deve ser active ou deactivate"
		}
	}
}, { timestamps: true }
);

funcionariosSchema.plugin(mongoosePaginate);

const funcionarios = mongoose.model("Funcionarios", funcionariosSchema);

module.exports = funcionarios;
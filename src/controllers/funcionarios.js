const funcionarios = require("../models/Funcionarios.js");

class FuncionariosController {
	static listarFuncionarios(req, res) {
		funcionarios.find((err, funcionarios ) => {
			res.status(200).json(funcionarios);
		});
	}

	static criarFuncionario(req, res) {
		const novofuncionario = new funcionarios (req.body);

		novofuncionario.save((err) => {
			if(err) {
				res.status(500).json({message: `${err.message} - Falha ao cadrastar o funcionário `});
			} else {
				res.status(201).json(novofuncionario);
			}
		});
	}
}

module.exports = FuncionariosController;
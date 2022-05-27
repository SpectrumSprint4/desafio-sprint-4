const funcionarios = require("../models/Funcionarios.js");

class FuncionariosController {
	static async listarFuncionarios(req, res) {
		try {
			const todosFuncionarios = await funcionarios.find();
			res.status(200).send(todosFuncionarios);
		} catch(error) {
			res.status(error.status).send(error);
		}
	}

	static async criarFuncionario(req, res) {
		try {
			await funcionarios.create(req.body);
			res.status(201).end();
		} catch(error) {
			res.status(400).send(error);
		}
	}
}

module.exports = FuncionariosController;
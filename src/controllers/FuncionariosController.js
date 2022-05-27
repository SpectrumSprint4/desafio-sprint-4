const funcionarios = require("../models/Funcionarios.js");

class FuncionariosController {
	static async listarFuncionarios(req, res) {
		try {
			const todosFuncionarios = await funcionarios.find();
			res.status(200).json(todosFuncionarios);
		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listarFuncionarioPorId(req, res) {
		const id = req.params.id;
		try {
			const funcionarioPorId = await funcionarios.findById(id);
			res.status(200).json(funcionarioPorId);
		} catch(error) {
			res.status(400).json({message: `Funcionário com o id ${id} não foi encontrado`});
		}
	}	

	static async criarFuncionario(req, res) {
		try {
			await funcionarios.create(req.body);
			res.status(201).json();
		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async atualizaFuncionario(req, res) {
		const id = req.params.id;
		try {
			await funcionarios.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).json({message: "Dados do funcionário foi atualizado"});
			
		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async apagaFuncionario(req, res) {
		const id = req.params.id;
		try {
			await funcionarios.findByIdAndDelete(id);
			res.status(200).json({message: `Funcionário com o id ${id} foi apagado com sucesso`});
			
		} catch(error) {
			res.status(400).json({message: `Funcionário com o id ${id} não foi encontrado`});
		}
	}
}

module.exports = FuncionariosController;
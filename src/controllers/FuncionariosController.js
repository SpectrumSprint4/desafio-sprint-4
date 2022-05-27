const funcionarios = require("../models/Funcionarios.js");
const moment = require("moment");

class FuncionariosController {
	static async listarFuncionarios(req, res) {
		try {
			const todosFuncionarios = await funcionarios.find();
			res.status(200).json(todosFuncionarios);
		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listarFuncionarioPorId(req, res, prox) {
		const id = req.params.id;
		try {
			const funcionarioPorId = await funcionarios.findById(id);
			if(funcionarioPorId == null) {
				res.status(404).json([{message: `Este id: ${id} não é de nenhum funcionário cadastrado`}]);
				return;
			}
			res.status(200).json(funcionarioPorId);
			prox();
		} catch(error) {
			res.status(400).json({message: `Este id: ${id} está fora do padrão do banco de dados`});
		}
	}	

<<<<<<< HEAD
	static async criarFuncionario(req, res) {		
		try {			
			await funcionarios.create(req.body);

	static async criarFuncionario(req, res) {
		try {
			const reqBody = req.body;
			const birthday = moment(reqBody.birthday, "DD/MM/YYYY").format("YYYY/MM/DD");
			await funcionarios.create({...reqBody, birthday});
>>>>>>> a52fec3e31fdb256ea4fcbd75374598abe56d695
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

	static async apagaFuncionario(req, res, prox) {
		const id = req.params.id;
		try {
			const funcionarioPorId = await funcionarios.findByIdAndDelete(id);
			if(funcionarioPorId == null) {
				res.status(404).json([{message: `Este id: ${id} não é de nenhum funcionário cadastrado`}]);
				return;
			}
			res.status(200).json({message: `Funcionário com o id ${id} foi apagado com sucesso`});
			prox();
		} catch(error) {
			res.status(400).json({message: `Este id: ${id} está fora do padrão do banco de dados`});
		}
	}
}

module.exports = FuncionariosController;
const funcionarios = require("../models/Funcionarios.js");
const moment = require("moment");

class FuncionariosController {
	static async listarFuncionarios(req, res) {
		try {
			const todosFuncionarios = await funcionarios.find();
			formataCpf(todosFuncionarios);
			res.status(200).json(todosFuncionarios);
		} catch (error) {
			res.status(400).json(error);
		}
	}

	static async listarFuncionarioPorQuery(req, res) {
		try {
			const { name, cpf, office, situation, birthday } = req.query;
			const nameSearch = new RegExp(name);

			const funcionarioPorQuery = await funcionarios.find({ name: nameSearch });
			const queryParams = funcionarioPorQuery[0];
			if (queryParams == null) {
				res.status(404).json([{
					message: "Bad request", details: [{
						message: "não foi possivel encontrar nenhuma informação com os dados inserirdos"
					}]
				}]);
				return;
			}
			const employees = funcionarioPorQuery;
			res.status(200).json({
				employees,
			});
		} catch (error) {
			res.status(400).json(error);
		}
	}

	static async listarFuncionarioPorId(req, res, prox) {
		const id = req.params.id;
		try {
			const funcionarioPorId = await funcionarios.findById(id);
			if (funcionarioPorId == null) {
				res.status(404).json([{
					message: "Bad request", details: [{
						message: `Este id: ${id} não é de nenhum funcionário cadastrado`}] }]);
				return;
			}
			formataCpf(funcionarioPorId);
			res.status(200).json(funcionarioPorId);
			prox();
		} catch (error) {
			res.status(400).json({ 
				message: "Bad request", details: [{
					message: `Este id: ${id} está fora do padrão do banco de dados`}] });
		}
	}

	static async criarFuncionario(req, res) {
		try {
			const reqBody = req.body;
			const birthday = moment(reqBody.birthday, "DD/MM/YYYY").format("YYYY/MM/DD");
			await funcionarios.create({ ...reqBody, birthday });
			res.status(201).json(res.body);
		} catch (error) {
			res.status(400).json(error);
		}
	}

	static async atualizaFuncionario(req, res) {
		const id = req.params.id;
		try {
			await funcionarios.findByIdAndUpdate(id, { $set: req.body });
			res.status(200).json({
				message: "Good request", details: [{
					message:  "Dados do funcionário foi atualizado" }]});

		} catch (error) {
			res.status(400).json(error);
		}
	}

	static async apagaFuncionario(req, res, prox) {
		const id = req.params.id;
		try {
			const funcionarioPorId = await funcionarios.findByIdAndDelete(id);
			if (funcionarioPorId == null) {
				res.status(404).json([{
					message: "Bad request", details: [{
						message: `Este id: ${id} não é de nenhum funcionário cadastrado` }] }]);
				return;
			}
			res.status(204).json({
				message: "Bad request", details: [{ 
					message: `Funcionário com o id ${id} foi apagado com sucesso` }]});
			prox();
		} catch (error) {
			res.status(400).json({ 
				message: "Bad request", details: [{
					message: `Este id: ${id} está fora do padrão do banco de dados` }]});
		}
	}
}

function formataCpf(funcionario) {
	if(Array.isArray(funcionario)) {
		const funcionarioFormatado = funcionario.map(teste => {
			const cpf = teste.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
			teste.cpf = cpf;
		});
		return funcionarioFormatado;
	} else {
		const cpf = funcionario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
		const funcionarioFormatado = funcionario.cpf = cpf;
		return funcionarioFormatado;
	}
}

module.exports = FuncionariosController;

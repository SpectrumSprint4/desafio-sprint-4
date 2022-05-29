const funcionarios = require("../models/Funcionarios.js");
const moment = require("moment");
const NotFound = require("../errors/NotFound.js");
// const IdForaDoPadrao = require("../errors/IdForaDoPadrao.js");

class FuncionariosController {
	static async listarFuncionarios(req, res) {
		try {
			const { name } = req.query;
			const nameSearch = new RegExp(name);
			const allSearch = req.query;
			if (name) {
				let funcionarioPorQuery = await funcionarios.find({name: nameSearch});
				const queryParams = funcionarioPorQuery[0];
				if (queryParams == null) {
					throw new NotFound(name);
				}
				const employees = funcionarioPorQuery;
				res.status(200).json({ employees });
			} else {
				let funcionarioPorQuery = await funcionarios.find(allSearch);

				const queryParams = funcionarioPorQuery[0];
				if (queryParams == null) {
					throw new NotFound(allSearch);
				}
				const employees = funcionarioPorQuery;
				res.status(200).json({ employees });
			}
		} catch (error) {
			res.status(404).json(error);
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
		let reqBody = req.body;
		if(reqBody.birthday) {
			const birthday = moment(reqBody.birthday, "DD/MM/YYYY").format("YYYY/MM/DD");
			reqBody = {...reqBody, birthday};
		}
		try {
			const funcionario = await funcionarios.findByIdAndUpdate(id, { $set: reqBody });
			if (funcionario == null) {
				res.status(404).json([{
					message: "Bad request", details: [{
						message: `Este id: ${id} não é de nenhum funcionário cadastrado` }] }]);
				return;
			}
			res.status(200).json({
				message: "Good request", details: [{
					message:  "Dados do funcionário foi atualizado" }]});
		} catch (error) {
			res.status(404).json({ 
				message: "Bad request", details: [{
					message: `Este id: ${id} está fora do padrão do banco de dados` }]});
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

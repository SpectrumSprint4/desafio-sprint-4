const BadRequest = require("../errors/BadRequest");
const funcionarios = require("../models/Funcionarios");
const produtos = require("../models/Produtos");

class ProdutosController {
	static async listarProdutos(req, res) {
		const { min_price, max_price } = req.body;
		const { name } = req.query;
		const nameSearch = new RegExp(name);

		console.log(min_price, max_price);

		try {
			if (name) {
				const produtoPorName = await produtos.find({ name: nameSearch });
				res.status(200).json(produtoPorName);
			} else if (min_price, max_price) {
				const produtoPorPreco = await produtos.find({ price: { $gte: min_price, $lte: max_price } });
				console.log(produtoPorPreco);
				res.status(200).json(produtoPorPreco);
			} else {
				const todosProdutos = await produtos.find();
				res.status(200).json(todosProdutos);
			}
		} catch (error) {
			res.status(400).json(error);
		}
	}	

	static async criarProduto(req, res) {		
		try {
			const reqBody = req.body;
			const funcionario = await buscaFuncionario(reqBody.employee_id);
			if(funcionario.situation != "active" || funcionario.office != "gerente") {
				throw new BadRequest("de gerente ativo");
			}
			await produtos.create({...reqBody});
			res.status(201).end();
		} catch(error) {
			res.status(400).json(error);
		}
	}	
}


async function buscaFuncionario(employee_id) {
	try{
		const funcionario = await funcionarios.findOne({_id: employee_id});
		if(!funcionario) {
			throw new Error("Não encontrado");
		}
		return funcionario;
	}  catch(erro) {
		return erro;
	}
	
}

module.exports = ProdutosController;

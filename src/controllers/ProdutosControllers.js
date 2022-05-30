const BadRequest = require("../errors/BadRequest");
const funcionarios = require("../models/Funcionarios");
const produtos = require("../models/Produtos");
const NotFound = require("../errors/NotFound.js");

class ProdutosController {
	static async listarProdutos(req, res) {
		const { min_price, max_price } = req.body;
		const { name } = req.query;
		const nameSearch = new RegExp(name);

		try {
			if (name) {
				let produtoPorName = produtos.find({ name: nameSearch });
				const paginar = await produtos.paginate(produtoPorName);
				if (paginar.totalDocs == 0) {
					throw new NotFound(name);
				}
				res.status(200).json(paginar);
			} else if (min_price, max_price) {
				let produtoPorPreco = produtos.find({ price: { $gte: min_price, $lte: max_price } });
				const paginar = await produtos.paginate(produtoPorPreco);
				if (paginar.totalDocs == 0) {
					throw new NotFound(min_price, max_price);
				}
				res.status(200).json(paginar);
			} else {
				let todosProdutos = produtos.find();
				const paginar = await produtos.paginate(todosProdutos);
				res.status(200).json(paginar);
			}
		} catch (error) {
			res.status(400).json(error);
		}
	}

	static async criarProduto(req, res) {
		try {
			const reqBody = req.body;
			const funcionario = await buscaFuncionario(reqBody.employee_id);
			if (funcionario.situation != "active" || funcionario.office != "gerente") {
				throw new BadRequest("de gerente ativo");
			}
			await produtos.create({ ...reqBody });
			res.status(201).end();
		} catch (error) {
			res.status(400).json(error);
		}
	}
}


async function buscaFuncionario(employee_id) {
	try {
		const funcionario = await funcionarios.findOne({ _id: employee_id });
		if (!funcionario) {
			throw new Error("Não encontrado");
		}
		return funcionario;
	} catch (erro) {
		return erro;
	}

}

module.exports = ProdutosController;

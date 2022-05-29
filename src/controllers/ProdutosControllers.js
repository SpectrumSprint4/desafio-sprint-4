const BadRequest = require("../errors/BadRequest");
const funcionarios = require("../models/Funcionarios");
const produtos = require("../models/Produtos");

class ProdutosController {
	static async listarProdutos(req, res) {
		try {
			const todosProdutos = await produtos.find();
			res.status(200).json(todosProdutos);
		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listarProdutoPorName(req, res) {
		const name = req.params.name;
		try {
			const produtoPorName = await produtos.findByName(name);
			res.status(200).json(produtoPorName);
		} catch(error) {
			res.status(400).json({message: `Produto com o nome de ${name} não foi encontrado`});
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
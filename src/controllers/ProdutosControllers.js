const produtos = require("../models/Produtos");
//const moment = require("moment");

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
		if ( !req.body.employee_id || typeof req.body.employee_id == "undefined" || req.body.employee_id == null ){
			res.status(400).json("É necessário informar um ID de funcionário");						
		} else {
			try {
				const reqBody = req.body;			
				await produtos.create({...reqBody});
				res.status(201).json();
			} catch(error) {
				res.status(400).json(error);
				console.log(error);
			}
		}	

	}	
}

module.exports = ProdutosController;
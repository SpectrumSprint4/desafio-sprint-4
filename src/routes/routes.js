const express = require("express");
const FuncionariosController = require("../controllers/FuncionariosController.js");
const ProdutosController = require("../controllers/ProdutosControllers.js");
const validarFuncionario = require("../middleware/validarFuncionario.js");
const validarProduto = require("../middleware/validarProduto.js");

const router = express.Router();

router
	.get("/api/v1/employee", FuncionariosController.listarFuncionarios)
	.get("/api/v1/employee/:id", FuncionariosController.listarFuncionarioPorId)
	.post("/api/v1/employee", validarFuncionario, FuncionariosController.criarFuncionario)
	.put("/api/v1/employee/:id",validarFuncionario, FuncionariosController.atualizaFuncionario)
	.delete("/api/v1/employee/:id", FuncionariosController.apagaFuncionario)
	.get("/api/v1/product", ProdutosController.listarProdutos)
	.get("/api/v1/product", ProdutosController.listarProdutoPorName)
	.post("/api/v1/product",validarProduto, ProdutosController.criarProduto);

module.exports = router;

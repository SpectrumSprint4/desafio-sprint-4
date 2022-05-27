const express = require("express");
const FuncionariosController = require("../controllers/FuncionariosController.js");

const router = express.Router();

router
	.get("/api/v1/employee", FuncionariosController.listarFuncionarios)
	.get("/api/v1/employee/:id", FuncionariosController.listarFuncionarioPorId)
	.post("/api/v1/employee", FuncionariosController.criarFuncionario)
	.put("/api/v1/employee/:id", FuncionariosController.atualizaFuncionario)
	.delete("/api/v1/employee/:id", FuncionariosController.apagaFuncionario);

module.exports = router;

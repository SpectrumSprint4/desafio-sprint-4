const express = require("express");
const FuncionariosController = require("../controllers/FuncionariosController.js");
const validarFuncionario = require("../middleware/validarFuncionario.js");

const router = express.Router();

router
	.get("/api/v1/employee", FuncionariosController.listarFuncionarios)
	.get("/api/v1/employee/:id", FuncionariosController.listarFuncionarioPorId)
	.get("/api/v1/teste", FuncionariosController.listarFuncionarioPorQuery)
	.post("/api/v1/employee", validarFuncionario, FuncionariosController.criarFuncionario)
	.put("/api/v1/employee/:id", FuncionariosController.atualizaFuncionario)
	.delete("/api/v1/employee/:id", FuncionariosController.apagaFuncionario);

module.exports = router;

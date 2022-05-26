const express = require("express");
const FuncionariosController = require("../controllers/FuncionariosController.js");

const router = express.Router();

router
	.get("/api/v1/employee", FuncionariosController.listarFuncionarios)
	.post("/api/v1/employee", FuncionariosController.criarFuncionario);

module.exports = router;

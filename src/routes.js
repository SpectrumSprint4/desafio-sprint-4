const express = require("express");

const Funcionarios = require("../src/models/Funcionarios");

const router = express.Router();

router.post("/employee", async (req, res) => {
	try {
		const funcionarios = await Funcionarios.create(req.body);
		return res.send({ funcionarios });

	}  catch (err) {
		return res.status(400).send({ error: "Registration Failed!"});
	}
});

module.exports = app => app.use("/api/v1/", router);



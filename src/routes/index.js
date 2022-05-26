const express = require("express");
const router = require("./routes");

const routes = (app) => {
	app.route("/").get((req, res)=> {
		res.status(200).json({message: "Apenas um teste"});
	});

	app.use(
		express.json(),
		router
	);
};

module.exports = routes;
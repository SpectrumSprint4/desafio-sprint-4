const router = require("./routes");

const routes = (app) => {
	app.use(router);
};

module.exports = routes;
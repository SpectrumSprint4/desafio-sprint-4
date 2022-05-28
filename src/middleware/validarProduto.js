const joi = require("joi");

const authProduct = joi.object({
	name: joi.string().required(),
	category: joi.string().required(),
	price: joi.number().required(),
	employee_id: joi.string().required()
});

module.exports = async (req, res, next) => {
	const reqBody = req.body;
	try {
		await authProduct.validateAsync(reqBody);
		next();
	} catch(error) {
		res.status(400).json(error.message);
	}
};
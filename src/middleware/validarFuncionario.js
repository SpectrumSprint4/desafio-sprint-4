const joi = require("joi");
const moment = require("moment");




const authEmploer = joi.object({
	name: joi.string()
		.min(5)
		.required(),
	cpf: joi.string()
		.required(),
	office: joi.string()
		.required(),
	birthday: joi.string()
		.required()
});

module.exports = async (req, res, next) => {
	const reqBody = req.body;
	const birthday = moment(reqBody.birthday, "DD/MM/YYYY").format("YYYY/MM/DD");
	try {
		if (!validaData(birthday)) {
			throw new Error("Erro de validação");
		}
		await authEmploer.validateAsync({...reqBody, birthday});
		next();
	} catch(error) {
		res.status(400).json(error.message);
	}
};

function validaData(formatedDate) {
	const dateNow = new Date().toLocaleDateString();
	const formatedDateNow = moment(dateNow, "DD/MM/YYYY").format("YYYY/MM/DD");
	const age = moment(formatedDateNow).diff(formatedDate, "years", true);
	if( Math.trunc(age) < 16) {
		return false;
	} else return true; 	
}


 
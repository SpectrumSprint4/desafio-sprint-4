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
		if (!validaData(birthday) || !validaCpf(reqBody.cpf)) {
			throw new Error("Campos Invalidos");
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


function validaCpf(cpf) {
	let soma = 0;

	if(cpf === "01234567890") return false;

	for(let i = 0; i <= 9; i++) {
		let numerosRepetidos = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
		if(cpf === numerosRepetidos) return false;
	}

	for(let i = 1; i <= 9; i++) {
		soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
	} 
	let resto = (soma * 10) % 11;

	if((resto == 10) || (resto == 11)) {
		resto = 0;
	}
	if(resto != parseInt(cpf.substring(9, 10))) return false;

	soma = 0;
	for(let i = 1; i<= 10; i++) {
		soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
	}
	resto = (soma * 10) % 11;
	if((resto == 10) || (resto == 11)) {
		resto = 0;
	}
	if(resto != parseInt(cpf.substring(10, 11))) return false;
	return true;
}

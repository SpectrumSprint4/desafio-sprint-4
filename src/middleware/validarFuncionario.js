const joi = require("joi");
const moment = require("moment");
const CampoInvalido = require("../errors/CampoInvalido.js");
const EnumErro = require("../errors/EnumErro.js");
const NameErro = require("../errors/NameErro.js");

const authEmployer = joi.object({
	name: joi.string().min(5).required().error(new NameErro),
	cpf: joi.string().required(),
	office: joi.string().required().valid("gerente", "caixa", "vendedor").error(new EnumErro("gerente, caixa ou vendedor")),
	birthday: joi.string().required()
});
const authEmployerUpdate = joi.object({
	name: joi.string().min(5).error(new NameErro),
	cpf: joi.string(),
	office: joi.string().valid("gerente", "caixa", "vendedor").error(new EnumErro("gerente, caixa ou vendedor")),
	birthday: joi.string(),
	situation: joi.string().valid("active", "deactivate").error(new EnumErro("active ou deactive"))
});

module.exports = async (req, res, next) => {
	const reqBody = req.body;
	const birthday = moment(reqBody.birthday, "DD/MM/YYYY").format("YYYY/MM/DD");
	let campos = ["cpf", "birthday"];
	try {
		if (!validaData(birthday)) {
			throw new CampoInvalido(campos[1]);
		}
		if(!validaCpf(reqBody.cpf)) {
			throw new CampoInvalido(campos[0]);
		}
		if(req.method == "POST") {
			await authEmployer.validateAsync({...reqBody, birthday});
			next();
		}
		if(req.method === "PUT") {
			await authEmployerUpdate.validateAsync({...reqBody, birthday});
			next();
		}
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
	if(!cpf) return true;

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

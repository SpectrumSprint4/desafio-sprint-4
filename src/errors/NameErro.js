class NameErro extends Error {
	constructor() {
		super();
		this.name = "NameErro",
		this.message = [
			{
				message: this.name, 
				details: [{	message: "O nome fornecido precisa ter mais de 5 caracteres"}]}];
	}
}

module.exports = NameErro;
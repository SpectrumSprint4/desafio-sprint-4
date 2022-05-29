class EnumErro extends Error {
	constructor(campos) {
		super();
		this.name = "EnumErro";
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: `Este campo só pode ser preenchido com: ${campos}`}]}];
	}
}

module.exports = EnumErro;
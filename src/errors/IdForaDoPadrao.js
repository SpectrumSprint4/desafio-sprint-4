class IdForaDoPadrao extends Error {
	constructor() {
		super();
		this.name = "IdForaDoPadrao";
		this.message = [
			{ 
				details: [{	message: "O id que foi fornecido, não segue o padrão utilizado pelo BD"}]}];
	}
}

module.exports = IdForaDoPadrao;
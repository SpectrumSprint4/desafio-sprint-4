class BadRequest extends Error {
	constructor(item) {
		super();
		this.name = "BadRequest";
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: `Requisição ${item} invalida`}]}];
	}
}

module.exports = BadRequest;
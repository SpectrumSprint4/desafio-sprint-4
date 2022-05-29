class NotFound extends Error {
	constructor(item) {
		super();
		this.name = "NotFound";
		this.status = 404;
		this.message = [
			{
				message: this.name, 
				details: [{	message: `${item} não foi encontrado`}] 
			}
		];
	}
}

module.exports = NotFound;
class NotFound extends Error {
	constructor(item) {
		super();
		this.name = "NotFound";
		this.message = [
			{
				details: [{	message: `${item} não foi encontrado`}] 
			}
		];
	}
}

module.exports = NotFound;
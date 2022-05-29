class SituationErro extends Error {
	constructor() {
		super();
		this.name = "SituationErro";
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: "Situation só pode ser preenchida com **active** ou **deactivate**"}]}];
	}
}

module.exports = SituationErro;
module.exports = {
	regexFindAll(re, string) {
		let regexResult = [];
		while ((match = re.exec(string)) != null) {
			regexResult.push(match);
		}
		return regexResult;
	},
};

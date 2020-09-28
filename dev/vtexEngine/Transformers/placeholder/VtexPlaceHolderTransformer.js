const { regexFindAll } = require("../../utils");
const placeHolderTransformStrategy = require("./placeHolderTransformStrategy");

class VtexPlaceHolderTransformer {
	constructor(regex, metaData, shelfs, validator) {
		this.regex = regex;
		this.metaData = metaData;
		this.shelfs = shelfs;
		this.validator = validator;
	}

	transform(fileContent, { basename }) {
		const regex = new RegExp(this.regex.placeholder);
		const regexResult = regexFindAll(regex, fileContent);

		fileContent = this.validator.placeHolderRepeated(
			fileContent,
			regexResult,
			basename
		);

		fileContent = this.validator.metaDataPlaceHolderRepeated(
			fileContent,
			this.metaData
		);

		return this._processRegResult(fileContent, regexResult, basename);
	}

	_processRegResult(file, regexResult, basename) {
		let transformedFile = file;
		regexResult.forEach((reResult) => {
			const pageData = this._getPageData(basename);
			const placeHolderData = this._getPagePlaceholderData(
				pageData,
				reResult
			);

			transformedFile = this._processPlaceHolder(
				transformedFile,
				placeHolderData
			);
		});

		return transformedFile;
	}

	_processPlaceHolder(transformedFile, data) {
		if (data === false) return transformedFile;

		let result = "";

		data.placeHolderData.objects.forEach((object) => {
			const strategy = placeHolderTransformStrategy[object.type];
			if (typeof strategy === "undefined") return transformedFile;
			// não ta legal mas passo as prateleiras como segundo paramentro
			result += strategy(object, this.shelfs);
		});

		return transformedFile.replace(data.vtexTag, result);
	}

	_getPagePlaceholderData(pageData, reResult) {
		if (typeof pageData !== "undefined") {
			const [found, idValue, ...extra] = reResult;
			const id = idValue.split('"')[0];

			const placeHolderData = pageData.data.contentPlaceHolders.find(
				(contentPlaceholder) => contentPlaceholder.id === id
			);

			if (typeof placeHolderData === "undefined") {
				console.log(
					`contentPlaceholder de ID: ${id} não foi encontrado`
				);
				return false;
			}

			return {
				vtexTag: found,
				placeHolderData,
				id,
			};
		}

		return false;
	}

	_getPageData(basename) {
		return this.metaData.pages.find((data) => {
			return data.template === basename;
		});
	}
}

module.exports = VtexPlaceHolderTransformer;

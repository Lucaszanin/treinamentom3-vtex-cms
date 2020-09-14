const VtexPlaceHolderTransformer = require("./VtexPlaceHolderTransformer");

class VtexEngine {
	constructor(files, metaData, regex) {
		this.metaData = metaData;
		this.files = files;
		this.regex = regex;
		this.placeHolderTransformer = new VtexPlaceHolderTransformer(
			this.regex.placeholder,
			this.metaData,
			this.files.prateleiras
		);
	}

	process(fileContent, basename) {
		fileContent = this.placeHolderTransformer.transform(
			fileContent,
			basename
		);
		return fileContent;
	}
}

module.exports = VtexEngine;

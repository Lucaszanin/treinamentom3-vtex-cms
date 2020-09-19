const VtexPlaceHolderTransformer = require("./placeholder/VtexPlaceHolderTransformer");

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
		this.validateMetaData();
		this.validateSubTemplates();
	}

	validateMetaData() {
		this.metaData.pages.forEach((pageData) => {
			let ids = {};
			let dups = [];
			pageData.data.contentPlaceHolders.forEach((val) => {
				if (ids[val.id]) {
					dups.push(val);
				} else {
					ids[val.id] = true;
				}
			});

			if (dups.length > 0) {
				console.log(
					`\n\n   \x1b[31m O ID: "${dups[0].id}" foi encontrado multiplas vezes no template: "${pageData.template}" \n\n`
				);
				throw null;
			}
		});
	}

	validateSubTemplates() {
		this.files.subtemplates.forEach((template) => {
			const regex = new RegExp(this.regex.placeholder);
			const regexResult = regex.test(template.content);
			if (regexResult) {
				console.log(
					` \n\n\x1b[31m  Subtemplates não podem ter contentplaceholder `
				);
				console.log(
					` \x1b[31m O Subtemplate "${template.name}" possui um contentPlaceholder \n\n`
				);
				throw null;
			}
		});
	}

	process(fileContent, basename, transformCTX) {
		fileContent = this.placeHolderTransformer.transform(
			fileContent,
			basename
		);
		return fileContent;
	}
}

module.exports = VtexEngine;

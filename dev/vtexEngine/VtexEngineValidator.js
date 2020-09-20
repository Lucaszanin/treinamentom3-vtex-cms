module.exports = class VtexEngineValidator {
	metaDataPlaceHolderRepeated(file, metaData) {
		metaData.pages.forEach((pageData) => {
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
				file += this._memeContent("https://i.imgflip.com/4fkkcz.jpg");
			}
		});

		return file;
	}

	placeHolderRepeated(file, regResult, basename) {
		let ids = {};
		let dups = [];
		regResult.forEach((regexec) => {
			if (ids[regexec[1]]) {
				dups.push(regexec[1]);
			} else {
				ids[regexec[1]] = true;
			}
		});
		if (dups.length > 0) {
			console.log(
				`\n\n   \x1b[31m O ID: "${dups[0]}" foi encontrado multiplas vezes no template: "${basename}" \n\n`
			);
			file += this._memeContent("https://i.imgflip.com/4fkkcz.jpg");
		}

		return file;
	}

	subTemplatesWithContentPlaceholder(fileContent, subtemplates, regex) {
		subtemplates.forEach((template) => {
			const placeholderRegex = new RegExp(regex.placeholder);
			const regexResult = placeholderRegex.exec(template.content);

			if (regexResult) {
				fileContent += this._memeContent(
					"https://i.imgflip.com/4fkgnr.jpg"
				);
				console.log(
					"\x1b[31m",
					`  \n\n Subtemplates não podem ter contentplaceholder `
				);
				console.log(
					"\x1b[31m",
					`O Subtemplate "${template.name}" possui um contentPlaceholder \n\n`
				);
			}
		});
		return fileContent;
	}

	_memeContent(memeUrl) {
		return `
		<div style="position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: 999;
		opacity: 1;
		pointer-events: none;
		transition: 0.2s;
		background: rgba(0,0,0,0.5);">
			<img src="${memeUrl}" style="
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			" />
		</div>
	`;
	}
};

module.exports = {
	validateMetaData(metaData, files) {
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
				files.subtemplates[0] = files.subtemplates[
					files.subtemplates.length - 1
				].content += memeContent("https://i.imgflip.com/4fkkcz.jpg");
			}
		});

		return files;
	},

	validateSubTemplates(files, regex) {
		files.subtemplates = files.subtemplates.map((template) => {
			const placeholderRegex = new RegExp(regex.placeholder);
			const regexResult = placeholderRegex.exec(template.content);

			if (regexResult) {
				template.content += memeContent(
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
			return template;
		});
		return files;
	},
};

function memeContent(memeUrl) {
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

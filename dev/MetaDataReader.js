const util = require("util");
const fs = require("fs");
const path = require("path");
const jsonc = require("jsonc");
const recursive = require("recursive-readdir");

const recursiveP = util.promisify(recursive);

class MetaDataReader {
	constructor(metaPath) {
		this.metaPath = path.resolve(__dirname, "..", metaPath);
	}

	_readFiles() {
		return recursiveP(this.metaPath).then((files) => {
			const rawData = {};
			files.forEach((file) => {
				const name = path.basename(file).split(".")[0];
				const data = fs.readFileSync(file, "utf8");
				rawData[name] = data;
			});
			return rawData;
		});
	}

	_parse(rawData) {
		return new Promise((resolve, reject) => {
			const parsedData = {};
			for (let file of Object.keys(rawData)) {
				parsedData[file] = jsonc.parse(rawData[file]);
			}
			resolve(parsedData);
		});
	}

	getMetaData() {
		return this._readFiles()
			.then(this._parse)
			.then((data) => data);
	}
}

module.exports = MetaDataReader;

// const reader = new MetaDataReader("meta");

// reader.getMetaData().then((data) => console.log(data));

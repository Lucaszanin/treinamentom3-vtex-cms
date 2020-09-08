const { LoremIpsum } = require("lorem-ipsum");
var jsdom = require("jsdom");
var $ = require("jquery")(new jsdom.JSDOM().window);
var numeroDeProdutos = 12;

var files = {
	subtemplates: [],
	controles: [],
	prateleiras: [],
};

var VtexEmulation = function () {
	this._folders = {};
	this._regex = {};

	this.folders({
		template: "./src/template-pagina/",
		subTemplate: "./src/sub-templates/",
		controle: "./dev/controles-vtex/",
		controleCustomizado: "./src/controle-customizado/",
		prateleira: "./src/template-prateleira/",
	});
	this.regex({
		subtemplate: /<vtex:template id="(.*)" ?\/>/g,
		controle: /<vtex\.cmc:([^ \>]*)[^\>]* ?\/>/g,
		placeholder: /<vtex:contentPlaceHolder id="(.*)" type="(.*)" ?\/>/g,
	});
};

// get/set
VtexEmulation.prototype.regex = function (regex) {
	if (undefined != typeof regex) {
		this._regex = Object.assign(this._regex, regex);
	}
	return this._regex;
};

VtexEmulation.prototype.folders = function (folders) {
	if (undefined != typeof folders) {
		this._folders = Object.assign(this._folders, folders);
	}
	return this._folders;
};
VtexEmulation.prototype.loadSubTemplates = function () {
	files.subtemplates = makeListFileContent(this.folders().subTemplate);
};
VtexEmulation.prototype.loadPrateleira = function () {
	files.prateleiras = makeListFileContent(this.folders().prateleira);
};
VtexEmulation.prototype.loadControles = function () {
	var controles = makeListFileContent(this.folders().controle);
	var customizados = makeListFileContent(this.folders().controleCustomizado);
	files.controles = controles.concat(customizados);
};
// funções para trocar conteudo
VtexEmulation.prototype.subtemplate = function (match, grupo1) {
	var conteudo;
	var file = findInArray(files.subtemplates, grupo1);

	if (file !== null) {
		conteudo = file.content;
	} else {
		conteudo = match + "<!-- no match -->";
	}
	return conteudo;
};

VtexEmulation.prototype.controle = function (match, grupo1) {
	var conteudo;
	var file = findInArray(files.controles, grupo1);

	if (file !== null) {
		conteudo = file.content;
	} else {
		console.log("controle not find: " + grupo1);
	}
	return conteudo;
};

VtexEmulation.prototype.placeHolder = (match, id_placeholder, type) => {
	var conteudo;

	if (type == "colecao") {
		var produtoPrateleira = findInArray(files.prateleiras, id_placeholder);
		if (produtoPrateleira) {
			conteudo = gerarPrateleiras(produtoPrateleira.content);
		} else {
			console.log("placeHolder not find: " + id_placeholder);
		}
	} else if (type == "banner") {
		var banners = id_placeholder.trim().split(" ");
		conteudo = "";
		for (var i = 0; i < banners.length; i++) {
			conteudo += '<div class="box-banner">';
			conteudo +=
				'<a ><img  alt="Promoções" src="/arquivos/' +
				banners[i] +
				'.png" ></a>';
			conteudo += "</div>";
		}
	} else {
		conteudo = new LoremIpsum({
			count: 5, // Number of words, sentences, or paragraphs to generate.
			units: "sentences", // Generate words, sentences, or paragraphs.
			sentenceLowerBound: 5, // Minimum words per sentence.
			sentenceUpperBound: 15, // Maximum words per sentence.
			paragraphLowerBound: 10, // Minimum sentences per paragraph.
			paragraphUpperBound: 7, // Maximum sentences per paragraph.
			format: "plain", // Plain text or html
			random: Math.random, // A PRNG function. Uses Math.random by default
		});
	}

	return conteudo;
};

function gerarPrateleiras(htmlPrateleira) {
	var div = $("<div />");
	$("<h2 />", { text: "Prateleira vtex" }).appendTo(div);
	var $ul = "<ul>";

	for (var i = 0; i < numeroDeProdutos; i++) {
		$ul += gerarProdutoNaPrateleira(htmlPrateleira, i);
	}
	$ul += "</ul>";
	div.append($ul);
	return "<div >" + div.html() + "</div>";
}
function gerarProdutoNaPrateleira(produto, i) {
	try {
		var $produto = $(produto);
		var div = $("<div />");
		$produto.appendTo(div);
		if (i % 3) {
			$produto.find(".indisponivel").remove();
			$produto.find(".btn-avise-me").remove();

			if (i % 2 == 0) {
				$produto.find(".antigo").remove();
				$produto.find(".DiscountHightLight").remove();
			} else {
				$produto.find(".HightLight").remove();
			}
		} else {
			$produto.find(".btn-compra").remove();
			$produto.find(".disponivel").remove();
		}
	} catch (e) {
		console.log("Erro para gerar prateleira");
	}
	return `<li layout="homo-loga-cao"> ${produto} </li>`;
}

function findInArray(lista, name) {
	var item;
	for (let i = 0; i < lista.length; i++) {
		if (lista[i].name == name.trim().toLowerCase()) {
			return lista[i];
		}
	}
	return null;
}

var makeListFileContent = function (folder) {
	var fs = require("fs");
	var files = [];

	fs.readdirSync(folder).forEach((name) => {
		var file = {};
		file.name = name
			.substring(0, name.lastIndexOf("."))
			.trim()
			.toLowerCase();
		file.content = fs.readFileSync(folder + name, "utf8");
		files.push(file);
	});
	return files;
};

if (!Object.assign) {
	Object.defineProperty(Object, "assign", {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function (target) {
			"use strict";
			if (target === undefined || target === null) {
				throw new TypeError("Cannot convert first argument to object");
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}
				nextSource = Object(nextSource);

				var keysArray = Object.keys(Object(nextSource));
				for (
					var nextIndex = 0, len = keysArray.length;
					nextIndex < len;
					nextIndex++
				) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(
						nextSource,
						nextKey
					);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		},
	});
}

module.exports = new VtexEmulation();

/**
 * Altera as dimenções especificadas na url da img
 * @param {string} src url da imagem na VTEX
 * @param {int} width
 * @param {int} height
 * @return {string} url da imagem com o tamanho alterado
 */

export function alterarTamanhoImagemSrcVtex(src, width, height) {
	if (typeof src == "undefined") {
		console.warn("Parametro 'src' não recebido.");

		return;
	}
	width = typeof width == "undefined" ? 1 : width;
	height = typeof height == "undefined" ? width : height;

	src = src.replace(
		/\/(\d+)(-(\d+-\d+)|(_\d+))\//g,
		"/$1-" + width + "-" + height + "/"
	);
	return src;
}

/**
 * Obtem Preco
 * caso o preco recebido seja um Float ou int,
 * 	'Ex.': 10.2 ->'10,20'
 * Recebendo uma string o valor sera retornado como um float
 * 	'Ex.': 'R$1.234,30' -> 1234.3
 * @param  {FloatZstring} price preço
 * @return {[type]}       [description]
 */
export function getPrice(price) {
	if (!price) {
		return 0;
	}
	if (isNaN(price)) {
		price = parseFloat(
			price
				.replace("R$", "")
				.replace(".", "")
				.replace(",", ".")
		);
		return parseFloat(price);
	} else {
		var strPrice = price.toFixed(2);
		strPrice = strPrice.replace(".", ",");
		return strPrice;
	}
}

export function formatCurrency() {
	return Number(value).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}

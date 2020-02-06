var util = {};

util.NUMERO_DE_PARCELAS = 6;
util.PERCENTUAL_DE_DESCONTO = 10;

util.isMobile = navigator.userAgent.toLowerCase().search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1;

/**
 *  Função para verificar se estamos em uma das paginas
 *  que são passadas por argumento
 * @param {array} [varname] um array de strings
 * @return {Boolean} [description]
 */
util.isPage = function isPage() {
	var identificacaoMetaPage = $('meta[name="page"]').prop('content') || "";
	var classTagBody = ($('body').attr('class')) || "";
	var pageDataLayer = (typeof dataLayer != "undefined") ? window.dataLayer[0].pageCategory : '';

	for (let i in arguments) {
		//resultado-busca na tag body
		if (identificacaoMetaPage.search(arguments[i]) >= 0
		|| pageDataLayer === arguments[i]
		|| classTagBody.search(arguments[i]) >= 0  )
			return true;
	}
	return false;
};


/**
 * Obtem Preco
 * caso o preco recebido seja um Float ou int,
 * 	'Ex.': 10.2 ->'10,20'
 * Recebendo uma string o valor sera retornado como um float
 * 	'Ex.': 'R$1.234,30' -> 1234.3
 * @param  {FloatZstring} price preço
 * @return {[type]}       [description]
 */
util.getPrice = function getPrice(price) {
	if (!price) {
		return 0;
	}
	if (isNaN(price)) {
		price = parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.'));
		return parseFloat(price);
	} else {
		var strPrice = price.toFixed(2);
		strPrice = strPrice.replace('.', ',');
		return strPrice;
	}
};

/**
 * Realiza o cálculo do preço parcelado, insere o resultado e  o número de parcelas nos devidos elementos
 *
 * @param  {float} preco Preço a ser calculado
 * @param  {int} numeroDeParcelas Número de parcelas
 * @param  {Seletor jQuery} containerPreco Seletor jQuery  do elemento onde o preço calculado será inserido
 * @param  {Seletor jQuery} containerParcelas Seletor jQuery do elemento onde o número de parcelas será inserido
 */

util.calcularEInserirPrecoParcelado = function calcularEInserirPrecoParcelado(preco, numeroDeParcelas, $containerPreco, $containerParcelas) {
	var precoParcelado = (preco / numeroDeParcelas);

	if (!isNaN(precoParcelado)) {
		$containerParcelas.text(numeroDeParcelas);
		$containerPreco.text('R$ ' + util.getPrice(precoParcelado));
	}
}

/**
 * Realiza o cálculo do preço do boleto, insere o resultado e  o percentual de desconto nos devidos elementos
 *
 * @param  {float} preco Preço a ser calculado
 * @param  {int} percentualDeDesconto Percentual de desconto
 * @param  {Seletor jQuery} containerPreco Seletor jQuery  do elemento onde o preço calculado será inserido
 * @param  {Seletor jQuery} containerParcelas Seletor jQuery do elemento onde o percentual de desconto será inserido
 */

util.calcularEInserirPrecoBoleto = function calcularEInserirPrecoBoleto(preco, percentualDeDesconto, $containerPreco, $containerPercentual) {
	var precoBoleto = preco - (preco * percentualDeDesconto / 100);
	if (!isNaN(precoBoleto)) {
		$containerPreco.text('R$ ' + util.getPrice(precoBoleto));
	}
	if (typeof $containerPercentual !== "undefined") {
		$containerPercentual.text(percentualDeDesconto + '%');
	}
}

/**
 * Altera as dimenções especificadas na url da img
 * @param {string} src url da imagem na VTEX
 * @param {int} width
 * @param {int} height
 * @return {string} url da imagem com o tamanho alterado
 */
util.alterarTamanhoImagemSrcVtex = function alterarTamanhoImagemSrcVtex(src, width, height){
	if( typeof src == "undefined" ) {
		console.warn( "Parametro 'src' não recebido.");
		return;
	}
	width = (typeof width == "undefined" )? 1 : width;
	height = (typeof height == "undefined" )? width:height;

	src = src.replace( /\/(\d+)(-(\d+-\d+)|(_\d+))\//g, '/$1-' + width + '-' + height + '/' );
	return  src;
}

module.exports = util;

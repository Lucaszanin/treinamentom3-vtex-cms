const { ModuloSkus } = require("../ModuloSkus");
const { textoParaNomeCss,alterarTamanhoImagemSrcVtex } = require("../util");
/**
 * modulo de seleção dos skus
 * Permite escolher o Sku desejado
 */
var ModuloSkusPorEspecificacoes = function (skuJson,elemento) {
	ModuloSkus.call(this,skuJson,elemento);
	sessionStorage.removeItem('sku-selecionado');
	var _this = this;

	this._opcoes = {
		"especificacaoComImagem":''
	};


	/**
	 * Escolhe os primeiros skus de cada variação
	 * @return {object} this
	 */
	this.setDefauls = function (setBestSkuWhenThereMultiple = false) {
		let bestSku = getBestSku();

		this.escolherSkuReferencia(bestSku);

		if(_this._skuJson.skus.length === 1 || setBestSkuWhenThereMultiple){
			this.escolherSku(bestSku);
			// forçar escolha do unico sku
			for (const especificacao in bestSku.dimensions) {
				if (bestSku.dimensions.hasOwnProperty(especificacao)) {
					const valorEspecificacao = bestSku.dimensions[especificacao];
					let $especificacao = producraInputNtmlParaEspecificacao(
						especificacao,
						valorEspecificacao
					);
					$especificacao.prop('checked', true).trigger('change');
				}
			}
		}

		return this;
	};
	/**
	 * Cria e insere o html com as variações dos skus
	 * @param  {Object} mapaEspecificacoes Mapa das especificações do produto
	 * @return {object} this
	 */
	this.desenhar = function () {

		if (!_this._skuJson.dimensionsMap || _this._skuJson.dimensionsMap.length === 0) {
			console.warn("Erro! para de especificações não identificado.");
			return this;
		}
		var $especificacao, $especificacoes = $('<div />', {
			class: 'skus-selection'
		}).appendTo(this.elemento());

		for (var indice in _this._skuJson.dimensions) {
			if (_this._skuJson.dimensions.hasOwnProperty(indice)) {
				let nomeEspecificacaqo = _this._skuJson.dimensions[indice];
				var values = _this._skuJson.dimensionsMap[nomeEspecificacaqo];

				$especificacao = $('<div />', {
					class: 'especificaco ' + textoParaNomeCss(nomeEspecificacaqo),
					"data-especificacao": textoParaNomeCss(nomeEspecificacaqo)
				}).appendTo($especificacoes);

				$('<div />', {
					class: 'titulo',
					text: nomeEspecificacaqo
				}).appendTo($especificacao);
				var $lista = $('<ul />', {
					class: 'sku'
				}).appendTo($especificacao);
				var nameCampo = textoParaNomeCss(nomeEspecificacaqo + '_' + i);
				if (values.length < 2) {
					$($especificacao).addClass('single-option');
				}

				for (var i = 0; i < values.length; i++) {
					var item = $('<li />', {
						class: 'skus'
					}).appendTo($lista);
					var idText = textoParaNomeCss(nomeEspecificacaqo + '_' + values[i] + '_' + i);
					$('<input />', {
						'data-especificacao': values[i],
						'data-especificacao-title': nomeEspecificacaqo,
						val: values[i],
						id: idText,
						type: 'radio',
						name: nameCampo
					}).appendTo(item);

					let $label = $('<label />', {
						for: idText
					}).appendTo(item);

					if(nomeEspecificacaqo === _this._opcoes.especificacaoComImagem){
						$label.addClass('image')
						let src = obtemImagemParaEspecificacao(nomeEspecificacaqo,values[i]);
						$('<img />',{
							'src':alterarTamanhoImagemSrcVtex(src,55,55),
							'title':  nomeEspecificacaqo + ': ' +values[i]
						}).appendTo($label);
					}else{
						$label.text(values[i]);
					}
				}
			}
		}
		return this;
	};
	/**
	 * Configura os eventos de atualizacao
	 * @return {object} this
	 */
	this.configurar = function () {

		$(".skus-selection input").on("change", function () {
			var especificacoesDoSku = {}, sku;
			var nomeEspecificacao = "";
			$(".skus-selection input:checked").each(function () {
				nomeEspecificacao = this.getAttribute('data-especificacao-title');
				especificacoesDoSku[nomeEspecificacao] = this.getAttribute('data-especificacao');
			});
			sku = getSkuPorEspecificacoes(especificacoesDoSku);
			_this.escolherSku(sku);
		});
		return this;
	};
	function getSkuPorEspecificacoes(especificacoes) {
		return _this._skuJson.skus.find(function (sku) {
			return isEquivalent(sku.dimensions, especificacoes);
		});
	}
	/**
	 * @link http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
	 */
	function isEquivalent(a, b) {
		var aProps = Object.getOwnPropertyNames(a);
		var bProps = Object.getOwnPropertyNames(b);
		if (aProps.length != bProps.length) {
			return false;
		}
		for (var i = 0; i < aProps.length; i++) {
			var propName = aProps[i];
			if (a[propName] !== b[propName]) {
				return false;
			}
		}
		return true;
	}
	function getBestSku(){
		var bestSku;
		for (const i in _this._skuJson.skus) {
			if (_this._skuJson.skus.hasOwnProperty(i)) {
				const sku = _this._skuJson.skus[i];
				if(sku.available){
					bestSku = sku;
					break;
				}
			}
		}
		if(typeof bestSku === "undefined"){
			bestSku = _this._skuJson.skus[0];
		}
		return bestSku;
	}
	function producraInputNtmlParaEspecificacao(especificacao,valor){
		especificacao = textoParaNomeCss(especificacao);
		let  $lista = _this.elemento().find('.especificaco[data-especificacao="'+especificacao+'"]');
		return $lista.find('li input[data-especificacao="'+valor+'"]');
	}
	function obtemImagemParaEspecificacao(especificacao,valor){

		for (const i in _this._skuJson.skus) {
			if (_this._skuJson.skus.hasOwnProperty(i)) {
				const sku = _this._skuJson.skus[i];

				for (const tituloEspecificacao in sku.dimensions) {
					if (sku.dimensions.hasOwnProperty(tituloEspecificacao)) {

						if(tituloEspecificacao === especificacao ){
							if(sku.dimensions[tituloEspecificacao] === valor){
								return sku.image;

							}
						}
					}
				}
			}
		}
		return ''
	}

};
// subclasse extende superclasse
ModuloSkusPorEspecificacoes.prototype = Object.create(ModuloSkus.prototype);
ModuloSkusPorEspecificacoes.prototype.constructor = ModuloSkusPorEspecificacoes;

exports.ModuloSkusPorEspecificacoes = ModuloSkusPorEspecificacoes;

import 'jquery';
const { ModuloSkus } = require("../ModuloSkus");
const { textoParaNomeCss , alterarTamanhoImagemSrcVtex} = require("../util");
/**
 * modulo de seleção dos skus
 * Permite escolher o Sku desejado
 */
var ModuloSkusPorNome = function (skuJson,elemento) {
	ModuloSkus.call(this,skuJson,elemento);
	sessionStorage.removeItem('sku-selecionado');
	var _this = this;


	/**
	 * Escolhe os primeiros skus de cada variação
	 * @return {object} this
	 */
	this.setDefauls = function () {
		var bestSku;

		for (const i in this._skuJson.skus) {
			if (this._skuJson.skus.hasOwnProperty(i)) {
				const sku = this._skuJson.skus[i];
				if(sku.available){
					bestSku = sku;
					break;
				}
			}
		}
		if(typeof bestSku === "undefined"){
			bestSku = this._skuJson.skus[0];
		}
		this.escolherSkuReferencia(bestSku);

		if(_this._skuJson.skus.length === 1){
			this.escolherSku(bestSku);
		}
		return this;
	};
	/**
	 * Cria e insere o html com as variações dos skus
	 * @param  {Object} mapaEspecificacoes Mapa das especificações do produto
	 * @return {object} this
	 */
	this.desenhar = function () {

		var $especificacao, $especificacoes = $('<div />', {
			class: 'skus-selection'
		}).appendTo(this.elemento());


		$especificacao = $('<div />', {
			class: 'skus'
		}).appendTo($especificacoes);
		$('<div />', {
			class: 'titulo',
			text: "Escolha a cor:"
		}).appendTo($especificacao);
		var $lista = $('<ul />', {
			class: 'skus'
		}).appendTo($especificacao);
		var nameCampo = textoParaNomeCss(_this._skuJson.name);


		for (var indice in _this._skuJson.skus) {
			if (_this._skuJson.skus.hasOwnProperty(indice)) {

				var sku = _this._skuJson.skus[indice];
				var item = $('<li />', {
					class: 'skus'
				}).appendTo($lista);

				$('<input />', {
					val: sku.sku,
					id: sku.sku,
					type: 'radio',
					name: nameCampo
				}).appendTo(item);
				var label = $('<label />', {
					for: sku.sku,
					class:"image"
				}).appendTo(item);

				$('<img />',{
					'src':alterarTamanhoImagemSrcVtex(sku.image,55,55),
					'title':sku.skuname
				}).appendTo(label);
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
			let id = $(".skus-selection input:checked").val();

			var sku = getSkuPorId(id);
			_this.escolherSku(sku);
		});
		return this;
	};

	function getSkuPorId(id) {
		return _this._skuJson.skus.find(function (sku) {
			return sku.sku == id;
		});
	}

};
// subclasse extende superclasse
ModuloSkusPorNome.prototype = Object.create(ModuloSkus.prototype);
ModuloSkusPorNome.prototype.constructor = ModuloSkusPorNome;

exports.ModuloSkusPorNome = ModuloSkusPorNome;

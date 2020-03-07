import "jquery";
import { dirname } from "path";
import { ModuloSkus } from "../ModuloSkus";
import { textoParaNomeCss, alterarTamanhoImagemSrcVtex } from "../util";
/**
 * modulo de seleção dos skus
 * Permite escolher o Sku desejado
 */
export var ModuloSkusPorNome = function(skuJson, elemento, componentStore) {
	ModuloSkus.call(this, skuJson, elemento, componentStore);
	sessionStorage.removeItem("sku-selecionado");
	var _this = this;

	this.dimensions = {
		Único: "U"
	};

	this.dimensionToDisplay = {
		name: "Tamanhos",
		label: "Escolha o tamanho:"
	};

	this.changeDimension = function(dimension) {
		for (const key in _this.dimensions) {
			if (key == dimension) {
				return _this.dimensions[key];
			}
		}

		return dimension;
	};

	/**
	 * Escolhe os primeiros skus de cada variação
	 * @return {object} this
	 */
	this.setDefauls = function() {
		var bestSku;

		for (const i in this._skuJson.skus) {
			if (this._skuJson.skus.hasOwnProperty(i)) {
				const sku = this._skuJson.skus[i];
				if (sku.available) {
					bestSku = sku;
					break;
				}
			}
		}

		if (typeof bestSku === "undefined") {
			bestSku = this._skuJson.skus[0];
		}
		this.escolherSkuReferencia(bestSku);

		// if(_this._skuJson.skus.length === 1){
		$(`input[value="${bestSku.sku}"]`).prop("checked", true);
		this.escolherSku(bestSku);
		// }
		return this;
	};
	/**
	 * Cria e insere o html com as variações dos skus
	 * @param  {Object} mapaEspecificacoes Mapa das especificações do produto
	 * @return {object} this
	 */
	this.desenhar = function() {
		var $especificacao,
			$especificacoes = $("<div />", {
				class: "skus-selection"
			}).appendTo(this.elemento());

		$especificacao = $("<div />", {
			class: "skus-wrapper"
		}).appendTo($especificacoes);
		$("<div />", {
			class: "titulo",
			text:
				_this._skuJson.dimensions.indexOf(
					_this.dimensionToDisplay.name
				) >= 0
					? _this.dimensionToDisplay.label
					: "Escolha a variação:"
		}).appendTo($especificacao);
		var $lista = $("<ul />", {
			class: "skus"
		}).appendTo($especificacao);
		var nameCampo = textoParaNomeCss(_this._skuJson.name);

		for (var indice in _this._skuJson.skus) {
			if (_this._skuJson.skus.hasOwnProperty(indice)) {
				var sku = _this._skuJson.skus[indice];

				var item = $("<li />", {
					class: "sku"
				}).appendTo($lista);

				$("<input />", {
					val: sku.sku,
					id: sku.sku,
					type: "radio",
					name: nameCampo
				}).appendTo(item);

				var label = $("<label />", {
					for: sku.sku,
					class: sku.available ? "" : "disable"
				}).appendTo(item);

				//gambiarra para cadastro errado da averara
				if (_this.dimensionToDisplay.name === "Tamanhos") {
					_this.dimensionToDisplay.name = "TAMANHO";
				}

				if (sku.dimensions[_this.dimensionToDisplay.name]) {
					label.attr(
						"title",
						sku.dimensions[_this.dimensionToDisplay.name]
					);
					label.text(
						_this.changeDimension(
							sku.dimensions[_this.dimensionToDisplay.name]
						)
					);
				} else {
					label.addClass("image");
					$("<img />", {
						src: alterarTamanhoImagemSrcVtex(sku.image, 45, 65),
						title: sku.skuname
					}).appendTo(label);
				}
			}
		}

		return this;
	};
	/**
	 * Configura os eventos de atualizacao
	 * @return {object} this
	 */
	this.configurar = function() {
		$(".skus-selection input").on("change", function() {
			let id = $(".skus-selection input:checked").val();

			var sku = getSkuPorId(id);
			_this.escolherSku(sku);
		});
		return this;
	};

	function getSkuPorId(id) {
		return _this._skuJson.skus.find(function(sku) {
			return sku.sku == id;
		});
	}
};
// subclasse extende superclasse
ModuloSkusPorNome.prototype = Object.create(ModuloSkus.prototype);
ModuloSkusPorNome.prototype.constructor = ModuloSkusPorNome;

import { ModuloSkus } from "../ModuloSkus";
import { textoParaNomeCss, alterarTamanhoImagemSrcVtex } from "../util";
/**
 * modulo de seleção dos skus
 * Permite escolher o Sku desejado
 */
export var ModuloSkusPorEspecificacoes = function (
	skuJson,
	elemento,
	componentStore
) {
	ModuloSkus.call(this, skuJson, elemento, componentStore);
	sessionStorage.removeItem("sku-selecionado");
	var _this = this;

	this._opcoes = {
		especificacaoComImagem: "",
	};

	this.prefix = {
		cor: "",
		tamanho: "",
	};

	/**
	 * Escolhe os primeiros skus de cada variação
	 * @return {object} this
	 */
	this.setDefauls = function (setDefauls) {
		let bestSku = getBestSku();
		this.escolherSkuReferencia(bestSku);

		// if(_this._skuJson.skus.length === 1){
		if (setDefauls) {
			// forçar escolha do unico sku
			for (const especificacao in bestSku.dimensions) {
				if (bestSku.dimensions.hasOwnProperty(especificacao)) {
					const valorEspecificacao =
						bestSku.dimensions[especificacao];
					let $especificacao = producraInputNtmlParaEspecificacao(
						especificacao,
						valorEspecificacao
					);
					$especificacao.prop("checked", true);
				}
			}
			this.escolherSku(bestSku);
		}
		// }

		return this;
	};

	/* Prefixa o nome da especificação de acordo com a dimensão passada */
	this.prefixDimensionName = function (dimension) {
		var value = dimension.toLowerCase();

		if (_this.prefix[value]) {
			return `${_this.prefix[value]} ${value}:`;
		} else {
			return `${dimension}:`;
		}
	};

	/**
	 * Cria e insere o html com as variações dos skus
	 * @param  {Object} mapaEspecificacoes Mapa das especificações do produto
	 * @return {object} this
	 */
	this.desenhar = function () {
		if (
			!_this._skuJson.dimensionsMap ||
			_this._skuJson.dimensionsMap.length === 0
		) {
			console.warn("Erro! para de especificações não identificado.");
			return this;
		}
		// var $especificacao = $('<div />', {
		// 	class: 'skus-selection'
		// }).appendTo(this.elemento());

		for (var indice in _this._skuJson.dimensions) {
			if (_this._skuJson.dimensions.hasOwnProperty(indice)) {
				let nomeEspecificacao = _this._skuJson.dimensions[indice];
				var values = _this._skuJson.dimensionsMap[nomeEspecificacao];

				var $especificacao = $("<div />", {
					class:
						"especificacao " + textoParaNomeCss(nomeEspecificacao),
					"data-especificacao": textoParaNomeCss(nomeEspecificacao),
				}).appendTo(_this.elemento());

				$("<div />", {
					class: "titulo",
					text: _this.prefixDimensionName(nomeEspecificacao),
				}).appendTo($especificacao);

				var $lista = $("<ul />", {
					class: "skus",
				}).appendTo($especificacao);

				var nameCampo = textoParaNomeCss(
					_this.elemento().selector +
						"_" +
						nomeEspecificacao +
						"_" +
						i
				);

				if (values.length < 2) {
					$($especificacao).addClass("single-option");
				}

				for (var i = 0; i < values.length; i++) {
					var item = $("<li />", {
						class: "sku",
					}).appendTo($lista);
					var idText = textoParaNomeCss(
						_this.elemento().selector +
							"_" +
							nomeEspecificacao +
							"_" +
							values[i] +
							"_" +
							i
					);
					$("<input />", {
						"data-especificacao": values[i],
						"data-especificacao-title": nomeEspecificacao,
						val: values[i],
						id: idText,
						type: "radio",
						name: nameCampo,
					}).appendTo(item);

					let sku = getSkuPorEspecificacoes({
						[nomeEspecificacao]: values[i],
					});

					let $label = $("<label />", {
						for: idText,
						class: sku.available ? "disponivel" : "indisponivel",
					}).appendTo(item);

					if (
						nomeEspecificacao ===
						_this._opcoes.especificacaoComImagem
					) {
						$label.addClass("image");
						let src = obtemImagemParaEspecificacao(
							nomeEspecificacao,
							values[i]
						);

						$("<img />", {
							src: alterarTamanhoImagemSrcVtex(src, 72, 100),
							title: nomeEspecificacao + ": " + values[i],
						}).appendTo($label);
					} else {
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
		_this
			.elemento()
			.find(".especificacao input")
			.on("change", function () {
				var especificacoesDoSku = {},
					sku;
				var nomeEspecificacao = "";
				_this
					.elemento()
					.find(".especificacao input:checked")
					.each(function () {
						nomeEspecificacao = this.getAttribute(
							"data-especificacao-title"
						);
						especificacoesDoSku[
							nomeEspecificacao
						] = this.getAttribute("data-especificacao");
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
	function getBestSku() {
		var bestSku;
		for (const i in _this._skuJson.skus) {
			if (_this._skuJson.skus.hasOwnProperty(i)) {
				const sku = _this._skuJson.skus[i];
				if (sku.available) {
					bestSku = sku;
					break;
				}
			}
		}
		if (typeof bestSku === "undefined") {
			bestSku = _this._skuJson.skus[0];
		}
		return bestSku;
	}
	function producraInputNtmlParaEspecificacao(especificacao, valor) {
		especificacao = textoParaNomeCss(especificacao);
		let $lista = _this
			.elemento()
			.find('.especificacao[data-especificacao="' + especificacao + '"]');
		return $lista.find('li input[data-especificacao="' + valor + '"]');
	}
	function obtemImagemParaEspecificacao(especificacao, valor) {
		for (const i in _this._skuJson.skus) {
			if (_this._skuJson.skus.hasOwnProperty(i)) {
				const sku = _this._skuJson.skus[i];

				for (const tituloEspecificacao in sku.dimensions) {
					if (sku.dimensions.hasOwnProperty(tituloEspecificacao)) {
						if (tituloEspecificacao === especificacao) {
							if (sku.dimensions[tituloEspecificacao] === valor) {
								var urlSku = "/produto/sku/" + sku.sku;
								let skuData;
								var jqXHR = $.ajax({
									url: urlSku,
									type: "GET",
									success: function (value) {
										const images = value[0].Images;
										const thumbsCor =
											images[images.length - 1];
										skuData =
											thumbsCor[thumbsCor.length - 1]
												.Path;
									},
									async: false,
								});

								if (skuData) {
									return skuData;
								}
								return sku.image;
							}
						}
					}
				}
			}
		}
		return "";
	}
};
// subclasse extende superclasse
ModuloSkusPorEspecificacoes.prototype = Object.create(ModuloSkus.prototype);
ModuloSkusPorEspecificacoes.prototype.constructor = ModuloSkusPorEspecificacoes;

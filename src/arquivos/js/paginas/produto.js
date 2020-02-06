import loja from "../configuracaoLoja.json";
import utils from "../parts/utils";
import Components from "../lib/ComponentesProduto/main";
import "../lib/elevateZoom";

export default class Produto {

	constructor () {
		this.mapearSkus();
		let skuJsonAdultered = this.ordenarEspecificacoes(window.skuJson);
		this.imagensDasVariacoes();
		this.preco(".moduloPreco");
		this.quantidade(".moduloQuantidade");
		this.botaoDeCompra(".moduloBotaoDeCompra");
		this.aviseme(".moduloAviseMe");
		this.imagensCompreJunto();

		this.selecaoSkus(".moduloSkus", skuJsonAdultered);

		this.shortDescription();
		this.zoomImagemPrincipal();
		this.productSlides();
		this.exibirVariacaoDeCores();
	}

	/*
	 * 'itempropImage': Adiciona itemprop na imagem para melhorar os meta dados da página.
	 * 'Documentação':  https://schema.org/Product
	 */
	itempropImage() {
		$(".apresentacao #image #image-main").attr("itemprop", "image");
	}

	preco(elemento) {
		var moduloPreco = new Components.ModuloPreco(elemento).configurar({
			precoDe: {
				ativo: true
			},
			precoPor: {
				ativo: true
			},
			parcelado: {
				ativo: true,
				auto: true
			},
			boleto: {
				ativo: false
			}
		});
		moduloPreco.desenhar();
	}

	selecaoSkus(elemento, skuJsonAdultered) {
		let moduloAdequado = obterModuloDeSkusPara(skuJsonAdultered);
		var ModuloSkus = new moduloAdequado(skuJsonAdultered, elemento);
		// ModuloSkus.elemento();
		ModuloSkus.opcoes({
			especificacaoComImagem: "Cores"
		});
		ModuloSkus.desenhar().configurar();
		return ModuloSkus.setDefauls(true);
		// this.opcaoSkuIndisponivel();
	}

	quantidade(elemento) {
		var moduloBtnQtd = new Components.ModuloBtnQtd();
		moduloBtnQtd.configurar({
			max: 50
		});

		var moduloQuantidade = new Components.ModuloQuantidade(elemento);
		moduloQuantidade.configurar({
			maxEstoque: 50
		});
		moduloQuantidade.moduloExibicao(moduloBtnQtd);
		moduloQuantidade.desenhar();
	}

	botaoDeCompra(elemento) {
		var moduloBotaoDeCompra = new Components.ModuloBotaoDeCompra(elemento);
		moduloBotaoDeCompra.configurar({
			botaoCompra: "Comprar",
			botaoSkuIndisponivel: "Indisponível",
			msgAddCarrinhoSucesso: "Adicionado à <strong>Sacola</strong> "
		});
		moduloBotaoDeCompra.desenhar();
	}

	aviseme(elemento) {
		var opcoes = {
			titulo:
				"<span>Que pena, esse tamanho está indisponível, mas nós te avisamos quando chegar!</span>",
			placeholderNome: "Digite seu nome",
			placeholderEmail: "Digite seu e-mail",
			btnSubmit: "Avise-me!"
		};

		var moduloAviseMe = new Components.ModuloAviseMe(elemento);
		moduloAviseMe.configurar(opcoes);
		moduloAviseMe.desenhar();
	}

	exibirVariacaoDeCores() {
		var urlSimilares =
			"/api/catalog_system/pub/products/crossselling/similars/" +
			window.skuJson.productId;

		var jqXHR = $.ajax({
			url: urlSimilares,
			type: "GET"
		});

		jqXHR.done(function sucesso(value) {
			if (value.length > 0) {
				var variacaoSku = $(".product-info .similares");
				var titulo = $("<div />", {
					class: "titulo",
					text: "Escolha a cor:"
				}).appendTo(variacaoSku);
				var ul = $("<ul />").appendTo(variacaoSku);

				var produtosJaExibidos = [];
				for (var i = 0; i < value.length; i++) {
					if (
						$.inArray(value[i].productId, produtosJaExibidos) == -1
					) {
						produtosJaExibidos.push(value[i].productId);
						var li = $("<li />");
						var link = $("<a />", {
							href: value[i].link,
							title: value[i].productName
						}).appendTo(li);
						var img = value[i].items[0].images[0].imageTag;
						img = img
							.replace(/#width#/gi, "90")
							.replace(/#height#/gi, "90");
						img = img.replace(
							"~",
							"//" + loja.accontuName + ".vteximg.com.br/"
						);
						$(img).appendTo(link);

						li.appendTo(ul);
					}
				}

				ul.slick({
					dots: true,
					arrows: false,
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 3,
					speed: 500,
					variableWidth: true
				});
			}
		});
	}

	shortDescription() {
		$(".descricao-produto a").on("click", function(event) {
			event.preventDefault();
			$("html,body").animate(
				{
					scrollTop:
						$("#descricao-completa")
							.eq(0)
							.offset().top - 50
				},
				500
			);
		});
	}

	zoomImagemPrincipal() {
		if (!utils.isMobile) {
			$(".product-image .apresentacao #include").on(
				"mouseover",
				function() {
					var srcImg = $(".sku-rich-image-main").attr("src");

					$(".sku-rich-image-main").attr(
						"src",
						utils.alterarTamanhoImagemSrcVtex(srcImg, 1000, 1000)
					);
					// ativa o zoom
					$(".sku-rich-image-main").elevateZoom({
						zoomType: "inner",
						cursor: "crosshair"
					});
				}
			);

			$("body").on("mouseleave", ".zoomContainer", function() {
				$(".sku-rich-image-main").removeData("elevateZoom");
				$(".zoomContainer").remove();
			});
		}
	}

	productSlides() {
		var $thumbs = $(".product-image .thumbs");
		// slide.produtopTumbs($thumbs);

		$(".similares ul").slick({
			dots: true,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			speed: 500,

			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}
			]
		});
	}

	imagensDasVariacoes() {
		if (typeof window.FireSkuSelectionChanged !== "undefined") {
			$(document).on("change-sku", function(event, data) {
				var idSku = data.sku;
				window.FireSkuSelectionChanged(idSku);
			});
		}
	}

	mapearSkus() {
		window.skuJson = mapearSkus(window.skuJson);
	}

	ordenarEspecificacoes(skuJson) {
		let skuJsonAdultered = skuJson;

		skuJsonAdultered.dimensions = ordenarEspecificacoes(
			skuJsonAdultered.dimensions,
			["Tamanhos", "Cores"]
		);
		skuJsonAdultered.dimensionsMap["Cores"] = ordenarEspecificacoes(
			skuJsonAdultered.dimensionsMap["Cores"]
		);
		skuJsonAdultered.dimensionsMap[
			"Tamanhos"
		] = ordenarEspecificacoes(skuJsonAdultered.dimensionsMap["Tamanhos"], [
			"PP",
			"P",
			"M",
			"G",
			"GG"
		]);

		return skuJsonAdultered;
	}

	imagensCompreJunto() {
		window.onload = function() {
			setTimeout(function() {
				let images = $(".compre-junto table img");

				for (let i = 0; i < images.length; i++) {
					let imageUrl = $(images[i]).attr("src");
					let newUrl = utils.alterarTamanhoImagemSrcVtex(
						imageUrl,
						250,
						250
					);
					$(images[i]).attr("src", newUrl);
				}
			}, 1500);
		};
	}

}


/**
 * Função para mapear skus sem especificações no skuJson
 * esse script usa o nome de cada sku como variação "cadastrada" para o funcionameto correto dos modulos de produto
 * @param {object} skuJson
 */
function mapearSkus(skuJson) {
	var skuJsonAdultered = skuJson;
	if (skuJson.dimensions.length == 0) {
		let variationName = "variacao";
		let nameSkus = [];

		for (const i in skuJsonAdultered.skus) {
			if (skuJsonAdultered.skus.hasOwnProperty(i)) {
				const sku = skuJsonAdultered.skus[i];

				nameSkus.push(sku.skuname);
				sku.dimensions[variationName] = sku.skuname;
			}
		}

		skuJsonAdultered.dimensions.push(variationName);
		skuJsonAdultered.dimensionsInputType[variationName] = "Combo";
		skuJsonAdultered.dimensionsMap[variationName] = nameSkus;

		skuJsonAdultered._scriptMapVariations = true;
	}
	return skuJsonAdultered;
}
/**
 * Retorna a instancia adequada para o cenário de produtos
 * @param {object} skuJson Objeto de produto com suas variações
 */
function obterModuloDeSkusPara(_skuJson) {
	if (_skuJson.dimensions.length > 1) {
		return Components.ModuloSkusPorEspecificacoes;
	}
	return Components.ModuloSkusPorNome;
}
/**
 *
 * @param {array} especificacoes lista com os valores das especificações
 * @param {array|function} ordem lista ordenada ou funcao de ordenacao
 */
function ordenarEspecificacoes(especificacoes, ordem) {
	var ordenado = [];
	ordenado = especificacoes;
	if (Array.isArray(ordem)) {
		ordenado.sort(function(a, b) {
			return ordem.indexOf(a) - ordem.indexOf(b);
		});
	} else {
		if (ordem instanceof Function) {
			ordenado.sort(ordem);
		} else {
			ordenado.sort();
		}
	}
	return ordenado;
}

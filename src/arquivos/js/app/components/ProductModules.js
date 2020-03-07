import Components from "Lib/ComponentesProduto/index";

export default class ProductModules {
	constructor() {
		this.mapearSkus();
		this.preco(".product__price");
		this.quantidade(".product__qtd");
		this.botaoDeCompra(".product__buy-btn");
		this.aviseme(".product__alert-me");
		this.selecaoSkus(".product__skus", window.skuJson);
	}

	mapearSkus() {
		window.skuJson = mapearSkus(window.skuJson);
	}

	preco(elemento) {
		var moduloPreco = new Components.ModuloPreco(elemento).configurar({
			precoDe: {
				ativo: false
			},
			precoPor: {
				ativo: true
			},
			parcelado: {
				ativo: true,
				auto: false
			},
			boleto: {
				ativo: false
			}
		});
		moduloPreco.desenhar();
	}

	selecaoSkus(elemento, skuJsonAdultered) {
		var ModuloSkus = new Components.ModuloSkusPorEspecificacoes(
			skuJsonAdultered,
			elemento
		);
		// ModuloSkus.elemento();
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

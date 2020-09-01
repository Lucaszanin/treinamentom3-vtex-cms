import { Modulo } from "./Modulo";
import { CHANGE_SKU, SKU_REF } from "./EventType";
/**
 * modulo de seleção dos skus
 * Permite escolher o Sku desejado
 */
export var ModuloSkus = function (
	skuJson,
	elemento = ".skuSelection",
	componentStore
) {
	Modulo.call(this, elemento, componentStore);
	sessionStorage.removeItem("sku-selecionado");
	this._skuJson = skuJson;
	var skuReferencial;

	/**
	 * Atualiza os valores no html que foi criado
	 * @return {object} this
	 */
	this.atualizar = function () {
		this.desenhar();
		return this;
	};
	/**
	 * Escolhe os primeiros skus de cada variação
	 * @return {object} this
	 */
	this.setDefauls = function () {
		return this;
	};
	/**
	 * Cria e insere o html com as variações dos skus
	 * @param  {Object} mapaEspecificacoes Mapa das especificações do produto
	 * @return {object} this
	 */
	this.desenhar = function () {
		return this;
	};
	/**
	 * Configura os eventos de atualizacao
	 * @return {object} this
	 */
	this.configurar = function () {
		return this;
	};

	this.escolherSku = function (sku) {
		if (sku) {
			componentStore.events.publish(CHANGE_SKU, sku);
			componentStore.commit("setSelectedSku", sku);
		} else {
			console.warn("Não conseguimos identificar o sku correspondente");
			// console.warn(especificacoesDoSku);
		}
	};

	this.escolherSkuReferencia = function (sku) {
		if (typeof skuReferencial === "undefined") {
			skuReferencial = sku;
			/**
			 * para capturar o evento
			 * $(document).on( 'change-sku' , function(event, novoSku){} );
			 */

			sessionStorage.setItem("sku-referencial", JSON.stringify(sku));
			componentStore.events.publish(SKU_REF, sku);
		}
	};
};
// subclasse extende superclasse
ModuloSkus.prototype = Object.create(Modulo.prototype);
ModuloSkus.prototype.constructor = ModuloSkus;

import { Modulo } from "./Modulo";
import { SKU_REF, CHANGE_SKU } from "./EventType";
/**
 * Modulo de quantidade
 * Permite escolher a quantidade de um sku
 */
export var ModuloQuantidade = function (
	elemento = ".qtd-selector-content:first-child",
	componentStore
) {
	Modulo.call(this, elemento, componentStore);
	this._opcoes = {
		maxEstoque: 50,
	};
	var _this = this;
	/**
	 * Configura os eventos js que serão diparados pelo html do desenhar()
	 * @return {object} this
	 */
	this.configurar = function (opcoes) {
		this.opcoes($.extend({}, this._opcoes, opcoes));

		componentStore.events.subscribe(SKU_REF, function (event, sku) {
			_this.atualizar(sku);
		});
		componentStore.events.subscribe(CHANGE_SKU, function (event, sku) {
			_this.atualizar(sku);
		});
		return this;
	};
	/**
	 * Atualiza a quantidade de acordo com o novo sku
	 * @param  {Event} event evento que disparou atualização
	 * @param  {Object} novoSku objeto do sku selecionado
	 * @return {Object} this
	 */
	this.atualizar = function (novoSku) {
		if (novoSku?.available === true) {
			var estoque,
				skuId = novoSku.sku;
			try {
				estoque = window.dataLayer[0].skuStocks[skuId];
			} catch (e) {
				console.warn(
					"Erro ao buscar estoque no dataLayer, usado o availablequantity"
				);
				estoque = novoSku.availablequantity;
			}
			estoque =
				estoque > this.opcoes().maxEstoque
					? this.opcoes().maxEstoque
					: estoque;

			this.moduloExibicao().atualizar(estoque);
			this.elemento().removeClass("desativado");
		} else {
			this.moduloExibicao().atualizar(0);
			this.elemento().addClass("desativado");
		}
		return this;
	};
	/**
	 * Cria e insere o html com as variações dos skus
	 * @return {object} this
	 */
	this.desenhar = function () {
		if (this.moduloExibicao()) {
			this.moduloExibicao().elemento(this.elemento());
			this.moduloExibicao().desenhar();
		} else {
			console.warn("Modulo de exibição não definido");
		}
		return this;
	};
	/**
	 * Get/Set moduloExibicao do modulo
	 * @param  {JSON} moduloExibicao seletor em formato cssopções do modulo
	 * @return {JSON}
	 */
	this.moduloExibicao = function (moduloExibicao) {
		if (moduloExibicao) this._moduloExibicao = moduloExibicao;
		return this._moduloExibicao;
	};
};
// subclasse extende superclasse
ModuloQuantidade.prototype = Object.create(Modulo.prototype);
ModuloQuantidade.prototype.constructor = ModuloQuantidade;

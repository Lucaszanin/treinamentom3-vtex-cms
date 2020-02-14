import { Modulo } from "./Modulo";
/**
 * Modulo de quantidade
 * Permite escolher a quantidade de um sku
 */
export var ModuloQuantidade = function(
	elemento = ".qtd-selector-content:first-child"
) {
	Modulo.call(this, elemento);
	this._opcoes = {
		maxEstoque: 50
	};
	var _this = this;
	/**
	 * Configura os eventos js que serão diparados pelo html do desenhar()
	 * @return {object} this
	 */
	this.configurar = function(opcoes) {
		this.opcoes($.extend({}, this._opcoes, opcoes));
		$(document).one("sku-referencial", function() {
			var novoSku = JSON.parse(sessionStorage.getItem("sku-referencial"));
			_this.atualizar(novoSku);
		});
		$(document).on("change-sku", function() {
			var novoSku = JSON.parse(sessionStorage.getItem("sku-selecionado"));
			_this.atualizar(novoSku);
		});
		return this;
	};
	/**
	 * Atualiza a quantidade de acordo com o novo sku
	 * @param  {Event} event evento que disparou atualização
	 * @param  {Object} novoSku objeto do sku selecionado
	 * @return {Object} this
	 */
	this.atualizar = function(novoSku) {
		if (!novoSku) {
			novoSku = {
				available: false
			};
		}
		if (novoSku.available) {
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
	this.desenhar = function() {
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
	this.moduloExibicao = function(moduloExibicao) {
		if (moduloExibicao) this._moduloExibicao = moduloExibicao;
		return this._moduloExibicao;
	};
};
// subclasse extende superclasse
ModuloQuantidade.prototype = Object.create(Modulo.prototype);
ModuloQuantidade.prototype.constructor = ModuloQuantidade;

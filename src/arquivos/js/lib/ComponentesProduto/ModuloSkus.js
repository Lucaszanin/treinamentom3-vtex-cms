import  { Modulo } from "./Modulo";
/**
 * modulo de seleção dos skus
 * Permite escolher o Sku desejado
 */
export var ModuloSkus = function (skuJson,elemento='.skuSelection') {
	Modulo.call(this,elemento);
	sessionStorage.removeItem('sku-selecionado');
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

	this.escolherSku = function(sku){
		if (sku) {
			/**
			 * para capturar o evento
			 * $(document).on( 'change-sku' , function(event, novoSku){} );
			 */
			sessionStorage.setItem('sku-selecionado', JSON.stringify(sku));
			$(document).trigger('change-sku', sku);
			// console.log(sku);
		}
		else {
			console.warn("Não conseguimos identificar o sku correspondente");
			// console.warn(especificacoesDoSku);
		}
	}

	this.escolherSkuReferencia = function(sku){
		if(typeof skuReferencial === "undefined") {
			skuReferencial = sku;
			/**
			 * para capturar o evento
			 * $(document).on( 'change-sku' , function(event, novoSku){} );
			 */

			sessionStorage.setItem('sku-referencial', JSON.stringify(sku));
			$(document).trigger('sku-referencial', sku);
			// console.log(sku);
		}
	}

};
// subclasse extende superclasse
ModuloSkus.prototype = Object.create(Modulo.prototype);
ModuloSkus.prototype.constructor = ModuloSkus;


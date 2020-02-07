import { Modulo } from "./Modulo";
import { alterarTamanhoImagemSrcVtex } from "./util";
/**
 * Modulo de quantidade
 * Permite escolher a quantidade de um sku
 */
export var ModuloCompreJunto = function(elemento = ".compre-junto") {
	Modulo.call(this, elemento);
	this._opcoes = {
		titulo: "Compre junto"
	};
};
// subclasse extende superclasse
ModuloCompreJunto.prototype = Object.create(Modulo.prototype);
ModuloCompreJunto.prototype.constructor = ModuloCompreJunto;
/**
 * Configura os eventos js que serão diparados pelo html do desenhar()
 * @return {object} this
 */
ModuloCompreJunto.prototype.configurar = function(opcoes) {
	this.opcoes($.extend({}, this._opcoes, opcoes));
	$(document).on("change-sku", this.atualizar.bind(this));
	return this;
};
/**
 * Atualiza a quantidade de acordo com o novo sku
 * @param  {Event} event evento que disparou atualização
 * @param  {Object} novoSku objeto do sku selecionado
 * @return {Object} this
 */
ModuloCompreJunto.prototype.atualizar = function(event) {
	var novoSku = JSON.parse(sessionStorage.getItem("sku-selecionado"));
	if (!novoSku) {
		novoSku = {
			available: false
		};
	}
	if (novoSku.available) {
		var tabelaAtual = this.elemento().find(".produto-" + novoSku.sku);
		if (tabelaAtual.length != 0) {
			this.habilitar(true);
			this.elemento()
				.find(".produtos>div")
				.slideUp(
					600,
					function() {
						tabelaAtual.slideDown(600);
						this.elemento().trigger(
							"change-compre-junto",
							tabelaAtual
						);
					}.bind(this)
				);
		} else {
			this.buscarCompreJunto(novoSku.sku);
		}
	} else {
		this.habilitar(false);
	}
};
/**
 * Cria e insere o html com as variações dos skus
 * @return {object} this
 */
ModuloCompreJunto.prototype.desenhar = function() {
	this.elemento().addClass("desativado");
	$("<h2 />", {
		class: "special-title",
		text: this.opcoes().titulo
	}).appendTo(this.elemento());
	$("<div />", {
		class: "produtos"
	}).appendTo(this.elemento());
	return this;
};
/**
 * Cria e insere o html com as variações dos skus
 * Funçõa que busca os produtos disponiveis para
 * comprar junto com o produto = skuid
 * @param  skuId
 */
ModuloCompreJunto.prototype.buscarCompreJunto = function(skuId) {
	function sucesso(htmlCJVtex, textStatus, jqXHR) {
		if (htmlCJVtex.trim().length > 1) {
			var containerCompreJunto, imagens, $produtos;
			containerCompreJunto = $("<div />", {
				class: "produto-" + skuId,
				html: htmlCJVtex
			});
			$produtos = this.elemento().find(".produtos");
			$produtos.children().slideUp(600);
			$produtos.append(containerCompreJunto);
			this.habilitar(!0);
			imagens = $(
				".moduloCompreJunto .itemA img, .moduloCompreJunto .itemB img"
			);
			for (var i = 0; i < imagens.length; i++) {
				imagens[i].setAttribute(
					"src",
					alterarTamanhoImagemSrcVtex(imagens[i].src, 265, 403)
				);
			}
			this.elemento().trigger(
				"change-compre-junto",
				containerCompreJunto
			);
		}
	}
	function erro(jqXHR, textStatus, errorThrown) {
		console.warn(errorThrown);
		this.habilitar(false);
	}
	var jqXHR = $.get("/comprejuntosku/" + skuId);
	jqXHR.done(sucesso.bind(this)).fail(erro.bind(this));
};

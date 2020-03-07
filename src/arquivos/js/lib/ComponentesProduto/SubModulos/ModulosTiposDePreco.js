import { Modulo } from "../Modulo";
import { getPrice } from "../util";

export var ModuloPrecoBoleto = function(elemento, componentStore) {
	Modulo.call(this, elemento, componentStore);
	this.opcoes({
		ativo: true
	});
};
// subclasse extende superclasse
ModuloPrecoBoleto.prototype = Object.create(Modulo.prototype);
ModuloPrecoBoleto.prototype.constructor = ModuloPrecoBoleto;
/**
 * Cria o html
 * @return {jQueryElement}
 */
ModuloPrecoBoleto.prototype.desenhar = function() {
	var valorBoleto = $("<div />", {
		class: "preco-boleto"
	});
	$("<strong />", {
		class: "value"
	}).appendTo(valorBoleto);
	$("<span />", {
		html:
			' no boleto <span class="container-percentual"><span class="percentual">%</span>OFF</span>'
	}).appendTo(valorBoleto);
	this.elemento(valorBoleto);
	return valorBoleto;
};
/**
 * Atualiza/preenche o html com os valores corretos
 * @param {JSON} novoSku Sku selecionado
 */
ModuloPrecoBoleto.prototype.atualizar = function(novoSku) {
	var precoPrincipal = novoSku.bestPrice / 100;
	var precoBoleto =
		precoPrincipal - (precoPrincipal * this.percentual()) / 100;
	var valorBoleto = this.elemento();
	if (this.opcoes().ativo) {
		valorBoleto.find(".percentual").text(this.percentual() + "%");
		valorBoleto.find(".value").text("R$ " + getPrice(precoBoleto));
		valorBoleto.css("display", "block");
	} else {
		valorBoleto.css("display", "none");
	}
};
ModuloPrecoBoleto.prototype.percentual = function(percentual) {
	if (percentual) this._percentual = percentual;
	return this._percentual || 0;
};

export var ModuloPrecoDe = function(elemento) {
	Modulo.call(this);
	this.opcoes({
		ativo: true
	});
};
// subclasse extende superclasse
ModuloPrecoDe.prototype = Object.create(Modulo.prototype);
ModuloPrecoDe.prototype.constructor = ModuloPrecoDe;
/**
 * Cria o html
 * @return {jQueryElement}
 */
ModuloPrecoDe.prototype.desenhar = function() {
	var valorDe = $("<div />", {
		class: "valor-de"
	});
	// $('<span />', {
	// 	'text': 'De: '
	// }).appendTo(valorDe);
	$("<strong />", {
		class: "value"
	}).appendTo(valorDe);
	this.elemento(valorDe);
	return valorDe;
};
/**
 * Atualiza/preenche o html com os valores corretos
 * @param {JSON} novoSku Sku selecionado
 */
ModuloPrecoDe.prototype.atualizar = function(novoSku) {
	var precoDe = novoSku.listPrice / 100,
		precoPor = novoSku.bestPrice / 100;
	var valorDe = this.elemento();
	if (this.opcoes().ativo) {
		if (precoDe > precoPor) {
			valorDe.find(".value").text("R$ " + getPrice(precoDe));
			valorDe.css("display", "block");
		} else {
			valorDe.css("display", "none");
		}
	} else {
		valorDe.css("display", "none");
	}
};

export var ModuloPrecoParcelado = function(elemento) {
	Modulo.call(this);
	this.opcoes({
		auto: false,
		ativo: false,
		parcelas: 6
	});
	this.numeroParcelas(this.opcoes().parcelas);
};

// subclasse extende superclasse
ModuloPrecoParcelado.prototype = Object.create(Modulo.prototype);
ModuloPrecoParcelado.prototype.constructor = ModuloPrecoParcelado;
/**
 * Cria o html
 * @return {jQueryElement}
 */
ModuloPrecoParcelado.prototype.desenhar = function() {
	var valorDividido = $("<div />", {
		class: "valor-dividido"
	});
	$("<span />", {
		html: 'ou <strong class="numero-de-parcelas"></strong> de '
	}).appendTo(valorDividido);
	$("<strong />", {
		class: "value"
	}).appendTo(valorDividido);
	$("<span />", {
		html: " sem juros"
	}).appendTo(valorDividido);
	this.elemento(valorDividido);
	return valorDividido;
};
ModuloPrecoParcelado.prototype.numeroParcelas = function(numeroParcelas) {
	if (numeroParcelas) {
		this.opcoes().parcelas = numeroParcelas;
	}
	return this.opcoes().parcelas;
};
/**
 * Atualiza/preenche o html com os valores corretos
 * @param {JSON} novoSku Sku selecionado
 */
ModuloPrecoParcelado.prototype.atualizar = function(novoSku) {
	if (this.opcoes().auto) {
		this.numeroParcelas(parseInt(novoSku.installments));
	}
	var precoPrincipal = novoSku.bestPrice / 100;
	var precoDivido = precoPrincipal / this.numeroParcelas();
	var valorDividido = this.elemento();
	if (this.opcoes().ativo && this.numeroParcelas() > 1) {
		valorDividido
			.find(".numero-de-parcelas")
			.text(this.numeroParcelas() + "x");
		valorDividido.find(".value").text("R$ " + getPrice(precoDivido));
		valorDividido.css("display", "block");
	} else {
		valorDividido.css("display", "none");
	}
};

export var ModuloPrecoPor = function(elemento) {
	Modulo.call(this);
	this.opcoes({
		ativo: true
	});
};

// subclasse extende superclasse
ModuloPrecoPor.prototype = Object.create(Modulo.prototype);
ModuloPrecoPor.prototype.constructor = ModuloPrecoPor;
/**
 * Cria o html
 * @return {jQueryElement}
 */
ModuloPrecoPor.prototype.desenhar = function() {
	var valorPor = $("<div />", {
		class: "valor-por"
	});
	// $('<span />', {
	// 	'text': 'Por: '
	// }).appendTo(valorPor);
	$("<strong />", {
		class: "value"
	}).appendTo(valorPor);
	this.elemento(valorPor);
	return valorPor;
};
/**
 * Atualiza/preenche o html com os valores corretos
 * @param {JSON} novoSku Sku selecionado
 */
ModuloPrecoPor.prototype.atualizar = function(novoSku) {
	var valorPor = this.elemento();
	if (this.opcoes().ativo) {
		var precoPor = novoSku.bestPrice / 100;
		if (precoPor) {
			valorPor.find(".value").text("R$ " + getPrice(precoPor));
			valorPor.css("display", "block");
		} else {
			valorPor.css("display", "none");
		}
	} else {
		valorPor.css("display", "none");
	}
};

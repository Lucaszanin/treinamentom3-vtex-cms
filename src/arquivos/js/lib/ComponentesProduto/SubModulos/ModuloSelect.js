const { Modulo } = require("../Modulo");

var ModuloSelect = function () {
	Modulo.call(this);
	this.elemento('.qtd-selector');
	this._opcoes = {
		'titulo': "Quantidade",
		'opcaoDefault': "Selecione",
		'opcaoIndisponivel': "Indisponivel"
	};
};
exports.ModuloSelect = ModuloSelect;
// subclasse extende superclasse
ModuloSelect.prototype = Object.create(Modulo.prototype);
ModuloSelect.prototype.constructor = ModuloSelect;
/**
 * Cria html
 * @return {jQueryElement}	Elemento jquery contendo o seletor de quantidade
 */
ModuloSelect.prototype.desenhar = function () {
	var $qtd = $('<div />', {
		class: 'qtd-selector'
	});
	$('<span />', {
		class: 'titulo',
		text: this.opcoes().titulo
	}).appendTo($qtd);
	$('<span />', {
		class: 'wrap-select'
	}).appendTo($qtd).append($('<select />', {
		class: 'quantidade'
	}).on('change', this.onChange.bind(this)));
	$qtd.appendTo(this.elemento());
	return this;
};
ModuloSelect.prototype.onChange = function () {
	var quantidade = this.elemento().find('.quantidade').val();
	$(document).trigger('change-quantidade', quantidade);
};
/**
 * Atualiza o estoque( max )
 * @param {float} novoEstoque valor para atualizacao do estoque
 */
ModuloSelect.prototype.atualizar = function (novoEstoque) {
	var opcoes;
	if (novoEstoque > 0) {
		opcoes = "<option value=\"0\" disabled >" + this.opcoes().opcaoDefault + "</option>";
		for (var i = 1; i < novoEstoque; i++) {
			opcoes += "<option value=\"" + i + "\">" + i + "</option>";
		}
		this.elemento().removeClass('desabilitado');
	}
	else {
		opcoes = "<option value=\"0\" disabled selected >" + this.opcoes().opcaoIndisponivel + "</option>";
		this.elemento().addClass('desabilitado');
	}
	this.elemento().find('.quantidade').html(opcoes);
};

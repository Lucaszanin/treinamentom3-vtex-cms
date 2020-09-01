/**
 * Modulo de criação de html
 * preenchendo com JSON
 * atualizado por eventos js
 */
export var Modulo = function (elemento, store) {
	this.elemento(elemento);
	this.store(store);
};
/**
 * Atualiza os valores no html que foi criado
 * @return {object} this
 */
Modulo.prototype.atualizar = function () {
	return this;
};

Modulo.prototype.store = function (store) {
	this._store = store;
	return this._store;
};

/**
 * Cria e insere o html com as variações dos skus
 * @return {object} this
 */
Modulo.prototype.desenhar = function () {
	return this;
};
/**
 * Configura os eventos de atualizacao
 * @return {object} this
 */
Modulo.prototype.configurar = function (opcoes) {
	this.opcoes($.extend({}, this._opcoes, opcoes));
	return this;
};
/**
 * Get/Set elemento onde sera inserido
 * @param  {String} seletor seletor em formato css
 * @return {JqueryElement}
 */
Modulo.prototype.elemento = function (seletor) {
	if (seletor)
		this._elemento = typeof seletor === "string" ? $(seletor) : seletor;
	return this._elemento;
};
/**
 * Get/Set opcoes do modulo
 * @param  {JSON} opcoes seletor em formato cssopções do modulo
 * @return {JSON}
 */
Modulo.prototype.opcoes = function (opcoes) {
	if (opcoes) this._opcoes = opcoes;
	return this._opcoes;
};
/**
 * Função para ativar/exibir um modulo
 * @param {boolean} habilitar
 */
Modulo.prototype.habilitar = function (habilitar) {
	habilitar = typeof habilitar == "undefined" ? true : habilitar;
	if (habilitar == true) {
		this.elemento().removeClass("desativado");
	} else {
		this.elemento().addClass("desativado");
	}
};

const { Modulo } = require("./Modulo");
/**
 * Modulo de quantidade
 * Permite escolher a quantidade de um sku
 */
var ModuloAviseMe = function (elemento = '.avise-me-container:first-child') {
	Modulo.call(this,elemento);
	var _this = this;

	this._opcoes = {
		"titulo": 'Avise-me quando o produto <span id="avise-me-produto-nome"></span> estiver disponível',
		"fechar": '&#215;',
		'placeholderNome': 'Digite seu nome...',
		'placeholderEmail': 'Digite seu e-mail...',
		'btnSubmit': "Enviar",
		'msgSucesso': 'Cadastrado com sucesso!',
		'msgErro': 'Ocorreu algum erro. Tente novamente mais tarde.'
	};
	/**
	* Configura os eventos js que serão diparados pelo html do desenhar()
	 * @return {object} this
	 */
	this.configurar = function (opcoes) {
		this.opcoes($.extend({}, this._opcoes, opcoes));
		$(document).one('sku-referencial', function(){
			var novoSku = JSON.parse(sessionStorage.getItem('sku-referencial'));
			_this.atualizar(novoSku);
		});
		$(document).on('change-sku', function(){
			var novoSku = JSON.parse(sessionStorage.getItem('sku-selecionado'));
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
	this.atualizar = function (novoSku) {
		if (!novoSku) {
			novoSku = {
				available: false
			};
		}
		if (!novoSku.available) {
			this.elemento().find('#sku-avise-me').val(novoSku.sku);
			this.elemento().find('#avise-me-produto-nome').val(novoSku.skuname);
		}
		this.elemento().toggle(!novoSku.available);
		return this;
	};
	/**
	 * Cria e insere o html com as variações dos skus
	 * @return {object} this
	 */
	this.desenhar = function () {
		if ($('.form-avise-me').length == 0) {
			var container = $('<div />').addClass('avise-me-container').appendTo(this.elemento());
			var fieldset = $('<fieldset />').addClass('form-avise-me').appendTo(container);
			$('<a />').attr({
				class: 'close',
				text: this.opcoes().fechar
			}).click(function () {
				this.elemento().hide();
			}.bind(this)).appendTo(fieldset);
			$('<h2 />', {
				html: this.opcoes().titulo
			}).appendTo(fieldset);
			$('<input />', {
				name: 'notifymeClientName',
				type: 'text',
				id: 'nome-avise-me',
				size: '20',
				placeholder: this.opcoes().placeholderNome
			}).appendTo(fieldset);
			$('<input />', {
				name: 'notifymeClientEmail',
				type: 'text',
				id: 'email-avise-me',
				size: '20',
				placeholder: this.opcoes().placeholderEmail
			}).appendTo(fieldset);
			$('<input />', {
				name: 'notifymeIdSku',
				type: 'hidden',
				id: 'sku-avise-me',
				class: 'notifyme-skuid',
				value: 0
			}).appendTo(fieldset);
			$('<input />', {
				name: 'notifymeButtonOK',
				type: 'button',
				id: 'enviar-avise-me',
				class: 'btn-enviar',
				value: this.opcoes().btnSubmit
			}).click(this.enviar.bind(this)).appendTo(fieldset);
			$('<p />', {
				class: 'status'
			}).appendTo(fieldset);
		}
		return this;
	};
	/**
	 * Funçõa que envia registra a solicitação de "avise-me"
	 */
	this.enviar = function () {
		var aviseme = this.elemento().find('.form-avise-me');
		if (!this.validar(aviseme)) {
			return false;
		}
		$.ajax({
			type: 'POST',
			url: '/no-cache/AviseMe.aspx',
			data: aviseme.serialize(),
			success: function () {
				aviseme.find('p.status').html(this.opcoes().msgSucesso).addClass('msgSucesso');
				aviseme.find('input').hide();
			}.bind(this),
			error: function () {
				aviseme.find('p.status').html(this.opcoes().msgErro).addClass('msgErro');
			}.bind(this)
		});
	};
	/**
	 * Função para validar os dados do formulário
	 * @param {jQueryElement} aviseme
	 */
	this.validar = function validar(aviseme) {
		var nome = aviseme.find('#nome-avise-me');
		var email = aviseme.find('#email-avise-me');
		var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		// if( nome.val() == '' ) {
		// 	alert( 'Por favor, digite seu nome' );
		// 	nome.focus();
		// 	return false;
		// }
		if (!filter.test(email.val())) {
			alert('Por favor, digite o email corretamente');
			email.focus();
			return false;
		}
		return true;
	};


};
// subclasse extende superclasse
ModuloAviseMe.prototype = Object.create(Modulo.prototype);
ModuloAviseMe.prototype.constructor = ModuloAviseMe;

exports.ModuloAviseMe = ModuloAviseMe;

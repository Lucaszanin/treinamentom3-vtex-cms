const { Modulo } = require("./Modulo");
/**
 * Modulo de compra
 * permite adicopnar produtos ao carinho
 * fornece o formulario de avise-me para produtos indisponiveis
 * exibe popup de "porduto adicionado ao carrinho"
 *
 * usa api vtex para adicionar no carrinho
 * @link https://github.com/vtex/vtex.js/tree/master/docs/checkout#addtocartitems-expectedorderformsections-saleschannel
 */
var ModuloBotaoDeCompra = function (elemento='.btnBuy') {
	Modulo.call(this,elemento);
	var _this = this;
	_this.produtoEscolhido = {
		"sku": null,
		"quantidade": 1
	};
	this._opcoes = {
		'botaoCompra': "Comprar",
		'botaoSkuIndisponivel': 'Produto indisponível',
		'msgVariacaoErro': "<p>Escolha uma variação.</p>",
		'msgAddCarrinhoErro': "<p>Não foi possivel adicionar ao carrinho!</p>",
		'msgAddCarrinhoSucesso': "<p>Seu produto foi adicionado ao carrinho com sucesso!</p><p>O que deseja fazer agora?</p>",
		'botaoContinuarComrpando': 'Continuar comprando',
		'botaoFinalizarCompra': 'Finalizar compra'
	};
	/**
	 * Atualiza a quantidade de acordo com o novo sku
	 * @param  {Event} event evento que disparou atualização
	 * @param  {Object} value objeto do sku selecionado
	 * @return {Object} this
	 */
	this.atualizar = function (event, value) {
		if (event) {
			switch (event.type) {
			case "change-quantidade":
				_this.produtoEscolhido.quantidade = value;
				break;
			case "change-sku":
				var sku = JSON.parse(sessionStorage.getItem('sku-selecionado'));
				_this.produtoEscolhido.sku = sku;
				this.habilitar(sku.available);
				break;
			default:
				console.warn("Evento desconhecido");
				break;
			}
		}
		else {
			console.warn('Essa funcao só deve ser chamada por eventos js');
		}
		return this;
	};
	this.obterCannalDeVendas = function () {
		var name = "VTEXSC=sc=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1);
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return 1;
	};
	/**
	 * Configura os eventos js que serão diparados pelo html do desenhar()
	 * @return {object} this
	 */
	this.configurar = function (opcoes) {
		this.opcoes($.extend({}, this._opcoes, opcoes));
		this.opcoes.cannalDeVendas = this.obterCannalDeVendas();


		$(document).on('change-sku', this.atualizar.bind(this));
		$(document).on('change-quantidade', this.atualizar.bind(this));
		$(document).on('add-skuAddCarrinho.sucess', this.sucessoAjax.bind(this));
		$(document).on('add-skuAddCarrinho.fail', this.erroAjax.bind(this));
		return this;
	};
	/**
	 * Cria e insere o html com as variações dos skus
	 * @return {object} this
	 */
	this.desenhar = function () {
		var $botao = $('<a />', {
			'class': 'btn-compra',
			text: this.opcoes().botaoCompra
		}).click(this.compra.bind(this));
		this.elemento().append($botao);
		return this;
	};
	this.compra = function () {
		if(_this.produtoEscolhido.sku === null){

			mensagemErro(this.opcoes().msgVariacaoErro);

		}else  if (!_this.produtoEscolhido.sku.available && _this.produtoEscolhido.quantidade < 1) {
			this.elemento().trigger('add-skuAddCarrinho.fail', _this.produtoEscolhido);
		}else {
			try {
				window.vtexjs.checkout.addToCart([{
					'id': _this.produtoEscolhido.sku.sku,
					'quantity': _this.produtoEscolhido.quantidade,
					'seller': _this.produtoEscolhido.sku.sellerId
				}], null, this.opcoes.cannalDeVendas)
					.done(function (orderForm) {
						this.elemento().trigger('add-skuAddCarrinho.sucess', {
							simpleProducts: _this.produtoEscolhido,
							orderForm: orderForm
						});
					}.bind(this))
					.fail(function () {
						this.elemento().trigger('add-skuAddCarrinho.fail', {
							simpleProducts: _this.produtoEscolhido
						});
					}.bind(this));
			}
			catch (error) {
				this.elemento().trigger('add-skuAddCarrinho.fail', {
					simpleProducts: _this.produtoEscolhido
				});
				console.warn('Erro ao adicionar sku ao carrinho de compra');
				console.log(error);
			}
		}
	};
	this.sucessoAjax = function (items) {
		if ($('.popup-add-cart').length < 1) {
			var $popup = $('<div />', {
				class: 'popup-add-cart'
			}).appendTo(this.elemento());

			$('<img />', {
				src: this.produtoEscolhido.sku.image,
				alt: this.produtoEscolhido.sku.skuname
			}).appendTo($popup);

			var $descricao = $('<div />', {
				class: "descricao",
				html: "<span>" + this.opcoes().msgAddCarrinhoSucesso + "</span>"
			}).appendTo($popup);

			$('<button />', {
				class: 'cart',
				text: 'Ver sacola'
			}).appendTo($descricao);

			setTimeout(function(){ $('.popup-add-cart').fadeOut('slow') }, 10000);
		} else {
			this.elemento().find('.popup-add-cart').fadeIn('slow');
			setTimeout(function(){ $('.popup-add-cart').fadeOut('slow') }, 10000);
		}
		this.elemento().find('.erro-add-cart').fadeOut('slow');
	};
	this.erroAjax = function () {
		mensagemErro(_this.opcoes().msgAddCarrinhoErro);
	};
	/**
	 * Altera o texto do botão para produtos indisponiveis
	 * @param {boolean} habilitar
	 */
	this.habilitar = function (habilitar) {
		habilitar = (typeof habilitar == 'undefined') ? true : habilitar;
		this.elemento().toggleClass('desativado', !habilitar);
		var textBtn = (habilitar) ? this.opcoes().botaoCompra : this.opcoes().botaoSkuIndisponivel;
		this.elemento().find('.btn-compra').text(textBtn);
	};

	function mensagemErro(mensagemDeErro){

		if (_this.elemento().find('.erro-add-cart').length < 1) {
			var container = $('<div />', {
				class: 'erro-add-cart'
			}).appendTo(_this.elemento());
			// btn fechar
			$('<span />').attr({
				"class": 'close'
			}).click(function (event) {
				event.preventDefault();
				container.fadeOut('slow');
			}).appendTo(container);
			$('<div />', {
				"class": 'info',
				'html': mensagemDeErro
			}).appendTo(container);
		}
		else {
			_this.elemento().find('.erro-add-cart').fadeIn('slow');
		}
		setTimeout(500, function () {
			_this.elemento().find('.erro-add-cart').fadeOut('slow');
		}.bind(this));
		_this.elemento().find('.popup-add-cart').fadeOut('slow');
	}
};
// subclasse extende superclasse
ModuloBotaoDeCompra.prototype = Object.create(Modulo.prototype);
ModuloBotaoDeCompra.prototype.constructor = ModuloBotaoDeCompra;

exports.ModuloBotaoDeCompra = ModuloBotaoDeCompra;

import { Modulo } from "../Modulo";
import { CHANGE_QTD } from "../EventType";

export default class ModuloBtnQtd extends Modulo{
	constructor( elemento, componentStore){
		super( elemento, componentStore);
		this.elemento(".qtd-selector");
		this.store(componentStore);
		this._opcoes = {
			titulo: "Quantidade:",
			opcaoIndisponivel: "Indisponível",
			max: "1",
			min: "1",
			default: "1"
		};

		this._store.commit("setQtd", this._opcoes.default);
	}

	desenhar () {
		let _html =
		`<div class="valor-por">
			<strong class="value"></strong>
		</div>`;

		var divQtd = $("<div />", {
			class: "quantidade"
		});
		$("<span />", {
			class: "titulo",
			text: this.opcoes().titulo
		}).appendTo(divQtd);
		var campoQtd = $("<div />", {
			class: "campo-qtd"
		}).appendTo(divQtd);

		var buttonRemove = $("<button />", {
			class: "remove-from-cart",
			"aria-label": "Remover item"
		})
			.on("click", this.decrementBtn.bind(this))
			.text("-")
			.appendTo(campoQtd);
		var label = $("<label />", {
			class: "container-qtd"
		}).appendTo(campoQtd);

		var inputQtd = $("<input />", {
			class: "qtd-value",
			"aria-label": "Número de itens",
			type: "number",
			"data-min": this.opcoes().min,
			"data-max": this.opcoes().max,
			value: this._store.state.qtd
		}).appendTo(label);

		var buttonAdd = $("<button />", {
			class: "add-to-cart",
			"aria-label": "Adicionar item"
		})
			.on("click", this.incrementBtn.bind(this))
			.text("+")
			.appendTo(campoQtd);
		divQtd.appendTo(this.elemento());
		this.inputChange();
		return this;


		var valorPor = $(_html);

		this.elemento(valorPor);
		return valorPor;
	}

	atualizar(novoEstoque) {
		console.log('novoEstoque',novoEstoque)
		this.opcoes().max = novoEstoque;

		var $inputQuantidade = this.elemento().find(".qtd-value").trigger('change');

		if (novoEstoque > 0) {
			this.habilitar(true);
		}

		return this;
	}

	onChange(input) {
		var $inputQuantidade = input;
		//obtem os valores de quantidade selecionada e quantidade maxima
		var min = this.opcoes().min;
		var max = this.opcoes().max;
		var qtd = parseInt($inputQuantidade.val());

		if (qtd < min || isNaN(qtd)) {
			this.notificarValor("Minimo: " + min);
			qtd = min;
		} else if (qtd > max) {
			this.notificarValor("Maximo: " + max);
			qtd = max;
		}

		//atualiza todos os skus
		$(".quantidade .qtd-value").val(qtd);

		this._store.commit("setQtd", qtd);
		this._store.events.publish(CHANGE_QTD, qtd);
		return this;
	}

	inputChange() {
		this.elemento().find("input[class='qtd-value']").on("focusout", () => {
			this.onChange($(this)).bind(this);
		});
	}

	incrementBtn() {
		var button = this.elemento().find(".add-to-cart");
		var qtd = this.elemento()
			.find(".quantidade .container-qtd")
			.find(".qtd-value");
		if ($.isNumeric(qtd.val())) {
			var valueQtd = parseInt(qtd.val());
			valueQtd += 1;
			qtd.val(valueQtd);
		} else {
			qtd.val(1);
		}
		this.onChange.call(this, qtd);
	}

	decrementBtn() {
		var button = this.elemento().find(".remove-from-cart");
		var qtd = this.elemento()
			.find(".quantidade .container-qtd")
			.find(".qtd-value");
		if ($.isNumeric(qtd.val())) {
			var valueQtd = parseInt(qtd.val());
			if (valueQtd > 1) {
				valueQtd -= 1;
				qtd.val(valueQtd);
			}
		} else {
			qtd.val(1);
		}

		this.onChange.call(this, qtd);
	}

	notificarValor(msg) {
		var notificacao = $(".moduloQuantidade").find(".notificacao");
		if (!notificacao.length) {
			notificacao = $("<div />", {
				class: "notificacao"
			}).appendTo($(".moduloQuantidade").find(".container-qtd"));
		}
		notificacao
			.empty()
			.text(msg)
			.fadeIn("slow");
		var timer = setTimeout(
			function() {
				notificacao.fadeOut("slow");
			}.bind(this),
			4000
		);
		return this;
	}
}

import utils from "./utils";
import lojaConf from '../configuracaoLoja.json';

var prateleira = {
	'flagDeDesconto': function flagDeDesconto(elementos) {
		var $elementos = $(elementos);
		if ($elementos.length == 0) {
			$elementos = $('.produto-na-prateleira');
		}

		$elementos.not('.flagDeDesconto').each(function (index, el) {
			var percentualDeDesconto = calcularValorDeDesconto($(this));
			if (percentualDeDesconto >= lojaConf.percentualDeDecontoMinimoParaFlag) {
				createFlagDesconto($(this), percentualDeDesconto);
			}
			$(this).addClass('flagDeDesconto');
		});
	},
	precoParcelado: function () {
		$(".produto-na-prateleira").not('.calc').each(function (i, el) {
			var execucao = new window.Promise(function (resolve, reject) {

				try {
					let $price = $(el).find('.price'), nParcelas = lojaConf.price.numeroDeParcelas;
					let valorTotal = utils.getPrice($price.find('.principal .value').text());
					let valorParcelado = (valorTotal / nParcelas);

					//limpa o parcelamento atual
					$(el).find('.price .parcelado').remove();
					let htmlPrecoParcelado = criarHtmlPrecoParcelado(valorParcelado, nParcelas);
					$price.append(htmlPrecoParcelado);

					resolve();
				} catch (error) {
					reject();
				}
			});
			execucao.then(function () {
				$(el).addClass('calc');
			}).catch(function () {
				$(el).find('.price .parcelado').remove();
			});
		});
	},
	precoBoleto: function () {
		$(".produto-na-prateleira").not('.boleto').each(function (i, el) {
			var execucao = new window.Promise(function (resolve, reject) {

				try {
					let $price = $(el).find('.price'), percentualBoleto = lojaConf.price.percentualBoleto;
					let valorTotal = utils.getPrice($price.find('.principal .value').text());
					let valorBoleto = valorTotal - (valorTotal * percentualBoleto / 100);

					//limpa o parcelamento atual
					$(el).find('.price .boleto').remove();
					let htmlPrecoBoleto = criarHtmlPrecoBoleto(valorBoleto);
					$price.append(htmlPrecoBoleto);

					resolve();
				} catch (error) {
					reject();
				}
			});
			execucao.then(function () {
				$(el).addClass('boleto');
			}).catch(function () {
				$(el).find('.price .boleto').remove();
			});
		});
	},
	atualziar: function () {
		this.flagDeDesconto();
		this.precoParcelado();
		this.precoBoleto();
	}
};

function criarHtmlPrecoParcelado(valor, numeroDeParcelas) {
	var html, strValue = utils.getPrice(valor);
	html = '<div class="parcelado">';
	html += '<span class="desconto-parcelado"> ou ';
	html += '<strong>';
	html += '<span class="numero-de-parcelas" > ' + numeroDeParcelas + '</span>X de';
	html += '<span class="value"> R$ ' + strValue + '</span>';
	html += '</strong> no cartão';
	html += '</span>';
	html += '</div>';

	return html;
}

function criarHtmlPrecoBoleto(valor) {
	var html, strValue = utils.getPrice(valor);
	html = '<div class="boleto">';
	html += '<span class="value"> R$ ' + strValue + '</span>';
	html += '<span> &#224; vista no boleto</span>';
	html += '</div>';

	return html;
}

function calcularValorDeDesconto($produto) {
	let precoAntigo = utils.getPrice($produto.find('.antigo .value').text());
	let precoPromocao = utils.getPrice($produto.find('.principal .value').text());
	if (!precoAntigo || !precoPromocao)
		return null;

	var floatDesconto = (100 - ((precoPromocao / precoAntigo) * 100));
	return Math.ceil(floatDesconto);
}

function createFlagDesconto($elemento, percentualDeDesconto) {
	var $flag = $("<p />").addClass('flag produto-off').text(percentualDeDesconto + '%');
	$elemento.find('.flags-product .DiscountHightLight').append($flag);
}


module.exports = prateleira;

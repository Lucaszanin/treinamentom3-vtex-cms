
import "../lib/custom-newsletter-form";
import loja from '../configuracaoLoja.json';

var newletter ={
	init:function (elemento,textButtom){
		let $elemento = (typeof elemento !== "undefined")?$(elemento):$('.news-form');
		textButtom = (typeof textButtom !== "undefined")?textButtom:'Cadastre-se';

		$elemento.CustomNewsletter({
			'shop':loja.accontuName,
			'acronymEntity':loja.entityNewletter,
			'textButtom':textButtom
		});
	}
}

module.exports = newletter;

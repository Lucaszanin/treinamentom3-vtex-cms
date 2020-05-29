import "Lib/custom-newsletter-form";
import loja from "Config/loja";

export default class Newsletter {
	constructor({ elemento, textButtom }) {
		let $elemento =
			typeof elemento !== "undefined" ? $(elemento) : $(".news-form");
		textButtom =
			typeof textButtom !== "undefined" ? textButtom : "Cadastre-se";

		$elemento.CustomNewsletter({
			shop: loja.accontuName,
			acronymEntity: loja.entityNewsletter,
			textButtom: textButtom
		});
	}
}

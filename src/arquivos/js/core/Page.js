/**
 *  Classe para verificar se estamos em uma das paginas
 *  que são passadas por argumento
 */

class Page {
	constructor() {
		this.identificacaoMetaPage =
			$('meta[name="page"]').prop("content") || "";
		this.classTagBody = $("body").attr("class") || "";
		this.pageDataLayer =
			typeof dataLayer !== "undefined"
				? window.dataLayer[0].pageCategory
				: "";
	}

	/**
	 * * @param {array} [args] um ou um array de strings contendo a palavra chave para identificar a pagina
	 * @return {Boolean} retorna true se um dos argumentos estiver na meta/bodyClass/tag
	 */

	is() {
		for (const i in arguments) {
			if (
				this.identificacaoMetaPage.search(arguments[i]) >= 0 ||
				this.pageDataLayer === arguments[i] ||
				this.classTagBody.search(arguments[i]) >= 0
			)
				return true;
		}
		return false;
	}
}

export default Page;

export default class Institucional {
	constructor() {
		this.identifyPage();
	}

	identifyPage() {
		var pathName = window.location.pathname;

		if (pathName) {
			$('.navegacao a[href="' + pathName + '"]').addClass("ativo");
		}
	}
}

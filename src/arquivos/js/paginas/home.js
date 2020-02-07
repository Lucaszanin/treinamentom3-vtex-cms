import {
	bannerHome,
	barraDeVantagens,
	naveguePorCategorias
} from "../helpers/slide";

export default class Home {
	constructor() {
		bannerHome(".main-gallery");
		barraDeVantagens(".tipbar ul");
		naveguePorCategorias(".categorias-home .categorias");
	}

	naveguePorCategorias() {
		// preencher titulos
		var $container = $(".home-categories .categorias");
		$container.find(".box-banner").each(function(i, el) {
			const $banner = $(el);
			let name;

			name = $banner.find("img").prop("alt");
			let $titulo = $("<span />", {
				text: name,
				class: "nome-categoria"
			});
			$banner.find("img").after($titulo);
		});
		slide.naveguePorCategorias($container);
	}
}

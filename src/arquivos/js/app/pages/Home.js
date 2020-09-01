import {
	bannerHome,
	barraDeVantagens,
	naveguePorCategorias,
} from "App/functions/slide";

import InstagramGallery from "../components/InstagramGallery";

export default class Home {
	constructor() {
		bannerHome(".main-gallery");
		barraDeVantagens(".tipbar ul");
		naveguePorCategorias(".categorias-home .categorias");

		new InstagramGallery({
			gallery: ".instagramGallery__photos",
			account: "agenciam3",
			limit: 6,
		});
	}

	naveguePorCategorias() {
		// preencher titulos
		var $container = $(".home-categories .categorias");
		$container.find(".box-banner").each(function (i, el) {
			const $banner = $(el);
			let name;

			name = $banner.find("img").prop("alt");
			let $titulo = $("<span />", {
				text: name,
				class: "nome-categoria",
			});
			$banner.find("img").after($titulo);
		});
		slide.naveguePorCategorias($container);
	}
}

import "Lib/elevateZoom";

import loja from "Config/loja";
import { alterarTamanhoImagemSrcVtex } from "Helpers/vtexUtils";
import { isSmallerThen768 } from "Helpers/mediasMatch";
import { slideResponsivo } from "App/functions/slide";

export default class Produto {
	constructor() {
		this.imagensDasVariacoes();
		this.imagensCompreJunto();

		this.shortDescription();
		this.zoomImagemPrincipal();
		this.productSlides();
		this.exibirVariacaoDeCores();
		slideResponsivo(".prateleira-de-produtos", 4, 3, 1, 1, false, true);
	}

	/*
	 * 'itempropImage': Adiciona itemprop na imagem para melhorar os meta dados da página.
	 * 'Documentação':  https://schema.org/Product
	 */
	itempropImage() {
		$(".apresentacao #image #image-main").attr("itemprop", "image");
	}

	exibirVariacaoDeCores() {
		var urlSimilares =
			"/api/catalog_system/pub/products/crossselling/similars/" +
			window.skuJson.productId;

		var jqXHR = $.ajax({
			url: urlSimilares,
			type: "GET"
		});

		jqXHR.done(function sucesso(value) {
			if (value.length > 0) {
				var variacaoSku = $(".product-info .similares");
				var titulo = $("<div />", {
					class: "titulo",
					text: "Escolha a cor:"
				}).appendTo(variacaoSku);
				var ul = $("<ul />").appendTo(variacaoSku);

				var produtosJaExibidos = [];
				for (var i = 0; i < value.length; i++) {
					if (
						$.inArray(value[i].productId, produtosJaExibidos) == -1
					) {
						produtosJaExibidos.push(value[i].productId);
						var li = $("<li />");
						var link = $("<a />", {
							href: value[i].link,
							title: value[i].productName
						}).appendTo(li);
						var img = value[i].items[0].images[0].imageTag;
						img = img
							.replace(/#width#/gi, "90")
							.replace(/#height#/gi, "90");
						img = img.replace(
							"~",
							"//" + loja.accontuName + ".vteximg.com.br/"
						);
						$(img).appendTo(link);

						li.appendTo(ul);
					}
				}

				ul.slick({
					dots: true,
					arrows: false,
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 3,
					speed: 500,
					variableWidth: true
				});
			}
		});
	}

	shortDescription() {
		$(".descricao-produto a").on("click", function(event) {
			event.preventDefault();
			$("html,body").animate(
				{
					scrollTop:
						$("#descricao-completa")
							.eq(0)
							.offset().top - 50
				},
				500
			);
		});
	}

	zoomImagemPrincipal() {
		if (!isSmallerThen768) {
			$(".product-image .apresentacao #include").on(
				"mouseover",
				function() {
					var srcImg = $(".sku-rich-image-main").attr("src");

					$(".sku-rich-image-main").attr(
						"src",
						alterarTamanhoImagemSrcVtex(srcImg, 1000, 1000)
					);
					// ativa o zoom
					$(".sku-rich-image-main").elevateZoom({
						zoomType: "inner",
						cursor: "crosshair"
					});
				}
			);

			$("body").on("mouseleave", ".zoomContainer", function() {
				$(".sku-rich-image-main").removeData("elevateZoom");
				$(".zoomContainer").remove();
			});
		}
	}

	productSlides() {
		var $thumbs = $(".product-image .thumbs");
		// slide.produtopTumbs($thumbs);

		$(".similares ul").slick({
			dots: true,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			speed: 500,

			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}
			]
		});
	}

	imagensDasVariacoes() {
		if (typeof window.FireSkuSelectionChanged !== "undefined") {
			$(document).on("change-sku", function(event, data) {
				var idSku = data.sku;
				window.FireSkuSelectionChanged(idSku);
			});
		}
	}

	imagensCompreJunto() {
		window.onload = function() {
			setTimeout(function() {
				let images = $(".compre-junto table img");

				for (let i = 0; i < images.length; i++) {
					let imageUrl = $(images[i]).attr("src");
					let newUrl = alterarTamanhoImagemSrcVtex(
						imageUrl,
						250,
						250
					);
					$(images[i]).attr("src", newUrl);
				}
			}, 1500);
		};
	}
}

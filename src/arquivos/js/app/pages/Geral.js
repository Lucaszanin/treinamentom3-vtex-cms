import { isSmallerThen768 } from "Helpers/mediasMatch";
import prateleira from "App/functions/prateleira";

// @TODO: Ratorar essa classe, dividar em classes menores para cada funcionalidade
export default class Geral {
	constructor() {
		if (!isSmallerThen768) {
			this.fixedHeader();
		} else {
			this.bottomOptions();
		}
		this.scrollTop();
		this.correcaoAutocomplete();
		prateleira.atualziar();
	}

	scrollTop() {
		var offset = 200;
		var duration = 500;

		$(window).scroll(function() {
			if ($(this).scrollTop() > offset) {
				$(".scroll-to-top").fadeIn(duration);
			} else {
				$(".scroll-to-top").fadeOut(duration);
			}
		});

		$(".scroll-to-top").click(function(event) {
			event.preventDefault();
			$("html, body").animate(
				{
					scrollTop: 0
				},
				duration
			);
			return false;
		});
	}
	correcaoAutocomplete() {
		$(".fulltext-search-box").on("autocompleteopen", function(event, ui) {
			$(".ui-autocomplete.ui-menu").addClass("autocompleteopen");
		});
		$(".selector").on("autocompleteclose", function(event, ui) {
			$(".ui-autocomplete.ui-menu").removeClass("autocompleteopen");
		});
	}

	fixedHeader() {
		var lastScroll = 0;
		var timer, scrollTop, headerHeight;
		var element = $("header.header");

		$(document).scroll(function(e) {
			headerHeight = element.height();
			scrollTop = $(document).scrollTop();

			if (scrollTop > 1) {
				$("body").css("padding-top", headerHeight);
				element.addClass("fixed");

				if (timer) {
					window.clearTimeout(timer);
				}

				timer = window.setTimeout(function() {
					if (
						scrollTop > lastScroll &&
						scrollTop > element.height() + 20
					) {
						element.addClass("fixed-hide");
					} else {
						element.removeClass("fixed-hide");
					}

					lastScroll = $(document).scrollTop();
				}, 50);
			} else {
				element.removeClass("fixed");
				$("body").css("padding-top", 0);
			}
		});
	}

	bottomOptions() {
		var offset = 200;

		$(window).scroll(function() {
			if ($(this).scrollTop() > offset) {
				$(".mobile-bottom-options").addClass("active");
			} else {
				$(".mobile-bottom-options").removeClass("active");
			}
		});

		$(".mobile-bottom-options .show-search button").on("click", function() {
			$("html, body").animate(
				{
					scrollTop: 0
				},
				500
			);

			$(".busca-mobile .fulltext-search-box").focus();
		});
	}
}

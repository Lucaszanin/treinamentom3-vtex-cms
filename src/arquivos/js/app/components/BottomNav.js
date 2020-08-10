import { isSmallerThen768 } from "Helpers/MediasMatch";

export default class BottomNav {
	constructor() {
		if (isSmallerThen768) {
			this.bottomOptions();
		}
	}

	bottomOptions() {
		var offset = 200;

		$(window).scroll(function () {
			if ($(this).scrollTop() > offset) {
				$(".mobile-bottom-options").addClass("active");
			} else {
				$(".mobile-bottom-options").removeClass("active");
			}
		});

		$(".mobile-bottom-options .show-search button").on(
			"click",
			function () {
				$("html, body").animate(
					{
						scrollTop: 0,
					},
					500
				);

				$(".busca-mobile .fulltext-search-box").focus();
			}
		);
	}
}

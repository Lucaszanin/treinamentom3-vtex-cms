import { isSmallerThen768 } from "Helpers/MediasMatch";

export default class FixedHeader {
	constructor() {
		if (!isSmallerThen768) {
			this.fixedHeader();
		}
	}

	fixedHeader() {
		var lastScroll = 0;
		var timer, scrollTop, headerHeight;
		var element = $("header.header");

		$(document).scroll(function (e) {
			headerHeight = element.height();
			scrollTop = $(document).scrollTop();

			if (scrollTop > 1) {
				$("body").css("padding-top", headerHeight);
				element.addClass("fixed");

				if (timer) {
					window.clearTimeout(timer);
				}

				timer = window.setTimeout(function () {
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
}

import { isSmallerThen991 } from "Helpers/MediasMatch";

export default class FixedHeader {
	constructor() {
		if (!isSmallerThen991) {
			this.selectors();
			this.events();
		}
	}

	selectors() {
		this.pageHeader = $('.page-header');
	}

	events() {
		$(document).scroll(this.fixHeader.bind(this));
	}

	fixHeader() {
		const topScroll = $(document).scrollTop();

		if (topScroll > 200) {
			this.pageHeader.addClass("is-fixed");
		} else {
			this.pageHeader.removeClass("is-fixed");
		}
	}
}

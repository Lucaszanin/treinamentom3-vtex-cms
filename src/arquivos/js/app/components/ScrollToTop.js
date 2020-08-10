export default class ScrollToTop {
	constructor() {
		this.selectors();
		this.events();
	}

	selectors() {
		this.offset = 200;
		this.duration = 500;
		this.scrollTopEl = $(".scroll-to-top");
	}

	scrollToTop(event) {
		event.preventDefault();
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			this.duration
		);
		return false;
	}

	events() {
		this.scrollTopEl.click(this.scrollToTop.bind(this));
		$(window).scroll((e) => {
			if ($(window).scrollTop() > this.offset) {
				$(".scroll-to-top").fadeIn(this.duration);
			} else {
				$(".scroll-to-top").fadeOut(this.duration);
			}
		});
	}
}

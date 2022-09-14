import { isSmallerThen991 } from 'Helpers/MediasMatch'

export default class Menu {
	constructor() {
		this.selectors();
		this.events();
	}

	selectors() {
		this.openMenuButton = $(".menu__button");
		this.mainMenu = $(".main-menu");
		this.closeMenuButton = $(".menu-header__close-button");
		this.departmentLink = $(".main-menu__department-link");
		this.subMenuReturnButton = $('.submenu__return-button');
	}

	events() {
		this.openMenuButton.click(this.openMenu.bind(this));
		this.closeMenuButton.click(this.closeMenu.bind(this));
		this.departmentLink.click(this.openSubmenu)
		this.subMenuReturnButton.click(this.closeSubmenu)

		if (isSmallerThen991) {
			this.departmentLink.click(this.openSubmenu)
		}
	}

	openMenu() {
		this.mainMenu.addClass("is-open");
	}

	closeMenu() {
		this.mainMenu.removeClass("is-open");
	}

	openSubmenu(event) {
		event.preventDefault();

		const link = $(event.target);

		link.siblings(".submenu").addClass("is-open");
	}

	closeSubmenu(event) {
		const button = $(event.target);

		button.parents('.submenu').removeClass("is-open");
	}
}

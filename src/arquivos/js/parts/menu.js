import utils from "./utils";

var menu = {
	'toggleMenuMobile': function () {
		$('#open-menu-button, .show-menu .option').on('click', function(){
			$('.menu-principal').addClass('mobile-open');
			$('header.header').addClass('menu-mobile-open');
		});

		$('#close-menu-button').on('click', function(){
			$('.menu-principal').removeClass('mobile-open');
			$('header.header').removeClass('menu-mobile-open');
		});
	},
	'toggleSubCategories': function () {

		$('.m3-dropdown > button').on('click', function (event) {
			event.preventDefault();

			if ($(this).parent().hasClass('sub-menu-open')) {
				$(this).parent().removeClass('sub-menu-open');
			} else {
				$(this).parent().siblings().removeClass('sub-menu-open');
				$(this).parent().addClass('sub-menu-open');
			}

			$(this).parents('ul.itens').toggleClass('has-sub-menu-open');
		});

		$('.m3-dropdown .btn-voltar').on('click', function(){
			$(this).parents('.m3-dropdown').removeClass('sub-menu-open');
			$(this).parents('ul.itens').removeClass('has-sub-menu-open');
		});
	},
	'init': function() {
		this.toggleMenuMobile();
		this.toggleSubCategories();
	}
};

module.exports = menu;

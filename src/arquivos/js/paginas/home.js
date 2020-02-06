import utils from "../parts/utils";
import slide from "../parts/slide";



var paginaHome = {
	'naveguePorCategorias': function(){
		// preencher titulos
		var $container = $('.home-categories .categorias');
		$container.find('.box-banner').each(function(i,el){
			const $banner = $(el);
			let name;

			name = $banner.find('img').prop('alt');
			let $titulo =$('<span />',{
				text:name,
				class:'nome-categoria'
			});
			$banner.find('img').after($titulo);
		});
		slide.naveguePorCategorias($container);
	},
	'init': function init() {
		slide.bannerHome('.main-gallery');
		slide.barraDeVantagens('.tipbar ul');
		slide.naveguePorCategorias('.categorias-home .categorias');
	}
}


module.exports = paginaHome;

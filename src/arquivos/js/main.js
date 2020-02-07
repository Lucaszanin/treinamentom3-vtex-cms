import "slick-carousel";
import loja from "./config/loja";
import Container from "./core/Container";
import Erro from "./paginas/erro";
import Home from "./paginas/home";
import Categoria from "./paginas/categoria";
import Produto from "./paginas/produto";
import Institucional from "./paginas/institucional";

import Menu from "./parts/menu";
import Promocao from "./parts/Promocao";

const app = new Container({
	appName: loja.accontuName,
	components: [Menu, Promocao],
	pages: [
		{
			bodyClass: "home",
			components: [Home]
		},
		{
			bodyClass: "categoria",
			components: [Categoria]
		},
		{
			bodyClass: "produto",
			components: [Produto]
		},
		{
			bodyClass: "erro",
			components: [Erro]
		},
		{
			bodyClass: "institucional",
			components: [Institucional]
		}
	]
});

app.bind("Cart", cartConfig);

app.start();

// import menu from "./parts/menu";
// import geral from "./paginas/principal";
// import slider from "./parts/slide";
// import minicart from "./parts/minicart";
// import login from "./parts/login";
// import newletter from "./parts/newsletter";
// import prateleira from "./parts/prateleira";
// import componentesMenu from "./parts/componentesMenu";

// import paginaHome from "./paginas/home";
// import paginaDoProduto from "./paginas/produto";
// import paginaDeCategoria from "./paginas/categoria";
// import institucional from "./paginas/institucional";
// import erro from "./paginas/erro";
// import minhaConta from "./paginas/minha-conta";
// import meusPedidos from "./paginas/meus-pedidos";

// $(document).ready(function($) {
// 	geral.init();
// 	componentesMenu.init();
// 	minicart.init(".carrinho .mini-cart");
// 	login.init();
// 	newletter.init(".news-form", "Cadastre-se");
// 	prateleira.atualziar();

// 	if (utils.isPage("home")) {
// 		paginaHome.init();
// 	}
// 	if (utils.isPage("produto")) {
// 		paginaDoProduto.init();
// 		slider.slideResponsivo(
// 			".prateleira-de-produtos",
// 			4,
// 			3,
// 			1,
// 			1,
// 			false,
// 			true
// 		);
// 	}
// 	if (utils.isPage("departamento", "categoria", "resultado-busca")) {
// 		paginaDeCategoria.init();
// 	}
// 	if (utils.isPage("institucional")) {
// 		institucional.init();
// 		slider.navegacaoInstitucional();
// 	}
// 	if (utils.isPage("page-erro")) {
// 		erro.init();
// 	}
// 	if (utils.isPage("minhaConta")) {
// 		minhaConta.init();
// 	}
// 	if (utils.isPage("meusPedidos")) {
// 		meusPedidos.init();
// 	}
// });

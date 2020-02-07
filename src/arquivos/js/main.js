import "slick-carousel";
import loja from "./config/loja";
import Container from "./core/Container";
import Erro from "./paginas/erro";
import Home from "./paginas/home";
import Categoria from "./paginas/categoria";
import Produto from "./paginas/produto";
import Institucional from "./paginas/institucional";
import Geral from "./paginas/Geral";

import Menu from "./parts/menu";
import Promocao from "./parts/Promocao";
import Minicart from "./parts/minicart";
import MenuContents from "./parts/MenuContents";
import Newsletter from "./parts/Newsletter";
import Login from "./parts/Login";


const app = new Container({
	appName: "template",
	components: [Menu, Promocao, Minicart, MenuContents, Login, Newsletter, Geral],
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

app.bind(Minicart.name, ".carrinho .mini-cart");
app.bind(Newsletter.name, {
	elemento: ".news-form",
	textButtom: "Cadastre-se"
});

app.start();




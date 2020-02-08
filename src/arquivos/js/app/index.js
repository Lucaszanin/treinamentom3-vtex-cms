import Container from "./core/Container";
import Erro from "./pages/erro";
import Home from "./pages/home";
import Categoria from "./pages/categoria";
import Produto from "./pages/produto";
import Institucional from "./pages/institucional";
import Geral from "./pages/Geral";

import Newsletter from "./components/Newsletter";
import Minicart from "./components/minicart";

import Menu from "./partials/menu";
import Promocao from "./partials/Promocao";
import MenuContents from "./partials/MenuContents";
import Login from "./partials/Login";

const app = new Container({
	appName: "template",
	components: [
		Menu,
		Promocao,
		Minicart,
		MenuContents,
		Login,
		Newsletter,
		Geral
	],
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

export default app;

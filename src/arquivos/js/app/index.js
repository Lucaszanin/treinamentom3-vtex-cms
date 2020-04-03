import Container from "../core/Container";
import Erro from "./pages/Erro";
import Home from "./pages/Home";
import Categoria from "./pages/Categoria";
import Produto from "./pages/Produto";
import Institucional from "./pages/Institucional";
import Geral from "./pages/Geral";

import Newsletter from "./components/Newsletter";
import Minicart from "./components/Minicart";

import Menu from "./partials/Menu";
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

import config from "Config/index";

import { Container, IsPage } from "@agenciam3/pkg";
import Erro from "./pages/Erro";
import Home from "./pages/Home";
import Categoria from "./pages/Categoria";
import Produto from "./pages/Produto";
import Institucional from "./pages/Institucional";

import Newsletter from "./components/Newsletter";
import Minicart from "./components/Minicart";
import BottomNav from "./components/BottomNav";
import FixedHeader from "./components/FixedHeader";
import AutoComplete from "./components/AutoComplete";
import ScrollToTop from "./components/ScrollToTop";

import Menu from "./partials/Menu";
import Promocao from "./partials/Promocao";
import MenuContents from "./partials/MenuContents";
import Login from "./partials/Login";
import Prateleira from "./components/Prateleira/Prateleira";

import PrateleiraService from "./components/Prateleira/PrateleiraService";

const app = new Container({
	appName: "template",
	config,
	components: [
		Menu,
		Promocao,
		Minicart,
		MenuContents,
		Login,
		Newsletter,
		BottomNav,
		FixedHeader,
		ScrollToTop,
		AutoComplete,
		Prateleira,
	],
	services: [PrateleiraService],
	pages: [
		{
			pageRef: ["home"],
			components: [Home],
		},
		{
			pageRef: ["categoria"],
			components: [Categoria],
		},
		{
			pageRef: ["produto"],
			components: [Produto],
		},
		{
			pageRef: ["erro"],
			components: [Erro],
		},
		{
			pageRef: ["institucional"],
			components: [Institucional],
		},
	],

	ruler: new IsPage(),
});

app.bind(Minicart.name, ".carrinho .mini-cart");
app.bind(Newsletter.name, {
	elemento: ".news-form",
	textButtom: "Cadastre-se",
});

export default app;

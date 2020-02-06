const {  ModuloPrecoBoleto, ModuloPrecoDe, ModuloPrecoParcelado, ModuloPrecoPor } = require("./SubModulos/ModulosTiposDePreco");

const { ModuloBtnQtd } = require("./SubModulos/ModuloBtnQtd");

const { ModuloSelect } = require("./SubModulos/ModuloSelect");

const { ModuloSkusPorNome } = require("./SubModulos/ModuloSkusPorNome");

const { ModuloSkusPorEspecificacoes } = require("./SubModulos/ModuloSkusPorEspecificacoes");

const { ModuloQuantidade } = require("./ModuloQuantidade");

const { ModuloPreco } = require("./ModuloPreco");

const { ModuloCompreJunto } = require("./ModuloCompreJunto");

const { ModuloBotaoDeCompra } = require("./ModuloBotaoDeCompra");

const { ModuloAviseMe } = require("./ModuloAviseMe");


var modulosDeProduto = {
	"ModuloAviseMe": ModuloAviseMe,
	"ModuloBotaoDeCompra": ModuloBotaoDeCompra,
	"ModuloCompreJunto": ModuloCompreJunto,
	"ModuloPreco": ModuloPreco,
	"ModuloQuantidade": ModuloQuantidade,
	"ModuloSkusPorNome": ModuloSkusPorNome,
	"ModuloSkusPorEspecificacoes": ModuloSkusPorEspecificacoes,
	"ModuloBtnQtd": ModuloBtnQtd,
	"ModuloPrecoBoleto": ModuloPrecoBoleto,
	"ModuloPrecoDe": ModuloPrecoDe,
	"ModuloPrecoParcelado": ModuloPrecoParcelado,
	"ModuloPrecoPor": ModuloPrecoPor,
	"ModuloSelect": ModuloSelect
};


module.exports = modulosDeProduto;

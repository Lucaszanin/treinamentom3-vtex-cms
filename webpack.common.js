const webpack = require('webpack');
var shopName = require('./package.json').shopName;
/**
 * Configuração do webpack
 * @tutorial https://github.com/webpack/webpack.js.org/tree/v3.11.0/src/content
 * @tutorial https://medium.com/netscape/webpack-3-react-production-build-tips-d20507dba99a
 */
module.exports = {
	entry:{
		main:['./src/arquivos/js/main.js'],
		checkout:['./src/arquivos/js/checkout.js']
	},
	output: {
		filename: shopName + '--bundle--[name].js',
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: [
					['latest', {
						modules: false
					}]
				]
			}
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$':'jquery',
			'jQuery':'jquery',
		})
	]
};

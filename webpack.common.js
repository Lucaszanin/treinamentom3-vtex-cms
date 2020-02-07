const webpack = require("webpack");
const path = require("path");
var shopName = require("./package.json").shopName;
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
/**
 * Configuração do webpack
 * @tutorial https://github.com/webpack/webpack.js.org/tree/v3.11.0/src/content
 * @tutorial https://medium.com/netscape/webpack-3-react-production-build-tips-d20507dba99a
 */
module.exports = {
	entry: {
		main: "./src/arquivos/js/main.js",
		checkout: "./src/arquivos/js/checkout.js"
	},
	output: {
		path: path.resolve(__dirname, "dist/arquivos"),
		filename: shopName + "--[name]-bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/react"]
					}
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	resolve: {
		plugins: [PnpWebpackPlugin]
	},
	resolveLoader: {
		plugins: [PnpWebpackPlugin.moduleLoader(module)]
	}
};

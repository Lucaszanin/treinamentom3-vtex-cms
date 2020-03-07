const webpack = require("webpack");
const path = require("path");
var shopName = require("./package.json").shopName;
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
						presets: ["@babel/preset-env", "@babel/react"],
						plugins: ["@babel/plugin-transform-async-to-generator"]
					}
				}
			}
		]
	},
	resolve: {
		alias: {
			Helpers: path.resolve(__dirname, "src/arquivos/js/helpers"),
			Lib: path.resolve(__dirname, "src/arquivos/js/lib"),
			Config: path.resolve(__dirname, "src/arquivos/js/config"),
			App: path.resolve(__dirname, "src/arquivos/js/app")
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
};

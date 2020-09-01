const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
	externals: {
		jquery: "jQuery",
		vtexjs: "vtexjs",
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				include: path.resolve(__dirname, "..", "src/arquivos/js"),
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env"], "@babel/react"],
						plugins: ["@babel/plugin-transform-async-to-generator"],
						cacheDirectory: true,
					},
				},
			},
		],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: true,
				terserOptions: {
					keep_classnames: true,
					compress: {
						pure_funcs: [
							"console.info",
							"console.debug",
							"console.warn",
							"console.log",
						],
					},
				},
			}),
		],
	},
	plugins: [new webpack.HashedModuleIdsPlugin()],
});

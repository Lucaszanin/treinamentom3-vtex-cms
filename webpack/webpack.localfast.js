const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	devtool: "inline-source-map",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "@sucrase/webpack-loader",
					options: {
						transforms: ["jsx"],
					},
				},
			},
		],
	},
});

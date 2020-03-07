const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
	externals: {
		jquery: "jQuery",
		vtexjs: "vtexjs"
	},
	mode: "production",
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
							"console.log"
						]
					}
				}
			})
		]
	},
	plugins: [new webpack.HashedModuleIdsPlugin()]
});

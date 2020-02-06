const gulp = require("gulp"),
	gulpif = require("gulp-if"),
	del = require("del"),
	connect = require("gulp-connect"),
	sourcemaps = require("gulp-sourcemaps"),
	autoprefixer = require("gulp-autoprefixer"),
	sass = require("gulp-sass"),
	imagemin = require("gulp-imagemin"),
	rename = require("gulp-rename"),
	replace = require("gulp-replace"),
	htmlReplace = require("gulp-html-replace"),
	spritesmith = require("gulp.spritesmith"),
	iconfont = require("gulp-iconfont"),
	iconfontCss = require("gulp-iconfont-css"),
	apiMocker = require("connect-api-mocker"),
	imageResize = require("gulp-image-resize"),
	spritesmash = require("gulp-spritesmash"),
	buffer = require("gulp-buffer"),
	crypto = require("crypto");

const VtexEmulation = require("./dev/VtexEmulation.js");
const webpack = require("webpack");
const pacote = require("./package.json");

const fontName = pacote.shopName + "-icones";

const isProduction = process.env.NODE_ENV === "production";

const paths = {
	styles: {
		src: "src/arquivos/sass/*.{scss,css,sass}",
		lib: "src/arquivos/sass/lib",
		watch: "src/arquivos/sass/**/*.scss"
	},
	fonts: {
		src: "src/arquivos/font/**/*",
		lib: "src/arquivos/font/"
	},
	svgFont: {
		src: "src/arquivos/icones/*.svg"
	},
	scripts: {
		watch: "src/arquivos/js/**/*.js"
	},
	sprites: {
		dir: "src/arquivos/sprite/"
	},
	img: {
		src: "src/arquivos/img/*.{png,gif,jpg}",
		watch: "src/arquivos/img/**/*.{png,gif,jpg}"
	},
	html: {
		watch: "src/**/*.html",
		template: "src/template-pagina/",
		subTemplate: "src/template-pagina/sub-templates/",
		controlesVtex: "dev/controles-vtex/",
		controlesCustomizados: "src/controles-customizados/",
		prateleiras: "src/template-prateleira/"
	},
	output: "dist",
	outputStatic: "dist/arquivos"
};

function clean() {
	return del([paths.output]);
}

function styles() {
	return gulp
		.src(paths.styles.src)
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(
			sass({
				outputStyle: "compressed",
				includePaths: ["./node_modules"]
			}).on("error", sass.logError)
		)
		.pipe(
			autoprefixer({
				cascade: false
			})
		)
		.pipe(
			rename({
				prefix: pacote.shopName + "--",
				extname: ".css"
			})
		)
		.pipe(gulpif(!isProduction, sourcemaps.write()))
		.pipe(gulp.dest(paths.outputStatic))
		.pipe(connect.reload());
}

function scripts() {
	let webpackConfig = require("./webpack.dev.js");

	if (process.env.NODE_ENV === "production") {
		webpackConfig = require("./webpack.prod.js");
	} else if (process.env.NODE_ENV === "local") {
		webpackConfig = require("./webpack.local.js");
	}

	return new Promise(resolve =>
		webpack(webpackConfig, (err, stats) => {
			if (err) console.log("Webpack", err);

			console.log(
				stats.toString({
					all: false,
					modules: true,
					maxModules: 0,
					errors: true,
					warnings: true,
					// our additional options
					moduleTrace: true,
					errorDetails: true,
					colors: true,
					chunks: true
				})
			);

			resolve();
			connect.reload();
		})
	);
}

// function resizeSprites() {
// 	return gulp
// 		.src(paths.sprites.dir + "2x/*.{png,jpg}")
// 		.pipe(imageResize({ width: "50%", height: "50%" }))
// 		.pipe(gulp.dest(paths.sprites.dir + "1x"));
// }

// @TODO: implementar retina
function sprites() {
	return gulp
		.src(paths.sprites.dir + "**/*.{png,jpg}")
		.pipe(
			spritesmith({
				// retinaSrcFilter: paths.sprites.dir + "*@2x.{png,jpg}",
				imgName: pacote.shopName + "--sprite.png",
				// retinaImgName: pacote.shopName + "--sprite@2x.png",
				cssName: "_sprite.scss",
				cssVarMap: function(sprite) {
					sprite.name = "sprite_" + sprite.name;
				},
				padding: 25,
				imgPath: "/arquivos/" + pacote.shopName + "--sprite.png"
			})
		)
		.pipe(spritesmash())
		.pipe(
			gulpif(
				"*.png",
				gulp.dest(paths.outputStatic),
				gulp.dest(paths.styles.lib)
			)
		);
}

// const sprites = gulp.series([resizeSprites, buildSprites]);

function fonticons() {
	return gulp
		.src([paths.svgFont.src])
		.pipe(
			iconfontCss({
				fontName: fontName,
				// path:'icones.scss',
				targetPath: "icones.scss",
				fontPath: "/arquivos/",
				cssClass: "icone",
				suffix: ".css"
			})
		)
		.pipe(
			iconfont({
				fontName: fontName,
				prependUnicode: true,
				formats: ["svg", "ttf", "eot", "woff", "woff2"],
				normalize: true,
				fontHeight: 1024,
				timestamp: Math.round(Date.now() / 1000)
			})
		)
		.pipe(
			gulpif(
				"!*.{css,scss,sass}",
				rename(function(path) {
					path.extname += ".css";
				})
			)
		)
		.pipe(gulp.dest(paths.fonts.lib + fontName));
}

function fonts() {
	gulp.series(fonticons);
	gulp.src(paths.fonts.src).pipe(gulp.dest(paths.outputStatic));
	return gulp
		.src(`src/arquivos/font/${fontName}/*`)
		.pipe(gulp.dest(paths.outputStatic));
}

const icones = gulp.series(sprites, fonticons);

function img() {
	return gulp
		.src(paths.img.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.outputStatic));
}

function html() {
	// config folders
	VtexEmulation.folders({
		template: paths.html.template,
		subTemplate: paths.html.subTemplate,
		controlesVtex: paths.html.controlesVtex,
		controleCustomizado: paths.html.controlesCustomizados,
		prateleira: paths.html.prateleiras
	});

	VtexEmulation.loadSubTemplates();
	VtexEmulation.loadPrateleira();
	VtexEmulation.loadControles();

	return gulp
		.src(VtexEmulation.folders().template + "*.html")
		.pipe(
			replace(
				VtexEmulation.regex().subtemplate,
				VtexEmulation.subtemplate
			)
		)
		.pipe(replace(VtexEmulation.regex().controle, VtexEmulation.controle))
		.pipe(
			replace(
				VtexEmulation.regex().placeholder,
				VtexEmulation.placeHolder
			)
		)
		.pipe(
			htmlReplace({
				js: [
					"/arquivos/plugins-shop.min.js",
					"/arquivos/scripts-shop.min.js"
				],
				css: [
					"/arquivos/bootstrap-grid.css",
					"/arquivos/style-shop.css"
				],
				keepUnassigned: false,
				keepBlockTags: false
			})
		)
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
}

function watch() {
	devServer();
	gulp.watch(paths.svgFont.src, { ignoreInitial: false }, icones);
	gulp.watch(
		paths.sprites.src + "**/*.{png,jpg}",
		{ ignoreInitial: false },
		icones
	);
	gulp.watch(paths.scripts.watch, { ignoreInitial: false }, scripts);
	gulp.watch(paths.styles.watch, { ignoreInitial: false }, styles);
	gulp.watch(paths.img.watch, { ignoreInitial: false }, img);
	gulp.watch(paths.html.watch, { ignoreInitial: false }, html);
}

function devServer() {
	connect.server({
		root: paths.output,
		livereload: true,
		port: 3000,
		middleware: function(_connect, options) {
			console.log(_connect);
			var middlewares = [];

			// Api get user profile
			middlewares.push(
				apiMocker(
					"/no-cache/profileSystem/getProfile",
					"dev/api/usuario/"
				)
			);

			//api masterData
			middlewares.push(
				apiMocker(
					"/" + pacote.shopName + "/dataentities/",
					"dev/api/masterdata"
				)
			);

			//api masterData
			middlewares.push(
				apiMocker(
					"/api/catalog_system/pub/products/search/",
					"dev/api/produtos/"
				)
			);

			return middlewares;
		}
	});
}

const build = gulp.series(
	clean,
	gulp.parallel(html, icones, scripts, styles, img, fonts)
);

exports.build = build;
exports.clean = clean;
exports.scripts = scripts;
exports.styles = styles;
exports.img = img;
exports.html = html;
exports.icones = icones;
exports.fonticons = fonticons;
exports.devServer = devServer;
exports.watch = gulp.series(build, watch);
exports.fonts = fonts;
exports.sprites = sprites;

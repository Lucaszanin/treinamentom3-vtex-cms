const gulp = require("gulp"),
	gulpif = require('gulp-if'),
	clean = require("gulp-clean"),
	connect = require("gulp-connect"),
	sourcemaps = require("gulp-sourcemaps"),
	autoprefixer = require("gulp-autoprefixer"),
	sass = require("gulp-sass"),
	imagemin = require("gulp-imagemin"),
	rename = require("gulp-rename"),
	replace = require("gulp-replace"),
	htmlReplace = require('gulp-html-replace'),
	sprity = require('sprity'),
	apiMocker = require('connect-api-mocker');


const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const pacote = require('./package.json');



gulp.task("clean", function () {
	return gulp.src("dist")
		.pipe(clean());
});


gulp.task("styles", function () {
	let isProduction = process.env.NODE_ENV === 'production';

	gulp.src("src/arquivos/sass/*.{scss,css,sass}")
		.pipe(gulpif(!isProduction,sourcemaps.init()))
		.pipe(sass({
			outputStyle: "compressed"
		}).on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 30 versions"],
			cascade: false
		}))
		.pipe(rename({
			prefix:  pacote.shopName + "--",
			extname: ".css"
		}))
		.pipe(gulpif(!isProduction,sourcemaps.write(".")))
		.pipe(gulp.dest("dist/arquivos"))
		.pipe(rename({ prefix:  "homologacao--" }))
		.pipe(gulp.dest('dist/arquivos-homologacao/'))
		.pipe(connect.reload());
});


gulp.task('scripts', () => {
	let webpackConfig = require('./webpack.dev.js');

	if(process.env.NODE_ENV === 'production'){
		webpackConfig = require('./webpack.prod.js');
	}

	gulp.src('src/arquivos/js/main.js')
		.pipe(webpackStream(webpackConfig), webpack)
		.on("error", function handleError() {
			this.emit("end");
		})
		.pipe(gulp.dest('./dist/arquivos'))
		.pipe(rename({ prefix:  "homologacao--" }))
		.pipe(gulp.dest('dist/arquivos-homologacao/'))
		.pipe(connect.reload());
});



gulp.task('icones', function () {
	return sprity.src({
		engine : 'sprity-jimp',
		src: 'src/arquivos/sprite/**/*.{png,jpg}',
		style: './_sprite.scss',
		margin: 5,
		prefix: 'sprite',
		processor: 'css', // make sure you have installed sprity-sass
		cssPath: '/arquivos/',
		name : pacote.shopName + "--sprite",
		'dimension': [
			{ ratio: 1, dpi: 72 },
			{ ratio: 2, dpi: 192 }
		],
		"cachebuster": true
	})
		.pipe(gulpif('*.png', gulp.dest('dist/arquivos/'),
			gulp.dest('src/arquivos/sass/lib')
		))
		.pipe(gulpif('*.png', gulp.dest('dist/arquivos-homologacao/')));
});

gulp.task("img", function () {
	return gulp.src('src/arquivos/imagens/*.{png,gif,jpg}')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/arquivos/'))
		.pipe(rename({ prefix:  "homologacao--" }))
		.pipe(gulp.dest('dist/arquivos-homologacao/'))
		.pipe(connect.reload());
});


//local
var VtexEmulation = require('./dev/VtexEmulation.js');
// config folders
VtexEmulation.folders({
	'template': 'src/template-pagina/',
	'subTemplate': 'src/template-pagina/sub-templates/',
	'controlesVtex': 'dev/controles-vtex/',
	"controleCustomizado": 'src/controles-customizados/',
	'prateleira': 'src/template-prateleira/'
});

gulp.task('html', function () {

	VtexEmulation.loadSubTemplates();
	VtexEmulation.loadPrateleira();
	VtexEmulation.loadControles();

	gulp.src(VtexEmulation.folders().template + '*.html')
		.pipe(replace(VtexEmulation.regex().subtemplate, VtexEmulation.subtemplate))
		.pipe(replace(VtexEmulation.regex().controle, VtexEmulation.controle))
		.pipe(replace(VtexEmulation.regex().placeholder, VtexEmulation.placeHolder))
		.pipe(htmlReplace({
			js: ['/arquivos/plugins-shop.min.js', '/arquivos/scripts-shop.min.js'],
			css: ['/arquivos/bootstrap-grid.css', '/arquivos/style-shop.css'],
			keepUnassigned: false,
			keepBlockTags: false
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());

});


gulp.task('connect',  function () {
	connect.server({
		root: 'dist',
		livereload: true,
		port: 3000,
		middleware: function(_connect, options) {
			console.log(_connect);
			var middlewares = [];

			// Api get user profile
			middlewares.push(apiMocker(
				'/no-cache/profileSystem/getProfile',
				'dev/api/usuario/'
			));

			//api masterData
			middlewares.push(apiMocker(
				'/'+ pacote.shopName +'/dataentities/' ,
				'dev/api/masterdata'
			));



			//api masterData
			middlewares.push(apiMocker(
				'/api/catalog_system/pub/products/search/' ,
				'dev/api/produtos/'
			));

			return middlewares;
		}
	});
});


gulp.task('watch', ['connect','build'], function () {
	gulp.watch('src/arquivos/sprite/**/*.{png,gif,jpg}', ['icones']);
	gulp.watch('src/arquivos/js/**/*.js', ['scripts']);
	gulp.watch('src/arquivos/sass/**/*.scss', ['styles']);
	gulp.watch('src/arquivos/img/**/*.{png,gif,jpg}', ['img']);
	gulp.watch('src/**/*.html', ['html']);
});


gulp.task('build', ['clean'], function () {
	gulp.start(['html','icones','scripts', 'styles', 'img']);
});

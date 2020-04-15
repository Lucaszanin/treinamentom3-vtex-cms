import "regenerator-runtime/runtime.js";
import "lazysizes";
import "lazysizes/plugins/noscript/ls.noscript";
import "slick-carousel";
import app from "./app";

window.lazySizesConfig = {
	addClasses: true,
};

app.start();

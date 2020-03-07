import "lazysizes";
import "lazysizes/plugins/noscript/ls.noscript";
import "slick-carousel";
import app from "./app";

if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
	document.write(
		'<script src="https://cdn.jsdelivr.net/npm/url-polyfill@1.1.8/url-polyfill.min.js"></script>'
	);
}

window.lazySizesConfig = {
	addClasses: true
};

app.start();

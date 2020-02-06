/**
 * Altera as dimenções especificadas na url da img
 * @param {string} src url da imagem na VTEX
 * @param {int} width
 * @param {int} height
 * @return {string} url da imagem com o tamanho alterado
 */
var alterarTamanhoImagemSrcVtex = function (src, width, height){
	if( typeof src == "undefined" ) {
		console.warn( "Parametro 'src' não recebido.");
		return;
	}
	width = (typeof width == "undefined" )? 1 : width;
	height = (typeof height == "undefined" )? width:height;

	src = src.replace( /\/(\d+)(-(\d+-\d+)|(_\d+))\//g, '/$1-' + width + '-' + height + '/' );
	return  src;
}

$(document).ajaxStop(function () {
	try{
		var cartImages = $('img[id^="product-image"]');

		for (const i in cartImages) {
			if (cartImages.hasOwnProperty(i)) {
				var imageUrl = $(cartImages[i]).attr('src');

				if(imageUrl){
					var newUrl = alterarTamanhoImagemSrcVtex(imageUrl, 100, 100);
					$(cartImages[i]).attr('src', newUrl);
				}
			}
		}
	}catch(e){
		console.warn('Erro ao alterar resolução das imagens de produto. ' + e);
	}
});

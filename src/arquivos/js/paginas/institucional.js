var institucional = {
	'identifyPage': function(){
		var pathName = window.location.pathname;

		if(pathName){
			$('.navegacao a[href="'+pathName+'"]').addClass('ativo');
		}
	},
	'init': function(){
		this.identifyPage();
	}
};

module.exports = institucional;

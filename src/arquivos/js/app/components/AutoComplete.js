export default class AutoComplete {
	constructor() {
		this.correcaoAutocomplete();
	}
	correcaoAutocomplete() {
		$(".fulltext-search-box").on("autocompleteopen", function (event, ui) {
			$(".ui-autocomplete.ui-menu").addClass("autocompleteopen");
		});
		$(".selector").on("autocompleteclose", function (event, ui) {
			$(".ui-autocomplete.ui-menu").removeClass("autocompleteopen");
		});
	}
}

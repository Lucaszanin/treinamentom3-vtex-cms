import "Lib/smartResearch";
import prateleira from "App/functions/prateleira";
import { isSmallerThen768 } from "Helpers/mediasMatch";

/*
 * paginaDeCategoria
 * Página 'utilizadas': categoria, derpartamento e resultado de resultado-busca.
 */
export default class Categoria {
	constructor() {
		this.reposicionarSelectDeOrdenacao();

		if (isSmallerThen768) {
			this.toggleFiltersMobile();
			this.filterMobileExtraInfo();
		}
		this.smartResearch();
	}

	toggleFiltersMobile() {
		$("#open-filter-button").on("click", function () {
			$(".filtros-categoria").addClass("mobile-open");
		});

		$("#close-filter-button, .aply-filter-btn").on("click", function () {
			$(".filtros-categoria").removeClass("mobile-open");
		});
	}

	filterMobileExtraInfo() {
		var atualizarContagemDeFiltrosAtivos = function () {
			var opcoesFiltro = $(
				".search-multiple-navigator .multi-search-checkbox"
			);
			var qtd = 0;

			for (var i in opcoesFiltro) {
				var opcao = opcoesFiltro[i];
				if (opcao.checked) {
					qtd++;
				}
			}

			var button = $("#open-filter-button");

			if (qtd > 0) {
				button.find("span").remove();
				$("<span/>", { text: "(" + qtd + ")" }).appendTo(button);

				$(".topo-resultado .clear-filter-btn").addClass("active");
			} else {
				button.find("span").remove();
				$(".topo-resultado .clear-filter-btn").removeClass("active");
			}
		};

		//Para browsers que mantém os checkboxes selecionados ao atualizar a página
		atualizarContagemDeFiltrosAtivos();

		$(".aply-filter-btn").on("click", function () {
			atualizarContagemDeFiltrosAtivos();
		});

		$(".topo-resultado .clear-filter-btn").on("click", function () {
			$("#open-filter-button")
				.find("span")
				.remove();

			$(".multi-search-checkbox").each(function () {
				if ($(this).is(":checked")) {
					$(this)
						.attr("checked", false)
						.trigger("change");
				}
			});

			$(this).removeClass("active");
		});
	}

	reposicionarSelectDeOrdenacao() {
		$(".orderBy")
			.eq(0)
			.appendTo(".topo-resultado .opcoes-resultado");
	}

	createCategoryFilter() {
		let departmentFilter = $("<fieldset />", {
			"class": "refino links-departamento"
		});
		let list = $("<div />");
		let navSingle = $(".search-single-navigator");
		let subcategories = navSingle.find("h4,h3,h5");

		subcategories.each(function (i, li) {
			let item = $("<label />", {
				class: "item"
			});

			if ($(li).find("a").length > 0) {
				let link = $(li).find("a");
				link.text(link.attr("title"));
				item.html(link);
				item.appendTo(list);
			}
		});

		$("<h5 />", {
			text: "Categoria"
		}).appendTo(departmentFilter);

		list.appendTo(departmentFilter);

		return departmentFilter;
	}

	smartResearch() {
		if (isSmallerThen768) {
			$(".navigation-tabs input[type='checkbox']").vtexSmartResearch({
				menuDepartament: ".menu-departamento",
				loadContent: ".produtos-da-categoria [id^=ResultItems]",
				shelfClass: "[class$=colunas]",
				mergeMenu: false,
				authorizeScroll: function () {
					return false;
				},
				authorizeUpdate: function () {
					return true;
				},
				emptySearchMsg:
					"<h3>Não encontramos nenhum resultado para seu filtro!</h3>",
				clearButtonClass: ".clear-filter-btn",
				infinitScroll: false,
				loadMoreText: "Ver mais",
				filterOnChange: false,
				filterButtonClass: ".aply-filter-btn",
				callback: () => {
					try {
						var navMultiple = $(".search-multiple-navigator");
						var categoryFilter = this.createCategoryFilter();
						categoryFilter.insertBefore(navMultiple.find("fieldset:first"));
					} catch (error) {
						console.log(error);
					}
				}
			});
		} else {
			$(".navigation-tabs input[type='checkbox']").vtexSmartResearch({
				menuDepartament: ".menu-departamento",
				loadContent: ".produtos-da-categoria [id^=ResultItems]",
				shelfClass: "[class$=colunas]",
				mergeMenu: false,
				authorizeScroll: function () {
					return false;
				},
				authorizeUpdate: function () {
					return true;
				},
				emptySearchMsg:
					"<h3>Não encontramos nenhum resultado para seu filtro!</h3>",
				clearButtonClass: ".clear-filter-btn",
				infinitScroll: false,
				loadMoreText: "Ver mais",
				callback: () => {
					try {
						var navMultiple = $(".search-multiple-navigator");
						var categoryFilter = this.createCategoryFilter();
						categoryFilter.insertBefore(navMultiple.find("fieldset:first"));
					} catch (error) {
						console.log(error);
					}
				}
			});
		}

		$(document).on(
			"vsr-request-end",
			prateleira.atualziar.bind(prateleira)
		);
		$(window).on(
			"finished-upadte-filter",
			prateleira.atualziar.bind(prateleira)
		);
		// desabilita o scroll automático
		history.scrollRestoration = "manual";
	}
}

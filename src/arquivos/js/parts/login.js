export default class Login {
	constructor() {
		this.linkUSerHEader();
		this.linkUserMenuMobile();
		this.getUSerData();
	}

	identificacaoDoUsuario(user) {
		var identificacao = user.Email;
		if (user.FirstName !== null) {
			identificacao = user.FirstName;
			if (user.LastName !== null) {
				identificacao += " " + user.LastName;
			}
		}
		return identificacao;
	}

	urlLogin() {
		return (
			"/login?ReturnUrl=" + encodeURIComponent(window.location.pathname)
		);
	}

	urlLogout() {
		return (
			"/no-cache/user/logout?ReturnUrl=" +
			encodeURIComponent(window.location.pathname)
		);
	}

	linkUSerHEader() {
		$(document).on("vtex-user-identification", function(event, data) {
			if (data.IsUserDefined) {
				$("header .links-usuario a.destaque")
					.text("Sair")
					.prop("href", login.urlLogout());
			} else {
				$("header .links-usuario a.destaque")
					.text("Entrar")
					.prop("href", login.urlLogin());
			}
		});
	}

	linkUserMenuMobile() {
		$(document).on("vtex-user-identification", function(event, data) {
			var texto;
			if (data.IsUserDefined) {
				texto = "Ola,";
				texto +=
					"<a href='/account' title=" +
					data.Email +
					"> " +
					login.identificacaoDoUsuario(data) +
					" </a> ";
				texto +=
					"<br>não é você?  <a href=" +
					login.urlLogout() +
					">sair</a>";
			} else {
				texto = "Faça";
				texto += "<a href=" + login.urlLogin() + " > login </a> ou ";
				texto += "<a href=" + login.urlLogin() + ">cadastre-se</a>";
			}
			$(".menu-principal .login .area-login span").html(texto);
		});
	}

	getUSerDatan() {
		$.getJSON("/no-cache/profileSystem/getProfile").done(function(data) {
			$(document).trigger("vtex-user-identification", data);
		});
	}
}

import isPage from "../helpers/isPage";

export default class Container {
	constructor({ appName, components, pages }) {
		this.appName = appName;
		this.components = [...components, ...pages];
		this.instances = {};
		this.componentsConfig = {};
	}

	init() {
		this.buildComponents.call(this);

		window[this.appName] = this;
	}

	instantiateComponents(Component) {
		if (this.componentsConfig[Component.name]) {
			this.instances[Component.name] = new Component(
				this.componentsConfig[Component.name]
			);
		} else {
			this.instances[Component.name] = new Component();
		}
	}

	buildComponents() {
		this.components.forEach(item => {
			new Promise((resolve, reject) => {
				try {
					if (typeof item === "object") {
						if (isPage(item.bodyClass)) {
							for (const i in item.components) {
								if (item.components.hasOwnProperty(i)) {
									const Comp = item.components[i];
									this.instantiateComponents(Comp);
								}
							}
						}
					} else {
						this.instantiateComponents(item);
					}

					resolve();
				} catch (error) {
					console.log(error);
					reject();
				}
			});
		});
	}

	bind(compName, config) {
		this.componentsConfig[compName] = config;
	}

	start() {
		if (
			document.attachEvent
				? document.readyState === "complete"
				: document.readyState !== "loading"
		) {
			this.init();
		} else {
			document.addEventListener("DOMContentLoaded", this.init.bind(this));
		}
	}
}

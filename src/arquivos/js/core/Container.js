import Page from "./Page";

export default class Container {
	constructor({ appName, components, pages, services, config }) {
		this.appName = appName;
		this.config = config;

		this.pageComponents = [...pages];
		this.components = [...components];

		this.services = [...services];
		this.serviceMap = {};

		this.instances = {};
		this.componentsConfig = {};
		//Futuramente a ser recebido
		this.page = new Page();
	}

	init() {
		this.ctx = this.createContext.call(this);

		this.buildServices.call(this);
		this.buildComponents.call(this);
		this.buildPageComponents.call(this);

		window[this.appName] = this;
	}

	createContext() {
		return {
			config: this.config,
			getService: this.getService.bind(this),
		};
	}

	instantiateComponent(Component, i) {
		try {
			if (typeof Component === "function") {
				if (this.componentsConfig[Component.name]) {
					this.instances[Component.name] = new Component(
						this.ctx,
						this.componentsConfig[Component.name]
					);
				} else {
					this.instances[Component.name] = new Component(this.ctx);
				}
				return Component.name;
			} else {
				console.warn("Not an Constructor", Component);
			}
		} catch (error) {
			console.log(error);
		}
	}

	instantiateService(Service) {
		if (typeof Service === "function") {
			try {
				this.serviceMap[Service.name] = new Service();
			} catch (error) {
				console.warn(error);
			}
		} else {
			console.warn("Not an Constructor", Service);
		}
	}

	getService(serviceName) {
		if (this.serviceMap[serviceName]) return this.serviceMap[serviceName];
		return false;
	}

	buildServices() {
		this.pageComponents.forEach((item) => {
			if (item.hasOwnProperty("services")) {
				if (this.page.is(item.bodyClass)) {
					item.services.forEach((service) =>
						this.services.push(service)
					);
				}
			}
		});

		return this.services.map(this.instantiateService.bind(this));
	}

	buildComponents() {
		return this.components.map(this.instantiateComponent.bind(this));
	}

	buildPageComponents() {
		return this.pageComponents.map((item) => {
			if (this.page.is(item.bodyClass)) {
				for (const i in item.components) {
					if (item.components.hasOwnProperty(i)) {
						const Comp = item.components[i];
						return this.instantiateComponent(Comp, i);
					}
				}
			}
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

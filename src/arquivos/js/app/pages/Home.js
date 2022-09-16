import slickConfig from "Config/slick";

export default class Home {
	constructor() {
		this.selectors();
		this.createSliders();
	}

	selectors(){
		this.destopMainBanners = $('.main-banners__desktop');
		this.mobileMainBanners = $('.main-banners__mobile');
	}

	createSliders(){
		this.destopMainBanners.slick(slickConfig.home.desktopMainBanners);
		this.mobileMainBanners.slick(slickConfig.home.mobileMainBanners);
	}
}

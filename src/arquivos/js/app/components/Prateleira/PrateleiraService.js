import PubSub from "Helpers/State/PubSub";

export const UPDATE_SHELF = "UPDATE_SHELF";

export default class PrateleiraService {
	constructor() {
		this.events = new PubSub();
	}
}

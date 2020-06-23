export default class MasterData {
	/**
	 *
	 * @param {String} entityName - Singla da entidade do masterData
	 */
	constructor(entityName) {
		this.entityName = entityName;
		this.url = `/api/dataentities/${entityName}/`;
		this.urlDoc = `/api/dataentities/${entityName}/documents/`;

		this.headers = new Headers({
			Accept: "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json",
		});
	}

	/**
	 * Realiza uma request http para o MasterData pela rota:
	 *  - https://developers.vtex.com/reference/search
	 * @param {} query - objecto com os query params
	 * @param {} headers - Objeto com as informaçoes do cabeçalho da request
	 *
	 */
	search(query = {}, headers = {}) {
		const params = new URLSearchParams(query).toString();
		return fetch(`${this.url}search/?${params}`, {
			method: "GET",
			headers,
		});
	}

	indices(query = {}, headers = {}) {
		const params = new URLSearchParams(query).toString();
		return fetch(`${this.url}indices/?${params}`, {
			method: "GET",
			headers,
		});
	}

	get(id) {
		return fetch(this.urlDoc + id, {
			method: "GET",
		});
	}

	post(data) {
		return fetch(this.urlDoc, {
			method: "POST",
			body: JSON.stringify(data),
			headers: this.headers,
		});
	}

	patch(data) {
		return fetch(this.urlDoc, {
			method: "PATCH",
			body: JSON.stringify(data),
		});
	}

	put(data) {
		return fetch(this.urlDoc, {
			method: "PATCH",
			body: JSON.stringify(data),
		});
	}

	delete(id) {
		return fetch(this.urlDoc + id, {
			method: "DELETE",
		});
	}

	getAttachment(id, field, fileName) {
		return fetch(`${this.urlDoc}${id}/${field}/attachments/${fileName}`, {
			method: "GET",
		});
	}
}

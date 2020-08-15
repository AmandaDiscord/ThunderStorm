class Channel {
	/**
	 * @param {import("../typings/internal").ChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;
		/** @type {false} */
		this.partial = false;

		this.id = data.id;
		this.name = data.name;
		this.type = null;
	}
	toString() {
		return `<#${this.id}>`;
	}
}

module.exports = Channel;
class Channel {
	/**
	 * @param {import("@amanda/discordtypings").ChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;
		/** @type {false} */
		this.partial = false;

		this.id = data.id;
		this.name = data.name;
		this.type = "unknown";
	}
	fetch() {
		return Promise.resolve(this);
	}
	toString() {
		return `<#${this.id}>`;
	}
	toJSON() {
		return {
			id: this.id,
			name: this.id
		}
	}
}

module.exports = Channel;

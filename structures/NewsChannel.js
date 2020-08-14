const GuildChannel = require("./GuildChannel");

class NewsChannel extends GuildChannel {
	/**
	 * @param {import("../typings/internal").NewsChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);
	}
}

module.exports = NewsChannel;

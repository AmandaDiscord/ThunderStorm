const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const GuildChannel = require("./GuildChannel");

class NewsChannel extends GuildChannel {
	/**
	 * @param {import("../typings/internal").NewsChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);
	}
	/**
	 * @param {string} content
	 * @param {*} options
	 */
	send(content, options) {
		return TextBasedChannel.send(this, content, options);
	}
}

module.exports = NewsChannel;

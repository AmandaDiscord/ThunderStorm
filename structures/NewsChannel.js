const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const GuildChannel = require("./GuildChannel");

class NewsChannel extends GuildChannel {
	/**
	 * @param {import("../typings/internal").NewsChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		/** @type {"news"} */
		this.type = "news";
	}
	/**
	 * @param {import("../typings/index").StringResolvable} content
	 * @param {import("../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

module.exports = NewsChannel;

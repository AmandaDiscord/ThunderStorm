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
	/**
	 * @param {string} messageID
	 * @param {number} [timeout]
	 */
	async deleteMessage(messageID, timeout = 0) {
		await TextBasedChannel.deleteMessage(this.client, this.id, messageID, timeout);
	}
	/**
	 * @param {string} messageID
	 */
	fetchMessage(messageID) {
		return TextBasedChannel.fetchMessage(this.client, this.id, messageID);
	}
}

module.exports = NewsChannel;

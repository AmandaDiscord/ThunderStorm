const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const GuildChannel = require("./GuildChannel");

class NewsChannel extends GuildChannel {
	/**
	 * @param {import("@amanda/discordtypings").NewsChannelData} data
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
	toJSON() {
		return {
			type: 5,
			...super.toJSON()
		}
	}
	sendTyping() {
		return TextBasedChannel.sendTyping(this.client, this.id);
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

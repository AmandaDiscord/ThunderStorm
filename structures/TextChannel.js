const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const GuildChannel = require("./GuildChannel");

class TextChannel extends GuildChannel {
	/**
	 * @param {import("../typings/internal").TextChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		this.lastMessageID = data.last_message_id || null;
		this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
		this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		this.nsfw = data.nsfw || false;
		this.rateLimitPerUser = data.rate_limit_per_user || 0;
		this.topic = data.topic || "";
		/** @type {"text"} */
		this.type = "text";
	}
	/**
	 * @param {import("../typings/index").StringResolvable} content
	 * @param {import("../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

module.exports = TextChannel;

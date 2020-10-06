const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const Channel = require("./Channel");
const User = require("./User");

class DMChannel extends Channel {
	/**
	 * @param {import("@amanda/discordtypings").DMChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		data.name = data.recipients ? data.recipients[0].username : "unknown";
		super(data, client);

		this.lastMessageID = data.last_message_id || null;
		this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
		this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		this.recipients = data.recipients ? new Map(data.recipients.map(user => [user.id, new User(user, client)])) : new Map();
		/** @type {"dm"} */
		this.type = "dm";
	}
	toJSON() {
		return {
			last_message_id: this.lastMessageID,
			last_pin_timestamp: this.lastPinAt,
			recipients: [...this.recipients.values()].map(u => u.toJSON()),
			type: 1,
			...super.toJSON()
		}
	}
	/**
	 * @param {import("../typings/index").StringResolvable} content
	 * @param {import("../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
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

module.exports = DMChannel;

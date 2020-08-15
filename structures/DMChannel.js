const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const Channel = require("./Channel");
const User = require("./User");

class DMChannel extends Channel {
	/**
	 * @param {import("../typings/internal").DMChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		data.name = data.recipients[0].username;
		super(data, client);

		this.lastMessageID = data.last_message_id || null;
		this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
		this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		this.recipients = new Map(data.recipients.map(user => [user.id, new User(user, client)]));
	}
	/**
	 * @param {string} content
	 * @param {*} options
	 */
	send(content, options) {
		return TextBasedChannel.send(this, content, options);
	}
}

module.exports = DMChannel;

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

		this.recipients = new Map(data.recipients.map(user => [user.id, new User(user, client)]));
	}
}

module.exports = DMChannel;

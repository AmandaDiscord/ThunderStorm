const Channel = require("./Channel");

class GuildChannel extends Channel {
	/**
	 * @param {import("../typings/internal").GuildChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		this.parentID = data.parent_id || null;
		this.position = data.position;
	}
}

module.exports = GuildChannel;

const GuildChannel = require("./GuildChannel");

class TextChannel extends GuildChannel {
	/**
	 * @param {import("../typings/internal").TextChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);
	}
}

module.exports = TextChannel;

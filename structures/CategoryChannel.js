const GuildChannel = require("./GuildChannel");

class CategoryChannel extends GuildChannel {
	/**
	 * @param {import("../typings/internal").CategoryChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);
	}
}

module.exports = CategoryChannel;

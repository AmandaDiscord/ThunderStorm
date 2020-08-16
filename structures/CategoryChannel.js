const GuildChannel = require("./GuildChannel");

class CategoryChannel extends GuildChannel {
	/**
	 * @param {import("../typings/internal").CategoryChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		/** @type {"category"} */
		this.type = "category";
		this.nsfw = data.nsfw || false;
	}
}

module.exports = CategoryChannel;

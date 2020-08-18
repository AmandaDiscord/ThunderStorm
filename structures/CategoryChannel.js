const GuildChannel = require("./GuildChannel");

class CategoryChannel extends GuildChannel {
	/**
	 * @param {import("@amanda/discordtypings").CategoryChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		/** @type {"category"} */
		this.type = "category";
		this.nsfw = data.nsfw || false;
	}
	toJSON() {
		return {
			type: 4,
			nsfw: this.nsfw,
			...super.toJSON()
		}
	}
}

module.exports = CategoryChannel;

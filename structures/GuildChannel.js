const Channel = require("./Channel");

class GuildChannel extends Channel {
	/**
	 * @param {import("@amanda/discordtypings").GuildChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		this.parentID = data.parent_id || null;
		this.position = data.position;
		this.guildID = data.guild_id || "";
	}
	toJSON() {
		return {
			guild_id: this.guildID,
			parent_id: this.parentID,
			position: this.position,
			...super.toJSON()
		}
	}
}

module.exports = GuildChannel;

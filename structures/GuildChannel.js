const Channel = require("./Channel");

class GuildChannel extends Channel {
	/**
	 * @param {import("@amanda/discordtypings").GuildChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		const PartialGuild = require("./Partial/PartialGuild");

		this.parentID = data.parent_id || null;
		this.position = data.position;
		this.guild = new PartialGuild({ id: data.guild_id }, client);
	}
	toJSON() {
		return {
			guild_id: this.guild.id,
			parent_id: this.parentID,
			position: this.position,
			...super.toJSON()
		}
	}
}

module.exports = GuildChannel;

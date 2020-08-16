const GuildChannel = require("./GuildChannel");

class VoiceChannel extends GuildChannel {
	/**
	 * @param {import("@amanda/discordtypings").VoiceChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		this.bitrate = data.bitrate || 8;
		this.userLimit = data.user_limit || 0;
		/** @type {"voice"} */
		this.type = "voice";
	}
}

module.exports = VoiceChannel;

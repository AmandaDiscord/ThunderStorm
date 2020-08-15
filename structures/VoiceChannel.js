const Channel = require("./Channel");

class VoiceChannel extends Channel {
	/**
	 * @param {import("../typings/internal").VoiceChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		this.bitrate = data.bitrate || 8;
		this.userLimit = data.user_limit || 0;
	}
}

module.exports = VoiceChannel;

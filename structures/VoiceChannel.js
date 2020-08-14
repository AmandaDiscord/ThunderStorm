const Channel = require("./Channel");

class VoiceChannel extends Channel {
	/**
	 * @param {import("../typings/internal").VoiceChannelData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);
	}
}

module.exports = VoiceChannel;

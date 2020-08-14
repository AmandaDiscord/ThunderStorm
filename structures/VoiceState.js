const GuildMember = require("./GuildMember");

class VoiceState {
	/**
	 * @param {import("../typings/internal").VoiceStateData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;

		this.channelID = data.channel_id;
		this.guildID = data.guild_id || null;
		this.member = data.member ? new GuildMember(data.member, client) : null;
		this.serverDeaf = data.deaf;
		this.selfDeaf = data.self_deaf;
		this.serverMute = data.mute;
		this.selfMute = data.self_mute;
		this.id = data.user_id;
		this.sessionID = data.session_id;
		this.streaming = data.self_stream ? data.self_stream : false;
		this.supress = data.suppress;
	}
}

module.exports = VoiceState;

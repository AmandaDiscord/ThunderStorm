import GuildMember from "./GuildMember";

class VoiceState {
	public client: import("../client/Client");
	public id!: string;
	public channelId: string | null = null;
	public guildId: string | null = null;
	public member: GuildMember | null = null;
	public serverDeaf = false;
	public selfDeaf = false;
	public serverMute = false;
	public selfMute = false;
	public sessionId = "";
	public streaming = false;
	public supress = false;

	public constructor(client: import("../client/Client"), data: import("discord-typings").VoiceStateData) {
		this.client = client;

		this._patch(data);
	}

	public toJSON() {
		return {
			channel_id: this.channelId,
			guild_id: this.guildId,
			member: this.member ? this.member.toJSON() : null,
			deaf: this.serverDeaf,
			self_deaf: this.selfDeaf,
			mute: this.serverMute,
			self_mute: this.selfMute,
			session_id: this.sessionId,
			self_stream: this.streaming,
			suppress: this.supress,
			user_id: this.id
		};
	}

	public _patch(data: import("discord-typings").VoiceStateData) {
		if (data.channel_id) this.channelId = data.channel_id;
		if (data.guild_id) this.guildId = data.guild_id;
		if (data.member !== undefined) this.member = data.member ? new GuildMember(this.client, data.member) : null;
		if (data.deaf != undefined) this.serverDeaf = data.deaf;
		if (data.self_deaf != undefined) this.selfDeaf = data.self_deaf;
		if (data.mute != undefined) this.serverMute = data.mute;
		if (data.self_mute != undefined) this.selfMute = data.self_mute;
		if (data.session_id) this.sessionId = data.session_id;
		if (data.self_stream != undefined) this.streaming = data.self_stream;
		if (data.suppress != undefined) this.supress = data.suppress;
		if (data.user_id) this.id = data.user_id;
	}
}

export = VoiceState;

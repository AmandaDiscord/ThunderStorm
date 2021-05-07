import GuildMember from "./GuildMember";

class VoiceState {
	public client: import("./Client");
	public id!: string;
	public channelID: string | null = null;
	public guildID: string | null = null;
	public member: GuildMember | null = null;
	public serverDeaf = false;
	public selfDeaf = false;
	public serverMute = false;
	public selfMute = false;
	public sessionID = "";
	public streaming = false;
	public supress = false;

	public constructor(data: import("@amanda/discordtypings").VoiceStateData, client: import("./Client")) {
		this.client = client;

		this._patch(data);
	}

	public toJSON() {
		return {
			channel_id: this.channelID,
			guild_id: this.guildID,
			member: this.member ? this.member.toJSON() : null,
			deaf: this.serverDeaf,
			self_deaf: this.selfDeaf,
			mute: this.serverMute,
			self_mute: this.selfMute,
			session_id: this.sessionID,
			self_stream: this.streaming,
			suppress: this.supress,
			user_id: this.id
		};
	}

	// @ts-ignore Weird Discord structures be like
	public _patch(data: import("@amanda/discordtypings").VoiceStateData) {
		if (data.channel_id) this.channelID = data.channel_id;
		if (data.guild_id) this.guildID = data.guild_id;
		if (data.member) this.member = new GuildMember(data.member, this.client);
		if (data.deaf != undefined) this.serverDeaf = data.deaf;
		if (data.self_deaf != undefined) this.selfDeaf = data.self_deaf;
		if (data.mute != undefined) this.serverMute = data.mute;
		if (data.self_mute != undefined) this.selfMute = data.self_mute;
		if (data.session_id) this.sessionID = data.session_id;
		if (data.self_stream != undefined) this.streaming = data.self_stream;
		if (data.suppress != undefined) this.supress = data.suppress;
		if (data.user_id) this.id = data.user_id;
	}
}

export = VoiceState;

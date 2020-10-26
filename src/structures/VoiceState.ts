import GuildMember from "./GuildMember";

class VoiceState {
	client: import("./Client");
	channelID: string | null;
	guildID: string | null;
	member: GuildMember | null;
	serverDeaf: boolean;
	selfDeaf: boolean;
	serverMute: boolean;
	selfMute: boolean;
	id: string;
	sessionID: string;
	streaming: boolean;
	supress: boolean;

	constructor(data: import("@amanda/discordtypings").VoiceStateData, client: import("./Client")) {
		this.client = client;

		this.channelID = data.channel_id || null;
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

export = VoiceState;

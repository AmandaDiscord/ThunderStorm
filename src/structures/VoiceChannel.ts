import GuildChannel from "./GuildChannel";

class VoiceChannel extends GuildChannel {
	public bitrate: number;
	public userLimit: number;
	public type: "voice";

	public constructor(data: import("@amanda/discordtypings").VoiceChannelData, client: import("./Client")) {
		super(data, client);

		this.bitrate = data.bitrate || 8;
		this.userLimit = data.user_limit || 0;
		this.type = "voice";
	}
	public toJSON() {
		return {
			bitrate: this.bitrate,
			user_limit: this.userLimit,
			type: 2,
			...super.toJSON()
		};
	}
}

export = VoiceChannel;

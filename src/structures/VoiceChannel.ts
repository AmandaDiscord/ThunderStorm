import GuildChannel from "./GuildChannel";

class VoiceChannel extends GuildChannel {
	public bitrate: number;
	public userLimit: number;
	public rtcRegion: string | null;
	public type: "voice";

	public constructor(data: import("@amanda/discordtypings").VoiceChannelData, client: import("./Client")) {
		super(data, client);

		this.bitrate = data.bitrate || 8;
		this.userLimit = data.user_limit || 0;
		this.type = "voice";
		this.rtcRegion = data.rtc_region || null;
	}

	public toJSON(): import("@amanda/discordtypings").VoiceChannelData {
		return Object.assign(super.toJSON(), {
			bitrate: this.bitrate,
			user_limit: this.userLimit,
			rtc_region: this.rtcRegion,
			type: 2 as const
		});
	}
}

export = VoiceChannel;

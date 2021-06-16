import BaseGuildVoiceChannel from "./BaseGuildVoiceChannel";

class VoiceChannel extends BaseGuildVoiceChannel {
	public bitrate = 8;
	public userLimit = 0;
	public rtcRegion: string | null = null;
	public type: "voice" = "voice";

	public constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").VoiceChannelData) {
		super(guild, data);
	}

	public toJSON(): import("@amanda/discordtypings").VoiceChannelData {
		return Object.assign(super.toJSON(), {
			bitrate: this.bitrate,
			user_limit: this.userLimit,
			rtc_region: this.rtcRegion,
			type: 2 as const
		});
	}

	public _patch(data: import("@amanda/discordtypings").VoiceChannelData) {
		if (data.bitrate !== undefined) this.bitrate = data.bitrate;
		if (data.user_limit !== undefined) this.userLimit = data.user_limit;
		if (data.rtc_region !== undefined) this.rtcRegion = data.rtc_region;

		super._patch(data);
	}
}

export = VoiceChannel;

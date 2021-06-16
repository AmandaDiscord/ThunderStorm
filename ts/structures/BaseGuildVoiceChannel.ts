import GuildChannel from "./GuildChannel";

class BaseGuildVoiceChannel extends GuildChannel {
	public rtcRegion!: string | null;
	public bitrate!: number;
	public userLimit!: number;

	public _patch(data: import("@amanda/discordtypings").VoiceChannelData) {
		super._patch(data);
		this.rtcRegion = data.rtc_region;
		this.bitrate = data.bitrate;
		this.userLimit = data.user_limit;
	}
}

export = BaseGuildVoiceChannel;
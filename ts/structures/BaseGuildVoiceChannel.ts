// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import GuildChannel from "./GuildChannel";

// @ts-ignore
class BaseGuildVoiceChannel extends GuildChannel {
	public rtcRegion!: string | null;
	public bitrate!: number;
	public userLimit!: number;

	public static readonly default = BaseGuildVoiceChannel;

	public _patch(data: import("discord-typings").VoiceChannelData) {
		super._patch(data);
		this.rtcRegion = data.rtc_region;
		this.bitrate = data.bitrate;
		this.userLimit = data.user_limit;
	}
}

export = BaseGuildVoiceChannel;

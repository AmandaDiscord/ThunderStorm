// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseGuildVoiceChannel from "./BaseGuildVoiceChannel";

import Constants from "../util/Constants";

class VoiceChannel extends BaseGuildVoiceChannel {
	public bitrate = 8;
	public userLimit = 0;
	public rtcRegion: string | null = null;
	public type: typeof Constants.ChannelTypes[2] = Constants.ChannelTypes[2];

	public static readonly default = VoiceChannel;

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").VoiceChannelData) {
		super(guild, data);
	}

	public toJSON(): import("discord-typings").VoiceChannelData {
		return Object.assign(super.toJSON(), {
			bitrate: this.bitrate,
			user_limit: this.userLimit,
			rtc_region: this.rtcRegion,
			type: 2 as const
		});
	}

	public _patch(data: import("discord-typings").VoiceChannelData) {
		super._patch(data);
		if (data.bitrate !== undefined) this.bitrate = data.bitrate;
		if (data.user_limit !== undefined) this.userLimit = data.user_limit;
		if (data.rtc_region !== undefined) this.rtcRegion = data.rtc_region;

		super._patch(data);
	}
}

export = VoiceChannel;

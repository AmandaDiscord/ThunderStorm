// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import VoiceChannel from "./VoiceChannel";

import Constants from "../util/Constants";

class StageChannel extends VoiceChannel {
	// @ts-ignore
	public type: typeof Constants.ChannelTypes[13] = Constants.ChannelTypes[13];

	public static readonly default = StageChannel;

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").StageChannelData) {
		super(guild, data as unknown as import("discord-typings").VoiceChannelData);
	}

	// @ts-ignore
	public toJSON(): import("discord-typings").StageChannelData {
		return Object.assign(super.toJSON(), { type: 13 as const });
	}
}

export = StageChannel;

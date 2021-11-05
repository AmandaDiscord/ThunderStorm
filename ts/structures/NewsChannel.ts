import TextChannel from "./TextChannel";

import Constants from "../util/Constants";

class NewsChannel extends TextChannel {
	// @ts-ignore
	public type: typeof Constants.ChannelTypes[5] = Constants.ChannelTypes[5];

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").NewsChannelData) {
		super(guild, data as unknown as import("discord-typings").TextChannelData);
	}

	// @ts-ignore
	public toJSON(): import("discord-typings").NewsChannelData {
		return Object.assign(super.toJSON(), { type: 5 as const });
	}
}

export = NewsChannel;
